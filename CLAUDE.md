# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
bun install        # Install dependencies (required first time)
bun run dev        # Start Astro dev server
bun run build      # Production build
bun run preview    # Preview production build locally
```

**Package manager: bun** (not npm/yarn/pnpm).

## Architecture

**Astro 5 + React 19 Islands** — Single-page portfolio site. Astro handles static rendering; React components hydrate as interactive islands via `client:load` (above-fold) and `client:idle` (below-fold).

**Stack:** Astro 5, React 19, TypeScript (strict), Tailwind CSS v4 (CSS-based `@theme` config in `global.css`, no tailwind.config file), Framer Motion 12, Nanostores.

### Key patterns

- **All interactive components are React islands** in `src/components/react/`. Each is a default export used in `src/pages/index.astro` with Astro's `client:` directives.
- **Bilingual (EN/ES):** Language state lives in `src/stores/language.ts` (nanostore atom). All UI strings come from `src/i18n/translations.ts`. Components use `useStore($lang)` to reactively switch languages. Preference persists in localStorage.
- **Design tokens** are defined via Tailwind v4 `@theme` block in `src/styles/global.css` — accent color (`--color-accent` green), surface grays, muted text colors, fonts (Geist Sans + Geist Mono from CDN).
- **Design philosophy:** Clean Geist/Vercel aesthetic. Black + white + subtle grays. Green accent used sparingly (live indicators, focus rings, section labels, heading dots, stats). Minimal Framer Motion — simple opacity/y fades on scroll, no parallax, no glows, no 3D effects.
- **Layout.astro** provides global meta, font loading, and view transitions.

### Page composition (index.astro)

Navbar → Hero → About → Projects → Stack → Threads → NowBuilding → Contact → Footer

### Content data

Project data, thread data, and stack categories are hardcoded inside their respective components (Projects.tsx, Threads.tsx, Stack.tsx). Stack logos are loaded from Simple Icons CDN with official brand colors.
