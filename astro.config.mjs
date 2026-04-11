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

// https://astro.build/config
export default defineConfig({
  site: "https://www.bdadams.com",
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [{
      // Astro hardcodes minify: true for the client environment build,
      // and Vite uses esbuild for minification during Rollup's renderChunk
      // phase — before hash placeholders are resolved. On Netlify's Linux
      // build, esbuild fails on the unresolved placeholders in chunk names.
      // This plugin forces minify: false for the client build; Netlify
      // post-processing handles JS minification on the final output instead.
      name: 'disable-client-minify',
      configEnvironment(name, config) {
        if (name === 'client') {
          config.build ??= {};
          config.build.minify = false;
        }
      }
    }],
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