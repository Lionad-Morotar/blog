const baseUrl = 'https://lionad.art'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  experimental: {
    payloadExtraction: true
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => [].includes(tag),
    },
  },

  extends: ['@nuxt/ui-pro'],

  modules: [
    'nuxt-gtag',
    '@nuxt/content',
    // 'nuxt-content-git',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    '@nuxtjs/sitemap',
    '@nuxtjs/mdc',
    'nuxt-feedme',
    // ! cant fetch twimoji error, so disable for a while
    // 'nuxt-og-image'
  ],

  gtag: {
    // cspell:disable-next-line
    id: 'G-P6HBJNW6QT'
  },

  site: {
    url: 'https://lionad.art',
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/flows',
        '/articles',
        '/tools',
        '/music',
        '/books',
        '/links',
        '/sitemap.xml',
      ],
    },
  },

  /**
   * Feeds Setting
   * @see https://nuxt.com/modules/nuxt-feedme
   */
  feedme: {
    feeds: {
      '/feed.atom': { revisit: '24h', type: 'atom1', content: true },
      '/feed.xml': { revisit: '24h', type: 'rss2', content: true },
      '/feed.json': { revisit: '24h', type: 'json1', content: true },
    },
    content: {
      feed: {
        defaults: {
          id: baseUrl,
          title: '仿生狮子',
          link: baseUrl,
          author: { email: '1806234223@qq.com', name: 'lionad' },
          categories: ['lionad','front-end','science','flow'],
          copyright: 'CC BY-NC-SA 4.0',
        },
      },
      item: {
        query: {
          where: [
            { _path: /^\/(articles|flows)\/([^_]|(_fourty-two))/ },
          ],
        },
        mapping: [
          // Third item is optional mapping function
          ['date', 'modified', value => value ? new Date(value) : value],
          // When mapping function result is undefined - next variant applied
          ['date', 'created', value => value ? new Date(value) : value],
          // Until the real one value will be set
          ['date', '', () => new Date()],
          // By default mapping is x => x
          ['link', '_path'],
        ],
      },
      tags: [
        [/^(?=\/)/, baseUrl],
      ],
      revisit: '24h',
    },
  },

  hooks: {
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
          'Mermaid',
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
    '/api/search.json': {
      prerender: true
    },
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
        'stylus',
        'js',
        'powershell',
        'scss',
        'shell',
        'ts',
        'vue',
        'makefile',
        'mermaid',
        'csharp',
      ],
    },
  },

  compatibilityDate: '2024-11-21',
})
