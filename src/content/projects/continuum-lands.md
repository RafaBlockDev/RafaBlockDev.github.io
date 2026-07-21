---
title: "Continuum Lands: Real Estate Intelligence Built on a Graph"
summary: >
  An AI-driven real estate intelligence platform for Mexican property
  markets, turning zoning codes, comparables, and market signals into
  investor-ready reports through a graph-modeled data layer.
date: 2026-07-21
role: "Design, data architecture, and implementation"
stack: ["Graph data modeling", "AI-driven report generation", "Geospatial data", "Financial modeling"]
demoUrl: "https://lands.continuumai.app/"
tags: ["real-estate", "ai", "graph-data"]
ogImage: "/og/project-continuum-lands.png"
draft: false
---

## Problem

Deciding whether a property is worth investing in or developing usually
means pulling together zoning rules, density coefficients, nearby
services, comparable sales, and multi-year financial projections from
several disconnected sources and specialists. That process is slow, hard
to reproduce consistently across properties, and rarely delivered as a
single, coherent document.

## Approach

Continuum Lands turns that process into one on-demand report. Given a
property, the platform assembles a technical assessment, a financial
analysis, multi-year projections, renderings, and market research into a
single proposal generated specifically for that parcel and its
surroundings, rather than filled into a fixed template. It is built to
handle any property type or location across Mexico.

## Architecture

- Land, zoning, and market data are modeled as a graph rather than flat
  tables, so relationships between a parcel, its coefficients (COS/CUS),
  transit access, nearby services, and comparable properties can be
  traversed directly instead of reconstructed through joins across more
  than 320 variables.
- A generation pipeline aggregates data from multiple sources at request
  time, validates it, and composes each report from that specific graph
  neighborhood, so the analysis reflects the actual property rather than
  a generic profile of its area.

## Technical decisions

- Graph modeling over relational tables: zoning coefficients, transit
  access, and comparable-sales relationships vary independently and
  combine differently for every property. A graph keeps those
  relationships first-class instead of flattening them into queries that
  grow more fragile as new variables are added.
- Reports generated per property rather than assembled from static
  templates, so unusual parcels are analyzed on their own terms instead
  of being forced into a generic report shape.

## Limitations

The platform currently covers Mexican property markets, and the depth of
analysis for a given property depends on the public and licensed data
available for its region.
