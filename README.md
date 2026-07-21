# rafablockdev.github.io

Personal website and knowledge hub of Rafael Fuentes Rangel, a software
engineer working in ML/AI. Built with [Astro](https://astro.build), with a
LaTeX-inspired design system.

Live at [rafablockdev.github.io](https://rafablockdev.github.io/).

## Project structure

```text
/
├── public/                  # favicon, robots.txt, manifest, og/ social cards
├── scripts/generate-og.mjs  # social-preview card generator (bun run og)
├── src/
│   ├── components/          # BaseHead (SEO), Breadcrumbs, Sidenote
│   ├── content/
│   │   ├── research/        # papers & technical/expository notes
│   │   ├── projects/        # engineering case studies
│   │   └── notebook/        # exploratory working notes (MDX)
│   ├── layouts/             # AcademicLayout.astro (shared shell + nav)
│   ├── lib/                 # site config, paths, JSON-LD builders
│   ├── styles/global.css    # theme + shared article typography
│   └── pages/               # index, research, projects, notebook,
│                            # about, 404, rss.xml
└── astro.config.mjs         # site URL, /papers→/research redirect, sitemap
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

All three sections (research, projects, notebook) are Astro content
collections defined in `src/content.config.ts`. Add a new entry by dropping a
Markdown/MDX file into the matching `src/content/` folder; `_template.md`
files show the expected frontmatter. Entries with `draft: true` never render.

To give a page a custom social-preview card, run
`bun run og -- --title "..." --category "Research" --out my-slug.png` and set
`ogImage: "/og/my-slug.png"` in the entry's frontmatter.

## Deployment

Pushing to `main` builds the site with Bun and deploys it to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. No manual build step is needed.
