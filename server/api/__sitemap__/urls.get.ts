/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// Nitro runtime 类型由 Nuxt 自动生成，typecheck 无法识别 #imports 中的 sitemap helper 与 queryCollection(event, name) 重载
import { defineSitemapEventHandler, asSitemapUrl } from '#imports'

const COLLECTIONS = [
  'articles',
  'flows',
  'books',
  'music',
  'tools',
  'sourceCode',
  'hire',
  'links'
] as const

type CollectionName = typeof COLLECTIONS[number]

export default defineSitemapEventHandler(async (event) => {
  const urls = []

  for (const name of COLLECTIONS) {
    const pages = await queryCollection(event, name as CollectionName).all()
    for (const page of pages) {
      if (!page.path || page.draft || page.path.endsWith('.navigation')) {
        continue
      }
      urls.push(asSitemapUrl({
        loc: page.path,
        lastmod: page.updatedAt || page.createdAt || undefined
      }))
    }
  }

  return urls
})
