import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import alpinejs from "@astrojs/alpinejs";
import lit from "@astrojs/lit";
import preact from "@astrojs/preact";
import solidJs from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import pagefind from "astro-pagefind";
import netlify from "@astrojs/netlify";

const {
  SENTRY_AUTH_TOKEN
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// DEBUG: Vite plugin to inspect chunks before esbuild processes them
function inspectChunksPlugin() {
  return {
    name: 'inspect-chunks',
    generateBundle(options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.includes('client') && chunk.type === 'chunk') {
          const lines = chunk.code.split('\n');
          console.log(`\n[inspect-chunks] === ${fileName} (${lines.length} lines, ${chunk.code.length} bytes) ===`);
          if (lines.length >= 35) {
            console.log(`[inspect-chunks] Line 35: ${lines[34]}`);
            console.log(`[inspect-chunks] Line 35 around col 126: ...${lines[34].substring(116, 156)}...`);
          }
          // Log any unresolved hash placeholders
          const placeholders = chunk.code.match(/!~\{[^}]*\}~/g);
          if (placeholders) {
            console.log(`[inspect-chunks] WARNING: Unresolved hash placeholders found: ${placeholders.join(', ')}`);
          }
          // Show first few lines if file has 30+ lines
          if (lines.length >= 30) {
            console.log(`[inspect-chunks] First 5 lines:`);
            lines.slice(0, 5).forEach((l, i) => console.log(`[inspect-chunks]   ${i+1}: ${l.substring(0, 200)}`));
            console.log(`[inspect-chunks] Lines 33-37:`);
            lines.slice(32, 37).forEach((l, i) => console.log(`[inspect-chunks]   ${i+33}: ${l.substring(0, 200)}`));
          }
        }
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://www.bdadams.com",
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [inspectChunksPlugin()],
    build: {
      minify: false,
    }
  },
  integrations: [vue(), mdx(), sitemap(), sentry({
    dsn: "https://c0923b76e81cff946429e3533e2a3ff1@o4506892850233344.ingest.us.sentry.io/4506892851806208",
    sourceMapsUploadOptions: {
      project: "bdadamsdotcom",
      authToken: SENTRY_AUTH_TOKEN,
      org: "brian-d-adams"
    }
  }), react({
    include: ["**/react/*"]
  }), alpinejs(), lit(), preact({
    include: ["**/preact/*"]
  }), solidJs({
    include: ["**/solid/*"]
  }), svelte(), pagefind()],
  markdown: {
    shikiConfig: {
      wrap: true
    }
  },
  redirects: {
    "/cv": "/resume",
    "/gallery": "/portfolio",
    "/gallery/[...slug]": "/portfolio/[...slug]"
  },
  output: "static",
  adapter: netlify(),
});