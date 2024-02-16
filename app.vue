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
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
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

#app-page > div:first-child {
  padding-left: 12px;
  padding-right: 12px;
}

main aside::-webkit-scrollbar {
  width: 0 !important;
}

// 不好看
// main aside:hover::-webkit-scrollbar {
//   width: 4px !important;
// }
</style>
