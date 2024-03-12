import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import alpinejs from "@astrojs/alpinejs";
import lit from "@astrojs/lit";
import preact from "@astrojs/preact";

const { SENTRY_AUTH_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://www.bdadams.com",
  integrations: [
    vue(),
    mdx(),
    sitemap(),
    sentry({
      dsn: "https://c0923b76e81cff946429e3533e2a3ff1@o4506892850233344.ingest.us.sentry.io/4506892851806208",
      sourceMapsUploadOptions: {
        project: "bdadamsdotcom",
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
    spotlightjs(),
    react({
      include: ["**/react/*"],
    }),
    alpinejs(),
    lit(),
    preact({
      include: ["**/preact/*"],
    }),
  ],
  markdown: {
    shikiConfig: {
      wrap: true,
    },
  },
});
