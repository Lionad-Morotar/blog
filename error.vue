<script setup lang="ts">
import type { NuxtError } from '#app'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

defineProps<{
  error: NuxtError
}>()

const route = useRoute()
const htmlLang = computed(() => (route.path === '/en' || route.path.startsWith('/en/') ? 'en' : 'zh-cn'))

useHead({
  htmlAttrs: {
    lang: htmlLang
  }
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const filteredNavigation = computed(() => {
  const filter = (items: any[] | undefined): any[] => {
    if (!items?.length) return []
    return items
      .filter((item) => !(item?._path === '/en' || item?._path?.startsWith('/en/')))
      .map((item) => ({ ...item, children: filter(item.children) }))
  }
  return filter(navigation.value as any[] | undefined)
})
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false,
})

provide('navigation', filteredNavigation)
</script>

<template>
  <div>
    <Header />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="filteredNavigation" />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
