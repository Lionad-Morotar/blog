import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({ statusCode: 400, message: 'Path required' })
  }

  // Security: prevent directory traversal
  const sanitizedPath = path.replace(/\.\./g, '')

  // Try to read from public directory first
  const publicPath = resolve(process.cwd(), 'public', sanitizedPath)

  try {
    const content = await readFile(publicPath, 'utf-8')
    return JSON.parse(content)
  } catch {
    throw createError({ statusCode: 404, message: 'File not found' })
  }
})
