---
title: "This Website: a LaTeX-Inspired Personal Site on Astro"
summary: >
  A statically generated personal site and knowledge hub with an academic,
  LaTeX-influenced design system, structured content collections, and
  automated deployment to GitHub Pages.
date: 2026-07-21
role: "Design, implementation, and deployment"
stack: ["Astro", "TypeScript", "Tailwind CSS", "KaTeX", "GitHub Actions", "Bun"]
repoUrl: "https://github.com/RafaBlockDev/RafaBlockDev.github.io"
demoUrl: "https://rafablockdev.github.io/"
tags: ["static-site", "design-system", "tooling"]
ogImage: "/og/project-personal-website.png"
---

## Problem

I wanted a single place that works as both a professional home page and a
technical knowledge base: research notes with real mathematical notation,
engineering write-ups, and a working notebook, without maintaining a CMS or
a server.

## Approach

The site is fully static, built with Astro and deployed to GitHub Pages
through a GitHub Actions workflow. Content lives in typed content
collections (research, projects, notebook), each with a schema
that enforces honest metadata: publication status labels, dates, and
draft flags. Nothing renders publicly unless it is explicitly marked
ready.

## Architecture

- **Astro content collections** with Zod schemas for four content types,
  each rendered through shared layout and metadata components.
- **KaTeX via remark-math/rehype-katex** for server-rendered mathematics;
  no client-side math JavaScript is shipped.
- **Tailwind CSS** with a small custom theme (paper, ink, accent) that
  implements the LaTeX-inspired visual system.
- **GitHub Actions** builds with Bun and deploys the `dist/` output to
  GitHub Pages on every push to `main`.

## Technical decisions

- Static generation over a hosted CMS: content is version-controlled
  Markdown/MDX, reviewable in pull requests like code.
- System serif fonts (Georgia with Computer Modern fallback) instead of
  webfonts: the academic look without layout shift or font-loading cost.
- Sidenotes are implemented with a CSS-only checkbox toggle so they work
  without JavaScript on mobile and render in the margin on wide screens.

## Limitations

- Social-preview images are generated ahead of time rather than per-request;
  new content needs a regeneration step for a custom card.
- No search yet; navigation relies on section indexes.

## Source

The full source is public: [RafaBlockDev/RafaBlockDev.github.io](https://github.com/RafaBlockDev/RafaBlockDev.github.io).
