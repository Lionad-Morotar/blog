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

interface PreviewPage {
  title: string
  description: string
  toc?: boolean
  body?: { toc?: { links?: unknown[] } }
}

const { data: page } = await useAsyncData(path.value, async () => {
  const slug = (route.params.slug as string[]).join('/')
  return await $fetch(`/api/preview/${slug}`)
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const typedPage = computed(() => page.value as unknown as PreviewPage)

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: typedPage.value.title,
  ogTitle: `${typedPage.value.title} - ${seo?.siteName}`,
  description: typedPage.value.description,
  ogDescription: typedPage.value.description
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="typedPage.title"
      :description="typedPage.description"
    />

    <UPageBody prose>
      <ContentRenderer
        v-if="typedPage.body"
        :value="typedPage"
      />
    </UPageBody>

    <template
      v-if="typedPage.toc !== false"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="typedPage.body?.toc?.links"
      />
    </template>
  </UPage>
</template>
