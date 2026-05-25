// Generate a halftone (newsprint) version of the headshot on solid orange.
// 1. Run AI background removal so only the subject is opaque.
// 2. Sample the alpha-aware grayscale image and emit black dots whose size
//    reflects local darkness. Transparent cells emit no dot (pure orange).
// 3. Write SVG (vector) + PNG (rasterized) into src/assets/.
//
// Usage: node scripts/halftone.mjs

import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const INPUT = "src/assets/headshot.png";
const OUT_SVG = "src/assets/headshot-halftone.svg";
const OUT_PNG = "src/assets/headshot-halftone.png";
const OUT_CUTOUT = "src/assets/headshot-cutout.png"; // intermediate

// Tuning
const CELL = 6;             // dot pitch in source pixels — smaller = more detail
const DOT_BOOST = 1.32;     // multiplier on max dot radius
const CONTRAST = 1.55;      // tonal curve
const BRIGHTNESS = -0.04;
const ROTATION = -15;       // halftone screen angle (classic newspaper)
const ALPHA_THRESHOLD = 0.40; // cell needs this much average opacity to dot
const BG_HEX = "#e8541c";
const DOT_HEX = "#111111";

console.log("→ Running background removal (this loads an ONNX model)…");
const inputBlob = new Blob([await readFile(INPUT)], { type: "image/png" });
const resultBlob = await removeBackground(inputBlob);
const cutoutBuf = Buffer.from(await resultBlob.arrayBuffer());
await writeFile(OUT_CUTOUT, cutoutBuf);
console.log(`✓ Cutout: ${OUT_CUTOUT}`);

// Read the cutout as RGBA raw
const { data: raw, info } = await sharp(cutoutBuf)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
console.log(`Cutout: ${w}×${h}`);

function lum(r, g, b) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function cellStats(cx, cy) {
  let lumSum = 0;
  let alphaSum = 0;
  let n = 0;
  for (let dy = 0; dy < CELL; dy++) {
    for (let dx = 0; dx < CELL; dx++) {
      const x = cx + dx;
      const y = cy + dy;
      if (x >= w || y >= h) continue;
      const idx = (y * w + x) * 4;
      const a = raw[idx + 3] / 255;
      alphaSum += a;
      if (a > 0) {
        lumSum += lum(raw[idx], raw[idx + 1], raw[idx + 2]) * a;
      }
      n++;
    }
  }
  if (n === 0) return { lum: 1, alpha: 0 };
  const avgA = alphaSum / n;
  const avgL = avgA > 0 ? lumSum / alphaSum : 1;
  return { lum: avgL, alpha: avgA };
}

const dots = [];
const cols = Math.ceil(w / CELL);
const rows = Math.ceil(h / CELL);
const maxR = (CELL / 2) * DOT_BOOST;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cx = col * CELL;
    const cy = row * CELL;
    const { lum: l0, alpha } = cellStats(cx, cy);
    if (alpha < ALPHA_THRESHOLD) continue;

    let l = (l0 - 0.5 + BRIGHTNESS) * CONTRAST + 0.5;
    l = Math.max(0, Math.min(1, l));
    const darkness = 1 - l;
    if (darkness <= 0.02) continue;

    // Soft alpha falloff — dot radius scaled by sqrt(darkness) and alpha
    const r = maxR * Math.sqrt(darkness) * Math.min(1, alpha * 1.2);
    if (r < 0.4) continue;
    dots.push({
      x: cx + CELL / 2,
      y: cy + CELL / 2,
      r,
    });
  }
}

console.log(`Generated ${dots.length} dots`);

// Build SVG
const cxImg = w / 2;
const cyImg = h / 2;
const dotsXml = dots
  .map((d) => `<circle cx="${d.x.toFixed(2)}" cy="${d.y.toFixed(2)}" r="${d.r.toFixed(2)}"/>`)
  .join("\n  ");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 ${w} ${h}"
     width="${w}" height="${h}"
     shape-rendering="geometricPrecision">
  <rect x="0" y="0" width="${w}" height="${h}" fill="${BG_HEX}"/>
  <g fill="${DOT_HEX}" transform="rotate(${ROTATION} ${cxImg} ${cyImg})">
  ${dotsXml}
  </g>
</svg>
`;

await writeFile(OUT_SVG, svg);
console.log(`✓ SVG: ${OUT_SVG} (${(svg.length / 1024).toFixed(0)} KB)`);

const pngBuf = await sharp(Buffer.from(svg))
  .resize(w, h, { fit: "contain" })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(OUT_PNG, pngBuf);
console.log(`✓ PNG: ${OUT_PNG} (${(pngBuf.length / 1024).toFixed(0)} KB)`);
