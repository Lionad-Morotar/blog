---
title: 共享配置参考
description: 博客系统的通用配置参数，供其他文档引用
created: 2026-03-11
modified: 2026-03-11
tags: [config, reference]
---

## 站点基础配置

```yaml
# nuxt.config.ts
site: {
  url: 'https://lionad.me',
  name: 'Lionad Morotar',
  description: '前端工程师 / 设计师 / 数字游民',
}
```

### 关键参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | string | - | 站点主域名 |
| `name` | string | - | 站点名称 |
| `description` | string | - | SEO 描述 |
| `defaultLocale` | string | 'zh' | 默认语言 |

## 内容集合配置

博客使用以下集合结构：

| 集合 | 路径 | 说明 |
|------|------|------|
| `flows` | `1.flows/**` | 流程/工作流文档 |
| `articles` | `2.articles/**` | 博客文章 |
| `books` | `4.books/**` | 读书笔记 |
| `maps` | `6.maps/**` | 知识地图 |
| `tools` | `7.tools/**` | 工具使用指南 |

## 部署配置

### 静态生成

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml'],
      crawlLinks: true
    }
  }
})
```

### 环境变量

```bash
# .env
NUXT_PUBLIC_SITE_URL=https://lionad.me
NUXT_PUBLIC_GITHUB_TOKEN=ghp_xxx
```
