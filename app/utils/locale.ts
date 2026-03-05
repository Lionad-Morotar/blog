export type PreferredLocale = 'zh' | 'en'

export function getLocaleFromPath(path: string): PreferredLocale {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'zh'
}

export function stripEnPrefix(path: string): string {
  if (path === '/en') return '/'
  if (path.startsWith('/en/')) return `/${path.slice(4)}`
  return path
}

export function withLocalePath(locale: PreferredLocale, basePath: string): string {
  if (locale === 'zh') return basePath
  return basePath === '/' ? '/en' : `/en${basePath}`
}
