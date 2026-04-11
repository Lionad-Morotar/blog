import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../')

await setup({ rootDir, server: true, browser: false, dev: true })

interface PreviewResponse {
  title: string
  description?: string
  body: {
    type: string
    children: unknown[]
    toc?: {
      links: unknown[]
    }
  }
  path: string
  toc: boolean
}

interface PreviewIndexItem {
  slug: string
  title: string
  description?: string
  children?: PreviewIndexItem[]
}

function findInTree(nodes: PreviewIndexItem[], predicate: (n: PreviewIndexItem) => boolean): PreviewIndexItem | undefined {
  for (const node of nodes) {
    if (predicate(node)) return node
    if (node.children) {
      const found = findInTree(node.children, predicate)
      if (found) return found
    }
  }
  return undefined
}

describe('Preview API', () => {
  it('returns index list at root', async () => {
    const data = await $fetch<PreviewIndexItem[]>('/api/preview')

    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)

    const item = findInTree(data, (d) => d.slug === '01-what-is-claude-code')
    expect(item).toBeDefined()
    expect(item?.title).toBeDefined()
  })

  it('returns 404 for invalid paths', async () => {
    let error: any
    try {
      await $fetch('/api/preview/foo/bar')
    }
    catch (err: any) {
      error = err
    }

    expect(error?.statusCode ?? error?.status ?? error?.response?.status).toBe(404)
  })

  it('returns 404 for missing files', async () => {
    let error: any
    try {
      await $fetch('/api/preview/non-existent-file')
    }
    catch (err: any) {
      error = err
    }

    expect(error?.statusCode ?? error?.response?.status).toBe(404)
  })

  it('returns parsed markdown for valid files', async () => {
    const data = await $fetch<PreviewResponse>('/api/preview/01-what-is-claude-code')

    expect(data.title).toBeDefined()
    expect(data.body).toBeDefined()
    expect(data.body.type).toBe('root')
    expect(Array.isArray(data.body.children)).toBe(true)
  })

  it('returns TOC in body for documents with headings', async () => {
    const data = await $fetch<PreviewResponse>('/api/preview/01-what-is-claude-code')

    expect(data.body.toc).toBeDefined()
    expect(Array.isArray(data.body.toc!.links)).toBe(true)
  })
})
