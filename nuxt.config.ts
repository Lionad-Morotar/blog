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
    'nuxt-excalidraw',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    '@nuxtjs/sitemap',
    '@nuxtjs/mdc',
    'nuxt-feedme',
    // ! cant fetch twimoji error, so disable for a while
    // 'nuxt-og-image'
    '@nuxt-dev/medium-zoom',
  ],

  gtag: {
    // cspell:disable-next-line
    id: 'G-P6HBJNW6QT'
  },

  site: {
    url: 'https://lionad.art',
  },

  /**
   * Sitemap Configuration
   * @see https://nuxtseo.com/sitemap/getting-started/how-it-works
   */
  sitemap: {
    // Auto-generate from prerendered routes
    // Nuxt Content pages are automatically included via prerendering
    exclude: [
      '/_dir',
      '/_/**',
      '/en/_dir',
      '/**/_dir',
      '/**/_.*',
      '/api/**',
      '/__sitemap/**',
    ],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        '/',
        '/flows',
        '/articles',
        '/en/articles',
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
      '/feed.atom': { revisit: '8h', type: 'atom1', content: true },
      '/feed.xml': { revisit: '8h', type: 'rss2', content: true },
      '/feed.json': { revisit: '8h', type: 'json1', content: true },
    },
    content: {
      feed: {
        defaults: {
          id: baseUrl,
          title: '仿生狮子',
          link: baseUrl,
          author: { email: '1806234223@qq.com', name: 'lionad' },
          categories: ['lionad','front-end','science','flow','notes'],
          copyright: 'CC BY-NC-SA 4.0',
        },
      },
      item: {
        query: {
          where: [
            { _path: /^\/(2\.articles|1\.flows)\/([^_]|(_forty-two))/ },
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

  ui: ({ icons: ['heroicons', 'simple-icons'] } as any),

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
      prerender: true,
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
        'java',
        'nginx',
        'python'
      ],
    },
    rehypePlugins: {
      'rehype-mathjax': {
        src: 'rehype-mathjax',
        options: {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
          },
        },
      },
    },
  },

  mediumZoom: {
    // custom options
    selector: '#__nuxt :not(a) > img, [data-zoomable]',
    margin: 24,
    scrollOffset: 10,
  },

  compatibilityDate: '2024-11-21',

  /**
   * Color Mode - 避免 hydration mismatch
   * 强制使用 light 模式作为 SSR 默认值，客户端再检测偏好
   */
  colorMode: {
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  /**
   * Nuxt Icon - 客户端打包配置
   * 避免静态托管时 API 路由 404 导致 hydration 失败
   */
  icon: {
    clientBundle: {
      // 显式指定 UColorModeButton 使用的图标
      icons: [
        'heroicons:sun-20-solid',
        'heroicons:moon-20-solid',
      ],
    },
  },
})
