<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { seo } = useAppConfig()
const route = useRoute()

// 合并所有 collection 的导航
const { data: navigation } = await useAsyncData('navigation', async () => {
  const [
    flowsNav,
    articlesNav,
    booksNav,
    musicNav,
    mapsNav,
    toolsNav,
    sourceCodeNav,
    hireNav,
    linksNav,
    achievedNav,
    otherNav,
  ] = await Promise.all([
    queryCollectionNavigation('flows'),
    queryCollectionNavigation('articles'),
    queryCollectionNavigation('books'),
    queryCollectionNavigation('music'),
    queryCollectionNavigation('maps'),
    queryCollectionNavigation('tools'),
    queryCollectionNavigation('sourceCode'),
    queryCollectionNavigation('hire'),
    queryCollectionNavigation('links'),
    queryCollectionNavigation('achieved'),
    queryCollectionNavigation('other'),
  ])

  // 合并所有导航，保持目录结构
  return [
    ...flowsNav,
    ...articlesNav,
    ...booksNav,
    ...musicNav,
    ...mapsNav,
    ...toolsNav,
    ...sourceCodeNav,
    ...hireNav,
    ...linksNav,
    ...achievedNav,
    ...otherNav,
  ]
})
const filteredNavigation = computed(() => {
  const filter = (items: ContentNavigationItem[] | undefined, parentPath?: string): ContentNavigationItem[] => {
    if (!items?.length) return []

    // 去重：基于 path 去重，保留第一个出现的项
    const seen = new Set<string>()
    const uniqueItems = items.filter((item) => {
      // 排除与父项 path 相同的项（防止子导航重复显示当前页面）
      if (parentPath && item.path === parentPath) return false
      if (seen.has(item.path)) return false
      seen.add(item.path)
      return true
    })

    return uniqueItems
      .filter((item) => {
        // 排除英文内容
        if (item?.path === '/en' || item?.path?.startsWith('/en/')) return false
        // 排除所有 _ 开头的目录（内容可访问但不在导航显示）
        if (item?.path?.includes('/_')) return false
        return true
      })
      .map((item) => ({ ...item, children: filter(item.children, item.path) }))
  }
  return filter(navigation.value)
})
const { data: files } = useLazyFetch('/api/search.json', {
  default: () => [],
  server: false
})

const htmlLang = computed(() => (route.path === '/en' || route.path.startsWith('/en/') ? 'en' : 'zh-cn'))

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'baidu-site-verification', content: 'codeva-SWZsd8tNWV' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: htmlLang
  }
})

useSeoMeta({
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', filteredNavigation)
</script>

<template>
  <UApp>
    <div id="app-content" :data-full-path="route?.fullPath">
      <Header id="app-header" />

      <UMain id="app-main">
        <NuxtLayout id="app-layout">
          <NuxtPage id="app-page" />
        </NuxtLayout>
      </UMain>

      <Footer id="app-footer" />

      <ClientOnly>
        <LazyUContentSearch id="app-search" :files="files" :navigation="filteredNavigation" />
      </ClientOnly>
    </div>
  </UApp>
</template>

<style>
/* 外链样式 */
a[href^="http"] {
  color: var(--tw-prose-body) !important;
  text-decoration: underline !important;
}

/* 图片宽度控制 */
img[src*='w=30'] {
  width: 30%;
}
img[src*='w=40'] {
  width: 40%;
}
img[src*='w=50'] {
  width: 50%;
}
img[src*='w=60'] {
  width: 60%;
}
img[src*='w=62'] {
  width: 62%;
}
img[src*='w=g'] {
  width: 62%;
}
img[src*='w=70'] {
  width: 70%;
}
img[src*='w=80'] {
  width: 80%;
}
img[src*='type=mac'] {
  border: none !important;
  border-radius: 0;
}
img[src*='type=win11'] {
  border: none !important;
  border-radius: 8px;
}
img[src*='type=draw'] {
  border: none !important;
}
img[src*='type=win11-square'] {
  border: none !important;
}

/* 页面布局 */
#app-page > div:first-child {
  padding-left: 12px;
  padding-right: 12px;
}

@media screen and (max-width: 888px) {
  #app-page > div:first-child {
    padding-left: 0;
    padding-right: 0;
  }
}

/* 侧边栏滚动条隐藏 */
main aside::-webkit-scrollbar {
  width: 0 !important;
}

/* 导航菜单 */
nav[class^="sticky top-"] > div > ul {
  max-height: 60vh;
  overflow: auto;
}

header, footer {
  max-width: 100%;
}

/* 标记样式 - 使用 color-mix 替代 @apply */
mark {
  background-color: color-mix(in oklch, var(--ui-primary) 20%, transparent);
}

/* 键盘按键样式 */
kbd {
  margin: 0 0.2em;
  word-break: keep-all;
}

/* 移动端 Header 快链隐藏 */
@media screen and (max-width: 888px) {
  header > div > div:last-child a {
    width: 0;
    overflow: hidden;
    display: none;
  }
  [data-headlessui-portal] div:has(> button[aria-label="Close Menu"]) a {
    width: 0;
    overflow: hidden;
    display: none;
  }
}

/* 移动端 TOC 固定底部 */
@media screen and (max-width: 888px) {
  footer {
    margin-bottom: 50px;
  }
  :not(aside div) div:has(> nav[class^="sticky"]) {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 100vw;
    left: 0;
    padding: 0 12px;
    z-index: 9;
    border-color: var(--color-gray-300);
    border-top-width: 1px;
  }
}
</style>
