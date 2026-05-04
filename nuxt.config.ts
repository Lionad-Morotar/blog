const baseUrl = 'https://lionad.art'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: ['~/assets/css/main.css'],

  experimental: {
    payloadExtraction: true
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['Name'].includes(tag),
    },
  },

  modules: [
    'nuxt-gtag',
    'nuxt-content-git',
    '@nuxt/image',
    '@nuxt/ui',
    '@lionad/nuxt-excalidraw',
    '@nuxt/content',
    '@nuxtjs/fontaine',
    '@nuxtjs/sitemap',
    '@nuxtjs/mdc',
    'nuxt-feedme',
    'nuxt-llms',
    // ! cant fetch twimoji error, so disable for a while
    // 'nuxt-og-image'
    '@nuxt-dev/medium-zoom',
  ],

  runtimeConfig: {
    previewDirs: process.env.NUXT_PREVIEW_DIRS || '/Users/lionad/Github/Run/claw-code/docs/.report',
  },

  gtag: {
    // cspell:disable-next-line
    id: 'G-P6HBJNW6QT'
  },

  site: {
    url: 'https://lionad.art',
  },

  /**
   * LLMs.txt - 为 LLM 生成友好的文档索引
   * @see https://github.com/nuxt-content/nuxt-llms
   */
  llms: {
    domain: 'https://lionad.art',
    title: '仿生狮子的博客',
    description: 'Lionad 的博客，关于前端工程、科学哲学、Flow 与知识管理',
    full: {
      title: '博客完整内容',
      description: '包含所有文章、流程笔记与知识地图的完整内容',
    },
    sections: [
      {
        title: '文章',
        description: '技术博客文章与随笔',
        links: [
          { title: '全部文章', description: '所有博客文章列表', href: '/articles' },
        ],
      },
      {
        title: 'Flow',
        description: '流程笔记与方法论',
        links: [
          { title: 'Flows', description: '所有流程笔记', href: '/flows' },
        ],
      },
      {
        title: '知识地图',
        description: '结构化知识笔记',
        links: [
          { title: '知识地图', description: '知识地图总览', href: '/maps' },
        ],
      },
      {
        title: '工具',
        description: '开发工具与配置分享',
        links: [
          { title: '工具箱', description: '常用工具与配置', href: '/tools' },
        ],
      },
      {
        title: '源码分析',
        description: '开源项目源码阅读笔记',
        links: [
          { title: '源码阅读', description: '源码分析笔记', href: '/source-code' },
        ],
      },
    ],
    notes: [
      '本博客内容使用 CC BY-NC-SA 4.0 协议授权',
      'Nuxt Content 自动集成，所有 Markdown 内容均包含在 llms-full.txt 中',
    ],
  },

  /**
   * Sitemap Configuration
   * @see https://nuxtseo.com/sitemap/getting-started/how-it-works
   */
  sitemap: {
    // Auto-generate from preRendered routes
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

  ssr: false,
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
   * @see https://github.com/helltraitor/nuxt-feedme
   */
  feedme: {
    defaults: {
      // 禁用默认配置，使用自定义配置
      common: false,
      routes: false,
      mapping: false,
      mappingTemplates: false,
    },
    feeds: {
      common: {
        revisit: '8h',
        fixDateFields: true,
        feed: {
          id: baseUrl,
          title: '仿生狮子',
          link: baseUrl,
          description: 'Lionad 的博客，关于前端、科学、Flow 与笔记',
          author: { email: '1806234223@qq.com', name: 'lionad' },
          copyright: 'CC BY-NC-SA 4.0',
        },
        collections: ['flows', 'articles'],
        mapping: [
          ['link', 'path'],
          ['date', 'modified'],
          ['date', 'created'],
          ['title', 'title'],
          ['description', 'description'],
        ],
        // replace 配置暂时禁用 - 需要正确处理正则序列化
        // replace: [
        //   ['/^(?=\\/)/', baseUrl],
        // ],
      },
      routes: {
        '/feed.atom': { type: 'atom1' },
        '/feed.xml': { type: 'rss2' },
        '/feed.json': { type: 'json1' },
      },
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
          'Excalidraw',
          'UserPersona'
        ].includes(c.pascalName)
      )

      globals.forEach((c) => (c.global = true))
    },
  },


  // Nuxt Content v3 配置
  // - 集合定义在 content.config.ts
  // - Markdown/高亮配置在 content.build.markdown 下

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

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
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
            'python',
            'go',
            'rust'
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
      }
    }
  },

  mediumZoom: {
    // custom options
    selector: '#__nuxt :not(a) > img, [data-zoomable]',
    margin: 24,
    scrollOffset: 10,
  },

  compatibilityDate: '2024-11-21',

  vite: {
    optimizeDeps: {
      include: ['@excalidraw/excalidraw', 'react', 'react-dom/client'],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      allowedHosts: ['host.docker.internal', 'localhost', '.localhost'],
    },
  },

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

  /**
   * Nuxt UI - 使用本地字体，避免 bunny.net 网络请求失败
   */
  ui: {
    fonts: false,
  },
})
