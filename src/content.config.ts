import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    status: z.enum([
      'published',
      'preprint',
      'technical-note',
      'expository-note',
      'work-in-progress',
      'notebook-entry'
    ]),
    venue: z.string().optional(),
    date: z.date(),
    updatedDate: z.date().optional(),
    version: z.string().optional(),
    summary: z.string(),
    abstract: z.string(),
    contributions: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    arxivId: z.string().optional(),
    pdfUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    bibtex: z.string().optional(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const notebook = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notebook' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    math: z.boolean().default(true),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { research, projects, writing, notebook };
