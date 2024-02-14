import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bdadams.com",
  integrations: [vue(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      wrap: true
    }
  }
});