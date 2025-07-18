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

//Works around issue with Sentry package v8
//Try removing this after @sentry/astro >8.9.1
globalThis._sentryEsmLoaderHookRegistered = true;


// https://astro.build/config
export default defineConfig({
  site: "https://www.bdadams.com",
  prefetch: {
    prefetchAll: true
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