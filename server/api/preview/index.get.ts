import { resolve } from 'node:path'
import { readdirSync, readFileSync } from 'node:fs'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

interface PreviewNode {
  name: string
  isFile: boolean
  slug?: string
  title?: string
  description?: string
  children?: PreviewNode[]
}

function sortNodes(nodes: PreviewNode[]): PreviewNode[] {
  return nodes.sort((a, b) => {
    if (a.isFile === b.isFile) {
      return a.name.localeCompare(b.name)
    }
    return a.isFile ? 1 : -1
  })
}

function mergeTrees(trees: PreviewNode[][]): PreviewNode[] {
  const map = new Map<string, PreviewNode>()

  for (const tree of trees) {
    for (const node of tree) {
      const existing = map.get(node.name)
      if (node.isFile) {
        if (!existing) {
          map.set(node.name, node)
        }
      }
      else {
        if (!existing) {
          map.set(node.name, node)
        }
        else if (!existing.isFile && existing.children && node.children) {
          existing.children = mergeTrees([existing.children, node.children])
        }
      }
    }
  }

  return sortNodes(Array.from(map.values()))
}

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const config = useRuntimeConfig(event)
  const rawDirs = (config.previewDirs as string) || ''
  const dirs = rawDirs
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean)

  if (dirs.length === 0) {
    throw createError({ statusCode: 500, statusMessage: 'Preview directories not configured' })
  }

  const seenSlugs = new Set<string>()

  async function scan(dir: string, prefix = ''): Promise<PreviewNode[]> {
    const entries = readdirSync(dir, { withFileTypes: true })
    const nodes: PreviewNode[] = []

    for (const entry of entries) {
      const fullPath = resolve(dir, entry.name)
      const relPath = prefix ? `${prefix}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        const children = await scan(fullPath, relPath)
        if (children.length) {
          nodes.push({
            name: entry.name,
            isFile: false,
            children: sortNodes(children),
          })
        }
      }
      else if (entry.name.endsWith('.md')) {
        const slug = relPath.replace(/\.md$/, '')
        if (seenSlugs.has(slug)) {
          continue
        }
        seenSlugs.add(slug)

        try {
          const content = readFileSync(fullPath, 'utf-8')
          const parsed = await parseMarkdown(content)
          nodes.push({
            name: entry.name,
            isFile: true,
            slug,
            title: parsed.data?.title || slug,
            description: parsed.data?.description,
          })
        }
        catch {
          nodes.push({
            name: entry.name,
            isFile: true,
            slug,
            title: slug,
          })
        }
      }
    }

    return sortNodes(nodes)
  }

  const treeList: PreviewNode[][] = []

  for (const dir of dirs) {
    const resolvedDir = resolve(dir)
    try {
      const entries = readdirSync(resolvedDir, { withFileTypes: true })
      const nodes: PreviewNode[] = []
      for (const entry of entries) {
        const fullPath = resolve(resolvedDir, entry.name)
        const relPath = entry.name

        if (entry.isDirectory()) {
          const children = await scan(fullPath, relPath)
          if (children.length) {
            nodes.push({
              name: entry.name,
              isFile: false,
              children: sortNodes(children),
            })
          }
        }
        else if (entry.name.endsWith('.md')) {
          const slug = relPath.replace(/\.md$/, '')
          if (seenSlugs.has(slug)) {
            continue
          }
          seenSlugs.add(slug)

          try {
            const content = readFileSync(fullPath, 'utf-8')
            const parsed = await parseMarkdown(content)
            nodes.push({
              name: entry.name,
              isFile: true,
              slug,
              title: parsed.data?.title || slug,
              description: parsed.data?.description,
            })
          }
          catch {
            nodes.push({
              name: entry.name,
              isFile: true,
              slug,
              title: slug,
            })
          }
        }
      }
      treeList.push(sortNodes(nodes))
    }
    catch {
      // 如果目录不存在或无法读取，静默跳过
    }
  }

  return mergeTrees(treeList)
})
