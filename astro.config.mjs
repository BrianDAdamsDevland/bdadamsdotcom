import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// import sentry from "@sentry/astro"; // TEMPORARILY DISABLED - investigating Netlify build failure
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

// https://astro.build/config
export default defineConfig({
  site: "https://www.bdadams.com",
  prefetch: {
    prefetchAll: true
  },
  vite: {
    logLevel: "info",
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          console.log("[rollup-warn]", warning.code, warning.message?.slice(0, 120));
          warn(warning);
        }
      }
    }
  },
  integrations: [vue(), mdx(), sitemap(), react({
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