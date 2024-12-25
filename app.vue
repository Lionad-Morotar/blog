<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const { seo } = useAppConfig()
const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'baidu-site-verification', content: 'codeva-SWZsd8tNWV' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'zh-cn'
  }
})

useSeoMeta({
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <div id="app-content" :data-full-path="route?.fullPath">
    <Header id="app-header" />

    <UMain id="app-main">
      <NuxtLayout id="app-layout">
        <NuxtPage id="app-page" />
      </NuxtLayout>
    </UMain>

    <Footer id="app-footer" />

    <ClientOnly>
      <LazyUDocsSearch id="app-search" :files="files" :navigation="navigation" />
    </ClientOnly>

    <UNotifications id="app-notification" />
  </div>
</template>

<style lang="stylus">
@import "./styles/index.styl";

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
