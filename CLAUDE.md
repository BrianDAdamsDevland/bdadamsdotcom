# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build locally
- `npm run "package update"` - Update all dependencies using npm-check-updates

## Architecture Overview

This is Brian D. Adams' personal website built with Astro as a static site generator. The site combines portfolio, blog, resume, and recommendations sections with a sophisticated multi-framework architecture.

### Multi-Framework Setup

The project demonstrates Astro's island architecture by supporting multiple UI frameworks:
- **Vue.js** - Primary framework for interactive components (Menu.vue, ThemeToggle.vue, Typer.vue)
- **React, Preact, Solid, Svelte, Alpine.js, Lit** - Secondary frameworks with directory-scoped configurations
- Each framework is isolated to specific directories (e.g., `/react/`, `/preact/`, `/solid/`)

### Content Collections Structure

Content is managed through Astro's Content Collections API with the following structure:
- `blog/` - Technical blog posts (MDX format for interactive content)
- `portfolio/` - Project showcase items  
- `recommendations/` - Media recommendations categorized by type (movies, TV, podcasts, apps, music)
- `resume/` + `resumeExperience/` + `resumeSkills/` - Resume data broken into logical sections

### Key Patterns

**Component Architecture:**
- Astro components for server-side rendering and layouts
- Vue components for client-side interactivity with `client:load` directives
- Island-based hydration for optimal performance

**Content Management:**
- Content collections provide type safety and automatic schema validation
- Images stored alongside content in dedicated `images/` directories
- Chronological sorting for blog/portfolio, categorical for recommendations

**Theming System:**
- CSS custom properties for comprehensive dark/light theme support
- Theme persistence via localStorage
- SCSS preprocessing with global styles in `/src/assets/`

**Deployment:**
- Netlify hosting with automatic deployments
- Static output mode for optimal performance
- Sentry integration for error monitoring

## Important File Locations

- Content configuration: `src/content.config.ts` (not `src/content/config.ts`)
- Main layout: `src/layouts/Layout.astro`
- Global styles: `src/assets/global.scss` and `src/assets/theme.scss`
- Utility functions: `src/utils/recommended.ts`

## Content Creation Notes

When adding new content:
- Blog posts support both `.md` and `.mdx` formats
- Images should be co-located with content in `images/` subdirectories
- Use the existing schema patterns in content.config.ts for consistency
- Recommendations require `type` field for proper categorization