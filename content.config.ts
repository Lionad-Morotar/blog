import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['**/.obsidian', '**/.*', '**/_*/**', '**/.*', '**/_*', '**/*.excalidraw'],
      },
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        navigation: z.union([z.boolean(), z.object({
          title: z.string().optional(),
          icon: z.string().optional(),
          to: z.string().optional(),
          target: z.string().optional(),
        })]).optional(),
        links: z.array(z.object({
          label: z.string(),
          to: z.string(),
          target: z.string().optional(),
          icon: z.string().optional(),
          color: z.string().optional(),
          variant: z.string().optional(),
        })).optional(),
        toc: z.boolean().optional(),
        icon: z.string().optional(),
        date: z.string().optional(),
        modified: z.string().optional(),
        created: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional(),
        image: z.string().optional(),
        draft: z.boolean().optional(),
      }),
    }),
  },
})
