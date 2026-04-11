<script setup lang="ts">
import type { PreviewNode } from '~/components/PreviewTree.vue'

definePageMeta({
  layout: 'docs'
})

if (!import.meta.dev) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: tree } = await useAsyncData('preview-index', async () => {
  return await $fetch<PreviewNode[]>('/api/preview')
})

if (!tree.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { seo } = useAppConfig()

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: '本地文档预览',
})
</script>

<template>
  <UPage>
    <UPageHeader title="本地文档预览" description="available Markdown documents from previewDirs" />

    <UPageBody>
      <PreviewTree v-if="tree.length" :nodes="tree" />
      <p v-else class="text-gray-500">
        暂无可用文档
      </p>
    </UPageBody>
  </UPage>
</template>
