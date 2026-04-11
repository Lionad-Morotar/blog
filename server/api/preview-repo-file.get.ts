import { resolve, dirname } from 'node:path'
import { existsSync, readFileSync, statSync } from 'node:fs'

function findGitRoot(dir: string): string | null {
  let current = resolve(dir)
  while (true) {
    if (existsSync(resolve(current, '.git'))) {
      return current
    }
    const parent = dirname(current)
    if (parent === current) {
      break
    }
    current = parent
  }
  return null
}

function detectVscodeScheme(): string {
  if (existsSync('/Applications/Visual Studio Code.app')) return 'vscode'
  if (existsSync('/Applications/Visual Studio Code - Insiders.app')) return 'vscode-insiders'
  if (existsSync('/Applications/OpenCode.app')) return 'vscode'
  return 'vscode-insiders'
}

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const query = getQuery(event)
  const filePath = String(query.path || '')

  if (!filePath || filePath.includes('..')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  const config = useRuntimeConfig(event)
  const rawDirs = (config.previewDirs as string) || ''
  const dirs = rawDirs
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean)

  const cleanPath = filePath.replace(/^\/+/, '')

  for (const dir of dirs) {
    const gitRoot = findGitRoot(dir)
    if (!gitRoot) {
      continue
    }

    const fullPath = resolve(gitRoot, cleanPath)
    const resolvedGitRoot = resolve(gitRoot)

    if (!fullPath.startsWith(resolvedGitRoot + '/') && fullPath !== resolvedGitRoot) {
      continue
    }

    try {
      const stat = statSync(fullPath)
      if (!stat.isFile()) {
        continue
      }
      const content = readFileSync(fullPath, 'utf-8')
      return {
        path: filePath,
        content,
        ext: cleanPath.split('.').pop() || '',
        size: content.length,
        absolutePath: fullPath,
        vscodeScheme: detectVscodeScheme(),
      }
    }
    catch {
      continue
    }
  }

  throw createError({ statusCode: 404, statusMessage: 'File not found' })
})
