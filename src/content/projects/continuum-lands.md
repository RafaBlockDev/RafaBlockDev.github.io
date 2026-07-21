---
title: "Continuum Lands: Real Estate Intelligence Orchestrated as a Graph"
summary: >
  An AI-driven real estate intelligence platform for Mexican property
  markets, turning a single address into an investor-ready report by
  coordinating parallel data collection, deterministic financial modeling,
  and staged analysis through a stateful orchestration graph.
date: 2026-07-21
role: "Backend design, pipeline architecture, and implementation"
stack: ["LangGraph", "FastAPI", "Celery + Redis", "PostgreSQL (Prisma)", "OpenAI", "Playwright"]
demoUrl: "https://lands.continuumai.app/"
tags: ["real-estate", "ai-pipelines", "langgraph"]
ogImage: "/og/project-continuum-lands.png"
draft: false
---

## Problem

Deciding whether a property is worth investing in or developing usually
means pulling together zoning rules, density coefficients, nearby
services, comparable sales, and multi-year financial projections from
several disconnected sources and specialists. That process is slow,
inconsistent across analysts, and rarely delivered as a single, coherent
document.

## Approach

Continuum Lands turns an address into a professional report within a
couple of minutes: land use, zoning, market trends, comparables, and,
depending on the plan, financial projections or full due diligence.
Behind that single request runs a longer, unattended sequence: geocoding
and validation, data collection from several providers, financial
modeling, narrative analysis, and rendering, before the report reaches
the user.

## Architecture

- The pipeline is modeled as a stateful graph rather than a linear
  script. After geocoding, data collection from multiple providers runs
  as parallel branches that rejoin before the report continues; later
  stages such as financial modeling, narrative analysis, and rendering
  run as distinct nodes with their own state, rather than one monolithic
  function trying to do everything in order.
- Financial analysis is computed once, deterministically, and kept
  separate from the narrative layer entirely: the numbers come from
  formulas, not from a language model reasoning about them.
- Every narrative section is grounded against one shared fact sheet built
  early in the pipeline, so figures and claims stay consistent across
  dozens of generated sections instead of drifting apart the way
  independently prompted sections tend to.
- Before any section reaches a language model, an embedding of the
  address and its collected data is checked against previously generated
  analyses for a close semantic match. Only a genuine miss spends a model
  call, so cost and latency scale with how novel a query actually is, not
  with total volume.
- Findings from earlier reports accumulate quietly by municipality, so an
  analysis in a region the system has already covered starts from more
  than a blank page.

## Technical decisions

- API and execution are split: a request returns immediately with a job
  identifier while the pipeline runs in the background, since geocoding,
  several external data providers, a language model, and PDF rendering
  are all too slow to hold a request open for.
- Every external data source fails independently. If one is unavailable,
  the report's completeness score drops but generation continues, rather
  than the whole analysis failing on a single unreliable dependency.
- Two rendering engines, one lightweight and one full-featured, share the
  same domain layer, fact sheet, editorial outline, and narrative
  composition, so different subscription tiers get proportionally deeper
  reports without duplicating the logic that decides what belongs in
  them.

## Limitations

Coverage is currently limited to Mexican property markets, and analysis
depth depends on how much data is available for a given address and its
region.
