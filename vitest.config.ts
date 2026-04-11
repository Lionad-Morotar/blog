import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'node',
  },
  plugins: [
    {
      name: 'mock-bun-test',
      enforce: 'pre',
      resolveId(id) {
        if (id === 'bun:test') {
          return '\0mock-bun-test'
        }
      },
      load(id) {
        if (id === '\0mock-bun-test') {
          return `
            export function mock() { return () => {} }
            export function beforeAll() {}
            export function beforeEach() {}
            export function afterEach() {}
            export function afterAll() {}
          `
        }
      },
    },
  ],
})
