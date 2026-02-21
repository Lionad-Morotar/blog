import { getLocaleFromPath, stripEnPrefix, withLocalePath } from '~/utils/locale'

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
    try {
      await queryContent(basePath).only(['_path']).findOne()
      contentExistsState.value.zh = true
    } catch {
      contentExistsState.value.zh = false
    }

    try {
      await queryContent(enPath).only(['_path']).findOne()
      contentExistsState.value.en = true
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

  if (process.server) return

  // Client-side: respect user preference
  const preferredLocale = usePreferredLocale()

  if (preferredLocale.value === 'en' && currentLocale === 'zh' && hasEn) {
    return navigateTo({ path: enPath, query: to.query, hash: to.hash })
  }

  if (preferredLocale.value === 'zh' && currentLocale === 'en' && hasZh) {
    return navigateTo({ path: basePath, query: to.query, hash: to.hash })
  }
})
