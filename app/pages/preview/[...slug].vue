<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

definePageMeta({
  layout: 'docs'
})

if (!import.meta.dev) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const route = useRoute()
const { toc, seo } = useAppConfig()

const path = computed(() => withoutTrailingSlash(route.path))

const { data: page } = await useAsyncData(path.value, async () => {
  const slug = (route.params.slug as string[]).join('/')
  return await $fetch(`/api/preview/${slug}`)
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})

const typedPage = computed(() => page.value as typeof page.value & { body?: { toc?: { links?: any[] } } })
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" />

    <UPageBody prose>
      <ContentRenderer v-if="typedPage.body" :value="typedPage" />
    </UPageBody>

    <template v-if="page.toc !== false" #right>
      <UContentToc :title="toc?.title" :links="typedPage.body?.toc?.links" />
    </template>
  </UPage>
</template>
