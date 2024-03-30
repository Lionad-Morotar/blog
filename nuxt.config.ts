// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: tag => [].includes(tag)
    },
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    'nuxt-og-image'
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['Commend', 'Compare', 'ReadBase64', 'LLink', 'Spark', 'UButton', 'UIcon', 'AspectRatio'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      }
    }
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  devtools: {
    enabled: false,
  },
  typescript: {
    strict: false
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
        'csharp'
      ]
    }
  }
})
