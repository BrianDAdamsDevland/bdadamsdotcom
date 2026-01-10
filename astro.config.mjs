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
    sourceMapsUploadOptions: {
      project: "bdadamsdotcom",
      authToken: SENTRY_AUTH_TOKEN,
      org: "brian-d-adams",
      telemetry: false,
      // Only upload source maps when auth token is available (production builds)
      enabled: !!SENTRY_AUTH_TOKEN
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
  vite: {
    build: {
      rollupOptions: {
        onLog(level, log, handler) {
          // Suppress lit-related warnings
          if (log.code === 'AMBIGUOUS_EXTERNAL_NAMESPACE' &&
              log.message.includes('lit')) {
            return;
          }
          if (log.code === 'UNUSED_EXTERNAL_IMPORT' &&
              (log.message.includes('lit') || log.message.includes('@astrojs/internal-helpers'))) {
            return;
          }
          // Suppress sourcemap warnings from astro:transitions plugin
          if (log.code === 'SOURCEMAP_BROKEN' &&
              log.plugin === 'astro:transitions') {
            return;
          }
          handler(level, log);
        }
      }
    },
    customLogger: {
      // Custom logger to filter SSR build warnings
      ...(() => {
        const createFilteredLogger = () => ({
          info: (msg) => console.log(msg),
          warn: (msg) => {
            // Filter lit-related warnings during SSR build
            if (msg.includes('Ambiguous external namespace') && msg.includes('lit')) return;
            if (msg.includes('UNUSED_EXTERNAL_IMPORT') && msg.includes('lit')) return;
            console.warn(msg);
          },
          warnOnce: (msg) => {
            if (msg.includes('Ambiguous external namespace') && msg.includes('lit')) return;
            console.warn(msg);
          },
          error: (msg) => console.error(msg),
          clearScreen: () => {},
          hasErrorLogged: () => false,
          hasWarned: false
        });
        return createFilteredLogger();
      })()
    }
  }
});