// Capture screenshots of key pages in both themes/viewports.
// Usage: node scripts/screenshot.mjs [baseUrl]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:4321";
const OUT = ".screenshots";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog/" },
  { name: "blog-post", path: "/blog/islands/" },
  { name: "portfolio", path: "/portfolio/" },
  { name: "portfolio-item", path: "/portfolio/scriptly-website/" },
  { name: "resume", path: "/resume/" },
  { name: "recommended", path: "/recommended/" },
  { name: "recommended-movies", path: "/recommended/movies/" },
  { name: "contact", path: "/contact/" },
  { name: "search", path: "/search/" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const THEMES = ["light", "dark"];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const theme of THEMES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      colorScheme: theme,
    });
    const page = await ctx.newPage();
    // Persist theme override across navigations
    await page.addInitScript((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch {}
    }, theme);

    for (const r of ROUTES) {
      const url = BASE + r.path;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
        // wait for Vue hydration + initial entrance animations + Typer
        await page.waitForTimeout(r.name === "home" ? 4500 : 1500);
        // Trigger IntersectionObserver-based animations by scrolling the page
        await page.evaluate(async () => {
          const total = document.body.scrollHeight;
          const step = window.innerHeight * 0.8;
          for (let y = 0; y < total; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 250));
        });
        const file = `${OUT}/${r.name}.${vp.name}.${theme}.png`;
        await page.screenshot({ path: file, fullPage: true });
        console.log("✓", file);
      } catch (err) {
        console.error("✗", url, err.message);
      }
    }

    // Capture menu open state on home
    if (vp.name === "desktop") {
      try {
        await page.goto(BASE + "/blog/", { waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        await page.click("#menu-link");
        await page.waitForTimeout(1400);
        await page.screenshot({
          path: `${OUT}/menu-open.${vp.name}.${theme}.png`,
          fullPage: false,
        });
        console.log(`✓ menu-open.${vp.name}.${theme}.png`);
      } catch (err) {
        console.error("✗ menu-open", err.message);
      }
    }

    await ctx.close();
  }
}

await browser.close();
console.log("\nDone.");
