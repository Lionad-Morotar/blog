import {
  addComponent,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import react from '@vitejs/plugin-react'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-excalidraw',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },

  setup(_options, nuxt) {
    nuxt.options.vite ||= {}
    nuxt.options.vite.plugins ||= []
    nuxt.options.vite.plugins.push(react())

    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'ExcalidrawBoard',
      filePath: resolver.resolve('./runtime/components/ExcalidrawBoard.vue'),
    })
  },
})
