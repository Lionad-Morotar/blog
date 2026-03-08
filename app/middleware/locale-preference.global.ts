import { getLocaleFromPath, stripEnPrefix, withLocalePath } from '~/utils/locale'

// 根据路径确定 collection
function getCollectionFromPath(path: string): string {
  if (path.startsWith('/1.flows') || path.startsWith('/flows')) return 'flows'
  if (path.startsWith('/2.articles') || path.startsWith('/articles')) return 'articles'
  if (path.startsWith('/4.books') || path.startsWith('/books')) return 'books'
  if (path.startsWith('/4.music') || path.startsWith('/music')) return 'music'
  if (path.startsWith('/6.maps') || path.startsWith('/maps')) return 'maps'
  if (path.startsWith('/7.tools') || path.startsWith('/tools')) return 'tools'
  if (path.startsWith('/8.source-code') || path.startsWith('/source-code')) return 'sourceCode'
  if (path.startsWith('/9.hire') || path.startsWith('/hire')) return 'hire'
  if (path.startsWith('/10.links') || path.startsWith('/links')) return 'links'
  if (path.startsWith('/_achieved')) return 'achieved'
  return 'other'
}

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip internal Nuxt routes and API routes
  if (to.path.startsWith('/_') || to.path.startsWith('/api/')) return

  const currentLocale = getLocaleFromPath(to.path)
  const basePath = stripEnPrefix(to.path)
  const enPath = withLocalePath('en', basePath)

  // Use state to share server query result with client
  const contentExistsState = useState<{
    zh: boolean
    en: boolean
  }>(`locale-content:${basePath}`, () => ({
    zh: false,
    en: false,
  }))

  // Only query on server to avoid client-side API calls
  if (process.server) {
    const baseCollection = getCollectionFromPath(basePath)
    const enCollection = getCollectionFromPath(enPath)

    try {
      const result = await queryCollection(baseCollection as any).path(basePath).first()
      contentExistsState.value.zh = !!result
    } catch {
      contentExistsState.value.zh = false
    }

    try {
      const result = await queryCollection(enCollection as any).path(enPath).first()
      contentExistsState.value.en = !!result
    } catch {
      contentExistsState.value.en = false
    }
  }

  const hasZh = contentExistsState.value.zh
  const hasEn = contentExistsState.value.en

  // Server-side: redirect to correct locale if content doesn't exist in current locale
  if (currentLocale === 'en' && !hasEn && hasZh) {
    return navigateTo({ path: basePath, query: to.query, hash: to.hash }, { redirectCode: 302 })
  }

  // 暂时禁用客户端自动跳转，避免 hydration 问题
  // if (process.server) return

  // // Client-side: respect user preference
  // const preferredLocale = usePreferredLocale()

  // if (preferredLocale.value === 'en' && currentLocale === 'zh' && hasEn) {
  //   return navigateTo({ path: enPath, query: to.query, hash: to.hash })
  // }

  // if (preferredLocale.value === 'zh' && currentLocale === 'en' && hasZh) {
  //   return navigateTo({ path: basePath, query: to.query, hash: to.hash })
  // }
})
