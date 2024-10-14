import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    collections: z.array(z.string()).default([]),
    year: z.string().optional(),
    status: z.string().optional(),
    icon: z.string().optional(),
    hidden: z.boolean().optional(),
    sort_order: z.number().optional(),
    // Add any other fields your projects have
  })
});

export const collections = {
  'projects': projectsCollection,
};

