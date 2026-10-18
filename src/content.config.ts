import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { siteConfig } from '../sites/active/site.config';

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: `./content/${siteConfig.contentRoot}/pages`,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    section: z.string(),
    order: z.number(),
    verifiedAgainst: z.string(),
    quickAnswer: z.array(z.string()).min(3).max(6),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })),
    related: z.array(z.object({ href: z.string(), label: z.string() })),
  }),
});

export const collections = { pages };
