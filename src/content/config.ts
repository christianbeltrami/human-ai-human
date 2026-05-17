import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: z.enum(['fr', 'en']).default('fr'),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    hideSignature: z.boolean().default(false),
    seoTitle: z.string().optional(),
    description: z.string().optional(),
    modified: z.date().optional(),
  }),
});

export const collections = { posts };
