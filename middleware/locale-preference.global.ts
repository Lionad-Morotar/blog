import { getLocaleFromPath, stripEnPrefix, withLocalePath } from '~/utils/locale'

export default defineNuxtRouteMiddleware(async (to) => {
  const currentLocale = getLocaleFromPath(to.path)
  const basePath = stripEnPrefix(to.path)
  const enPath = withLocalePath('en', basePath)

  // Use try-catch to handle 404 errors when content doesn't exist
  let zhCandidate: any = null
  let enCandidate: any = null

  try {
    zhCandidate = await queryContent(basePath).only(['_path']).findOne()
  } catch {
    zhCandidate = null
  }

  try {
    enCandidate = await queryContent(enPath).only(['_path']).findOne()
  } catch {
    enCandidate = null
  }

  if (currentLocale === 'en' && !enCandidate && zhCandidate) {
    return navigateTo({ path: basePath, query: to.query, hash: to.hash }, { redirectCode: 302 })
  }

  if (process.server) return

  const preferredLocale = usePreferredLocale()

  if (preferredLocale.value === 'en' && currentLocale === 'zh' && enCandidate) {
    return navigateTo({ path: enPath, query: to.query, hash: to.hash })
  }

  if (preferredLocale.value === 'zh' && currentLocale === 'en' && zhCandidate) {
    return navigateTo({ path: basePath, query: to.query, hash: to.hash })
  }
})
