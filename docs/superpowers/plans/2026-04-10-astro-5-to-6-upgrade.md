# Astro 5 to 6 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the site from Astro 5.18.0 to Astro 6.x with all integrations and community packages updated and all breaking changes resolved.

**Architecture:** Use `npx @astrojs/upgrade` to bump Astro core and all official `@astrojs/*` integrations in one step, then manually bump community packages, apply three small code fixes, and verify the build passes clean.

**Tech Stack:** Astro 6, Node 22+, Netlify, Vite 7, Zod 4

---

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Bumped by `astro upgrade` + manual community bumps |
| `package-lock.json` | Regenerated |
| `src/content.config.ts` | Update `z` import path; fix `z.string().url()` |
| `astro.config.mjs` | Remove stale Sentry workaround |
| `netlify.toml` | Add `NODE_VERSION = "22"` |

---

## Task 1: Create branch and run official upgrade

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b astro-6-upgrade
```

Expected: `Switched to a new branch 'astro-6-upgrade'`

- [ ] **Step 2: Run the official Astro upgrade tool**

```bash
npx @astrojs/upgrade
```

This will detect your current Astro version, show you what it plans to upgrade, and prompt for confirmation. Accept all upgrades. It updates `package.json` and runs `npm install`.

Expected output includes lines like:
```
◼ astro            5.18.0 → 6.x.x
◼ @astrojs/vue     5.x.x  → 6.x.x (or similar)
...
```

- [ ] **Step 3: Verify the upgrade ran**

```bash
node -e "const p = require('./package.json'); console.log('astro:', p.dependencies.astro)"
```

Expected: `astro: 6.x.x` (some 6.x version, not 5.x)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: run astro upgrade to v6"
```

---

## Task 2: Update community packages

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Bump astro-pagefind and @sentry/astro**

```bash
npm install astro-pagefind@1.8.6 @sentry/astro@latest
```

`astro-pagefind` 1.8.6 is the first release to declare Astro 6 peer dep support. `@sentry/astro@latest` picks up any fixes since 10.42.0.

`astro-capo` and `astro-seo` do not need version changes — their peer dependency declarations already accept Astro 6.

- [ ] **Step 2: Verify installed versions**

```bash
node -e "const p = require('./package.json'); console.log('pagefind:', p.dependencies['astro-pagefind'], 'sentry:', p.dependencies['@sentry/astro'])"
```

Expected: `pagefind: 1.8.6  sentry: 10.x.x` (10.42.0 or newer)

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: bump astro-pagefind and @sentry/astro for Astro 6"
```

---

## Task 3: Apply code-level breaking changes

**Files:**
- Modify: `src/content.config.ts`
- Modify: `astro.config.mjs`
- Modify: `netlify.toml`

### 3a — Fix Zod import in content.config.ts

- [ ] **Step 1: Update the import**

In `src/content.config.ts`, change line 1 from:

```ts
import { z, defineCollection } from "astro:content";
```

to:

```ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
```

- [ ] **Step 2: Fix z.string().url() → z.url() in recommendations schema**

In `src/content.config.ts`, in the `recommendationsCollection` schema, change:

```ts
link: z.string().url(),
```

to:

```ts
link: z.url(),
```

The full updated `recommendationsCollection` definition should look like:

```ts
const recommendationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/recommendations" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      tags: z.array(z.any()).optional(),
      type: z.enum(["Podcast", "Movie", "TV", "Music", "App"]),
      link: z.url(),
      date: z.date(),
      year: z.coerce.string().optional(),
      subtitle: z.string().optional()
    }),
});
```

### 3b — Remove stale Sentry workaround from astro.config.mjs

- [ ] **Step 3: Remove the workaround block**

In `astro.config.mjs`, remove these three lines (they appear after the imports, before the `defineConfig` call):

```js
//Works around issue with Sentry package v8
//Try removing this after @sentry/astro >8.9.1
globalThis._sentryEsmLoaderHookRegistered = true;
```

### 3c — Pin Node version for Netlify

- [ ] **Step 4: Add NODE_VERSION to netlify.toml**

In `netlify.toml`, find the `[build.environment]` section:

```toml
[build.environment]
  NETLIFY_ANALYTICS = "true"
```

Add `NODE_VERSION` so it becomes:

```toml
[build.environment]
  NETLIFY_ANALYTICS = "true"
  NODE_VERSION = "22"
```

- [ ] **Step 5: Commit all three changes**

```bash
git add src/content.config.ts astro.config.mjs netlify.toml
git commit -m "fix: apply Astro 6 breaking changes (Zod import, Sentry workaround, Node version)"
```

---

## Task 4: Verify build passes

**Files:** None modified — verification only.

- [ ] **Step 1: Run the full build**

```bash
npm run build
```

This runs `astro check` (TypeScript checking) then `astro build`. Both must pass without errors.

Expected: Build completes and ends with something like:
```
✓ Built in X.XXs
```

If `astro check` reports type errors:
- Errors in `src/content.config.ts` about `z` → double-check the import change in Task 3a
- Errors about missing types in integrations → the integration version may not have shipped types yet; check npm for a newer patch

If `astro build` fails:
- Note the specific error. Common causes after an Astro major bump: an integration that needs an additional config change, or a community package that has a runtime incompatibility. Fix inline and re-run.

- [ ] **Step 2: Commit any fixes made during build verification**

If you had to fix anything to make the build pass, commit those changes now:

```bash
git add <files-changed>
git commit -m "fix: resolve build errors after Astro 6 upgrade"
```

If the build passed on the first try, skip this step.

---

## Task 5: Visual verification and open PR

**Files:** None modified — verification and PR creation only.

- [ ] **Step 1: Start the preview server**

```bash
npm run preview
```

- [ ] **Step 2: Spot-check key pages**

Open each in a browser and verify they render correctly:

| Page | URL | What to check |
|------|-----|---------------|
| Home | `http://localhost:4321/` | Typer animation, layout, theme |
| Blog | `http://localhost:4321/blog/` | Post list renders, images load |
| Portfolio | `http://localhost:4321/portfolio/` | Cards render |
| Resume | `http://localhost:4321/resume/` | Skills and experience sections render |
| Recommendations | `http://localhost:4321/recommendations/` | Items render, links present |

- [ ] **Step 3: Verify interactive islands**

- **Theme toggle** — click the toggle; dark/light mode switches and persists on refresh
- **Search (Pagefind)** — open search, type a term, results appear
- **Navigation menu** — open and close the menu on a narrow viewport

- [ ] **Step 4: Stop the preview server**

Press `Ctrl+C`.

- [ ] **Step 5: Open the PR**

```bash
git push -u origin astro-6-upgrade
gh pr create \
  --title "Upgrade Astro from v5 to v6" \
  --body "$(cat <<'EOF'
## Summary
- Ran `npx @astrojs/upgrade` to bump Astro core and all official `@astrojs/*` integrations to v6
- Bumped `astro-pagefind` to 1.8.6 (first release with Astro 6 peer dep support) and `@sentry/astro` to latest
- Updated `z` import in `content.config.ts` from `astro:content` to `astro/zod` (Zod 4 deprecation)
- Fixed `z.string().url()` → `z.url()` in recommendations schema (Zod 4)
- Removed stale `globalThis._sentryEsmLoaderHookRegistered` workaround from `astro.config.mjs`
- Added `NODE_VERSION = "22"` to `netlify.toml` (Astro 6 minimum requirement)

## Test plan
- [ ] `npm run build` passes clean locally
- [ ] Home, blog, portfolio, resume, recommendations pages render correctly in preview
- [ ] Theme toggle, Pagefind search, and navigation menu work
- [ ] Netlify deploy preview builds successfully
EOF
)"
```
