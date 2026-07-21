# Research Notebook

Rafa Fuentes's academic AI research notebook — preprints and working notes, built with [Astro](https://astro.build).

Live at [rafablockdev.github.io](https://rafablockdev.github.io/).

## Project structure

```text
/
├── public/                  # favicon and other static assets
├── src/
│   ├── components/          # shared Astro components (e.g. Sidenote)
│   ├── content/
│   │   ├── papers/          # preprint entries (markdown)
│   │   └── notebook/        # working-notes entries (MDX)
│   ├── layouts/              # AcademicLayout.astro (shared page shell + nav)
│   ├── lib/paths.ts          # withBase() helper for base-path-safe links
│   └── pages/                # index, /papers, /notebook, /notebook/[slug]
└── astro.config.mjs
```

## Commands

Run from the project root:

| Command         | Action                                      |
| :-------------- | :------------------------------------------- |
| `bun install`    | Install dependencies                         |
| `bun run dev`    | Start local dev server at `localhost:4321`   |
| `bun run build`  | Build the production site to `./dist/`       |
| `bun run preview`| Preview the production build locally         |

## Content

Papers and notebook entries are Astro content collections defined in `src/content.config.ts`. Add a new entry by dropping a markdown/MDX file into `src/content/papers/` or `src/content/notebook/`.

## Deployment

Pushing to `main` builds the site with Bun and deploys it to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. No manual build step is needed.
