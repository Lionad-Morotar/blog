import { getLocaleFromPath, stripEnPrefix, withLocalePath } from '~/utils/locale'

export default defineNuxtRouteMiddleware(async (to) => {
  const currentLocale = getLocaleFromPath(to.path)
  const basePath = stripEnPrefix(to.path)
  const enPath = withLocalePath('en', basePath)

  const zhCandidate = await queryContent(basePath).only(['_path']).findOne()
  const enCandidate = await queryContent(enPath).only(['_path']).findOne()

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
