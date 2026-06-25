import type { NitroApp } from 'nitropack'
import { resolveCoverImage } from '../utils/feed-cover'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  // 处理 content feed 生成前的数据
  nitroApp.hooks.hook('feedme:handle:content:item', (options) => {
    // 使用函数调用来获取/设置值
    const raw = options.item.raw()
    const get = options.item.get
    const set = options.item.set
    const del = options.item.del

    // 如果 raw 不存在，跳过处理
    if (!raw) {
      return
    }

    // 跳过导航文件和索引文件
    if (raw.path?.includes('.navigation') || raw.path?.includes('_dir') || raw.path?.endsWith('/index') || raw.path?.endsWith('/0.index')) {
      del()
      return
    }

    // 跳过 _ 开头的文件夹内容（除了 _forty-two）
    if (raw.path?.includes('/_') && !raw.path?.includes('/_forty-two/')) {
      del()
      return
    }

    // 获取当前 item 对象以便检查
    const currentItem = get()

    // 确保 date 字段存在 - feed 库需要有效的 Date 对象
    let itemDate = currentItem.date
    if (!itemDate) {
      // 尝试从各种可能的字段获取日期
      const possibleDateFields = ['createdAt', 'updatedAt', 'created', 'modified']
      for (const field of possibleDateFields) {
        const value = raw[field] || raw.meta?.[field]
        if (value) {
          itemDate = new Date(value)
          break
        }
      }
      // 如果仍然没有日期，使用当前时间（避免 null）
      if (!itemDate || isNaN(itemDate.getTime())) {
        itemDate = new Date()
      }
    }

    // 站点配置（硬编码，避免依赖 nuxt.config.ts 的 runtimeConfig 注入）
    const siteUrl = 'https://lionad.art'
    const defaultCover = `${siteUrl}/images/cover-placeholder.png`

    // 解析封面图
    const cover = resolveCoverImage(raw, defaultCover, siteUrl)

    // 构建新的 item 对象
    const newItem: Record<string, unknown> = {
      ...currentItem,
      title: currentItem.title || raw.title || '无标题',
      date: itemDate,
      published: currentItem.published || itemDate
    }

    // 确保 link 是绝对 URL
    let link = currentItem.link || raw.path
    if (link) {
      link = String(link)
      if (!link.startsWith('http')) {
        newItem.link = `${siteUrl}${link}`
        newItem.id = `${siteUrl}${link}`
      }
    }

    // 设置封面图 enclosure
    if (cover) {
      newItem.image = {
        url: cover.url,
        type: cover.type
      }
    }

    // 设置更新后的 item
    set(newItem)
  })
})
