import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    date: z.date(),
    arxivId: z.string().optional(),
    pdfUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    bibtex: z.string().optional(),
    tags: z.array(z.string()),
    abstract: z.string()
  })
});

const notebook = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notebook' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    summary: z.string(),
    tags: z.array(z.string()),
    math: z.boolean().default(true)
  })
});

export const collections = { papers, notebook };
