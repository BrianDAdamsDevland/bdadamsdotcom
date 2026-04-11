# Astro 5 to 6 Upgrade Design

**Date:** 2026-04-10  
**Status:** Approved

## Overview

Upgrade the site from Astro 5.18.0 to Astro 6.x. The project is already in good shape — it uses the Content Layer API, `<ClientRouter />`, and `.mjs` config — so the majority of Astro 6 breaking changes do not apply.

## Package Upgrades

Use `astro upgrade` to bump `astro` core and all official `@astrojs/*` integrations in one command:

- `astro`
- `@astrojs/vue`
- `@astrojs/mdx`
- `@astrojs/sitemap`
- `@astrojs/netlify`
- `@astrojs/react`
- `@astrojs/alpinejs`
- `@astrojs/lit`
- `@astrojs/preact`
- `@astrojs/solid-js`
- `@astrojs/svelte`
- `@astrojs/check`

Then manually update the community packages and Sentry:

- `@sentry/astro` — check for Astro 6-compatible release and bump
- `astro-pagefind` — check for Astro 6-compatible release; if not available, add `legacy-peer-deps=true` to `.npmrc` as a fallback
- `astro-capo` — check for Astro 6-compatible release
- `astro-seo` — check for Astro 6-compatible release

## Breaking Changes That Apply

### 1. Zod import path (content.config.ts)

`z` imported from `astro:content` is deprecated in v6. Update to:

```ts
import { z } from "astro/zod";
```

Also update `z.string().url()` in the recommendations schema to `z.url()` (Zod 4 deprecation).

### 2. Node version for Netlify

Astro 6 requires Node 22+. Add to `netlify.toml` under `[build.environment]`:

```toml
NODE_VERSION = "22"
```

### 3. Remove stale Sentry workaround

Remove this block from `astro.config.mjs` (was required for `@sentry/astro` ≤8.9.1):

```js
//Works around issue with Sentry package v8
//Try removing this after @sentry/astro >8.9.1
globalThis._sentryEsmLoaderHookRegistered = true;
```

### 4. Script/style rendering order

Astro 6 changed script and style rendering to match declaration order (previously reversed). No code change required, but verify visually after upgrade.

## Breaking Changes That Do NOT Apply

- Content collections — already using Content Layer API (`glob` from `astro/loaders`) ✓
- `<ViewTransitions />` — layout already uses `<ClientRouter />` ✓
- `Astro.glob()` — not used anywhere ✓
- CommonJS config — uses `.mjs` ✓
- i18n redirect behavior — no i18n in use ✓

## Testing & Verification

1. `npm run build` — must pass clean (runs `astro check` + `astro build`)
2. `npm run preview` — spot-check home, blog, portfolio, resume, recommendations pages
3. Manually verify interactive islands: theme toggle, Typer animation, Pagefind search, navigation menu
4. Confirm Netlify deploy preview builds successfully with Node 22
