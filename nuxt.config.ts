import rssPosts from './rss.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => [].includes(tag),
    },
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    '@nuxtjs/sitemap',
    // ! weird error, disable for a while
    // "@nuxtjs/feed",
    // ! cant fetch twimoji error, so disable for a while
    // 'nuxt-og-image'
  ],
  site: {
    url: 'https://lionad.art',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml'],
    },
  },
  // @ts-ignore see https://github.com/nuxt-community/feed-module
  feed: {
    path: '/rss.xml',
    async create(feed) {
      feed.options = {
        title: 'Lionad\'s blog',
        link: 'https://www.lionad.art/rss.xml',
        description: 'Feed for Lionad\'s Blog',
      }
      rssPosts.forEach((post) => {
        feed.addItem({
          title: post.title,
          id: post.url,
          link: post.url,
          description: post.description,
          content: post.content,
        })
      })
      feed.addCategory('Lionad')
      feed.addContributor({
        name: 'Lionad',
        email: '1806234223@qq.com',
        link: 'https://www.lionad.art',
      })
    },
  },
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) =>
        [
          'Commend',
          'Compare',
          'ReadBase64',
          'LLink',
          'Spark',
          'UButton',
          'UIcon',
          'AspectRatio',
        ].includes(c.pascalName)
      )

      globals.forEach((c) => (c.global = true))
    },
  },
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  devtools: {
    enabled: false,
  },
  typescript: {
    strict: false,
  },
  mdc: {
    highlight: {
      langs: [
        'bash',
        'cpp',
        'css',
        'glsl',
        'html',
        'less',
        'js',
        'powershell',
        'scss',
        'shell',
        'ts',
        'vue',
        'makefile',
        'csharp',
      ],
    },
  },
})
