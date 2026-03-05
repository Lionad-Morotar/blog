import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// 基础 Schema - 所有内容类型共有的字段
const baseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  navigation: z.union([z.boolean(), z.object({
    title: z.string().optional(),
    icon: z.string().optional(),
    to: z.string().optional(),
    target: z.string().optional(),
  })]).optional(),
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
  // nuxt-content-git 注入的字段
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

// 文章 Schema - 包含 links 字段（用于相关链接）
const articleSchema = baseSchema.extend({
  links: z.array(z.object({
    label: z.string(),
    to: z.string(),
    target: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    variant: z.string().optional(),
  })).optional(),
})

// 首页推荐 Schema
const recommendSchema = baseSchema.extend({
  recommends: z.array(z.object({
    category: z.string(),
    label: z.string(),
    to: z.string(),
  })).optional(),
})

// 通用排除规则（保留 _ 开头的文件夹，在各集合中单独排除）
const commonExcludes = [
  '**/.obsidian/**',
  '**/.!(navigation.yml)',
  '**/*.excalidraw',
]

// 排除 _ 开头文件夹的规则（用于需要排除的集合）
const excludesWithUnderscore = [
  ...commonExcludes,
  '**/_*/**',
  '**/_*',
]

export default defineContentConfig({
  collections: {
    // ⚠️ 注意：当不同 collection 引用同一个文件时，HMR 会失效

    // 首页推荐/Recommends
    recommends: defineCollection({
      type: 'page',
      source: {
        include: 'index.yml',
      },
      schema: recommendSchema,
    }),

    // 流程/Flows
    flows: defineCollection({
      type: 'page',
      source: {
        include: '1.flows/**',
        exclude: [
          '**/.obsidian/**',
          '**/.!(navigation.yml)',
          '**/*.excalidraw',
          // 注意：1.flows/_forty-two 被保留，不在此排除
        ],
      },
      schema: baseSchema,
    }),

    // 文章/Articles
    articles: defineCollection({
      type: 'page',
      source: {
        include: '2.articles/**',
        exclude: excludesWithUnderscore,
      },
      schema: articleSchema,
    }),

    // 书籍/Books
    books: defineCollection({
      type: 'page',
      source: {
        include: '4.books/**',
        exclude: excludesWithUnderscore,
      },
      schema: baseSchema,
    }),

    // 音乐/Music
    music: defineCollection({
      type: 'page',
      source: {
        include: '4.music/**',
        exclude: excludesWithUnderscore,
      },
      schema: baseSchema,
    }),

    // 知识地图/Maps
    maps: defineCollection({
      type: 'page',
      source: {
        include: '6.maps/**',
        exclude: commonExcludes,
      },
      schema: baseSchema,
    }),

    // 工具/Tools
    tools: defineCollection({
      type: 'page',
      source: {
        include: '7.tools/**',
        exclude: excludesWithUnderscore,
      },
      schema: baseSchema,
    }),

    // 源码分析/Source Code
    sourceCode: defineCollection({
      type: 'page',
      source: {
        include: '8.source-code/**',
        exclude: commonExcludes,
      },
      schema: baseSchema,
    }),

    // 招聘/Hire
    hire: defineCollection({
      type: 'page',
      source: {
        include: '9.hire/**',
        exclude: excludesWithUnderscore,
      },
      schema: baseSchema,
    }),

    // 链接/Links
    links: defineCollection({
      type: 'page',
      source: {
        include: '10.links/**',
        exclude: excludesWithUnderscore,
      },
      schema: baseSchema,
    }),

    // 归档内容（已发布但大概不再维护）
    achieved: defineCollection({
      type: 'page',
      source: {
        include: '_achieved/**',
        exclude: excludesWithUnderscore,
      },
      schema: baseSchema,
    }),

    // 其他内容（未分类）
    other: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: [
          ...commonExcludes,
          '1.flows/**',
          '2.articles/**',
          '4.books/**',
          '4.music/**',
          '6.maps/**',
          '7.tools/**',
          '8.source-code/**',
          '9.hire/**',
          '10.links/**',
          '_achieved/**',
          '_books/**',
          '_paint/**',
          'todo/**',
          'en/**',
        ],
      },
      schema: baseSchema,
    }),
  },
})
