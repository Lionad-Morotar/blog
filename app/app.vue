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
  const filter = (items: ContentNavigationItem[] | undefined): ContentNavigationItem[] => {
    if (!items?.length) return []
    return items
      .filter((item) => !(item?.path === '/en' || item?.path?.startsWith('/en/')))
      .map((item) => ({ ...item, children: filter(item.children) }))
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

<style lang="stylus">
@import "../styles/index.styl";

// 外链
a[href^="http"] {
  color: var(--tw-prose-body) !important;
  text-decoration: underline !important;
}

img {
    &[src*='w=30'] {
        width: 30%;
    }
    &[src*='w=40'] {
        width: 40%;
    }
    &[src*='w=50'] {
        width: 50%;
    }
    &[src*='w=60'] {
        width: 60%;
    }
    &[src*='w=62'] {
        width: 62%;
    }
    &[src*='w=g'] {
        width: 62%;
    }
    &[src*='w=70'] {
        width: 70%;
    }
    &[src*='w=80'] {
        width: 80%;
    }
    &[src*='type=mac'] {
      border: none !important;
      border-radius: 0;
    }
    &[src*='type=win11'] {
        border: none !important;
        border-radius: 8px;
    }
    &[src*='type=draw'] {
        border: none !important;
    }
    &[src*='type=win11-square'] {
        border: none !important;
    }
}

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

main aside::-webkit-scrollbar {
  width: 0 !important;
}

nav[class^="sticky top-"] > div > ul {
  max-height: 60vh;
  overflow: auto;
}

header, footer {
  max-width: 100%;
}

mark {
  @apply bg-primary/20;
}

kbd {
  margin: 0 .2em;
  word-break: keep-all;
}

// 移动端的 Header 会被快链撑开，直接隐藏
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

// 不好看，隐藏侧边栏滚动条
// main aside:hover::-webkit-scrollbar {
//   width: 4px !important;
// }

// 移动端将 toc 移动到底部并固定
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
