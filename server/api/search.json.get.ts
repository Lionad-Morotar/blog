import { defineEventHandler, type H3Event } from 'h3'
import { queryCollectionSearchSections } from '@nuxt/content/server'

/**
 * 截断内容至指定长度，保留完整单词
 */
function truncateContent(content: string, maxLength: number = 200): string {
  if (!content || content.length <= maxLength) return content

  // 在 maxLength 范围内寻找最后一个空格位置，避免截断单词
  const truncated = content.slice(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  // 如果找不到空格（如中文内容），直接截断
  if (lastSpaceIndex === -1) return truncated + '...'

  return truncated.slice(0, lastSpaceIndex) + '...'
}

export default defineEventHandler(async (event: H3Event) => {
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
      queryCollectionSearchSections(event, collection, {
        minHeading: 'h2', // 从 h2 开始索引，跳过 h1（通常是页面标题）
        maxHeading: 'h3', // 最多到 h3，避免过多细粒度 section
      })
    )
  )

  // 合并所有 collection 的搜索结果，并截断 content 以减少体积
  const flattenedSections = allSections.flat()

  return flattenedSections.map(section => ({
    ...section,
    content: truncateContent(section.content, 100),
  }))
})
