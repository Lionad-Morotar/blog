import { resolve, normalize } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const { path } = getRouterParams(event)
  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Missing path' })
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

  // Prevent path traversal: normalize the requested filename and enforce .md extension
  const fileName = normalize(path).replace(/\\/g, '/')
  if (fileName.includes('..')) {
    throw createError({ statusCode: 404, statusMessage: 'Invalid preview path' })
  }

  const targetFile = `${fileName}.md`

  for (const dir of dirs) {
    const filePath = resolve(dir, targetFile)
    const resolvedDir = resolve(dir)

    // Path traversal guard: resolved file must be inside the base directory
    if (!filePath.startsWith(resolvedDir + '/') && filePath !== resolvedDir) {
      continue
    }

    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8')
      try {
        const parsed = await parseMarkdown(content)
        return {
          title: parsed.data?.title || fileName,
          description: parsed.data?.description,
          body: {
            ...parsed.body,
            toc: parsed.toc,
          },
          path: `/preview/${path}`,
          toc: true,
        }
      }
      catch (parseError) {
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to parse markdown: ${parseError instanceof Error ? parseError.message : 'unknown error'}`,
        })
      }
    }
  }

  throw createError({ statusCode: 404, statusMessage: 'Preview file not found' })
})
