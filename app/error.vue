<script setup lang="ts">
import type { NuxtError } from '#app'
import type { ContentNavigationItem } from '@nuxt/content'

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

const { data: navigation } = await useAsyncData('navigation', async () => {
  const collections = ['flows', 'articles', 'books', 'music', 'maps', 'tools', 'sourceCode', 'hire', 'links', 'achieved', 'other'] as const
  const results = await Promise.all(collections.map(c => queryCollectionNavigation(c)))
  return results.flat()
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
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="filteredNavigation" />
    </ClientOnly>

  </div>
</template>
