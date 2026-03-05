import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const collections = [
    'flows',
    'articles',
    'books',
    'music',
    'maps',
    'tools',
    'sourceCode',
    'hire',
    'links',
    'achieved',
    'other',
  ] as const

  const allSections = await Promise.all(
    collections.map(collection =>
      queryCollectionSearchSections(event, collection)
    )
  )

  // 合并所有 collection 的搜索结果
  return allSections.flat()
})