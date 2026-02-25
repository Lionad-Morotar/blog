import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const contentList = await serverQueryContent(e).find()

  return contentList
    .filter((content) => {
      // Filter out hidden files and directories starting with _
      if (content._path?.includes('/_.')) return false
      if (content._path?.includes('/_dir')) return false
      // Keep only markdown files with navigation enabled (unless explicitly disabled)
      if (content._extension !== 'md') return false
      if (content.navigation === false) return false
      return true
    })
    .map((content) => {
      return asSitemapUrl({
        loc: content._path,
        lastmod: content.modified || content.created || new Date(),
        changefreq: 'weekly',
      })
    })
})
