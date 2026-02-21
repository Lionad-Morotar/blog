<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { getLocaleFromPath, stripEnPrefix, withLocalePath, type PreferredLocale } from '~/utils/locale'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc, seo } = useAppConfig()
const preferredLocale = usePreferredLocale()

const currentLocale = computed(() => getLocaleFromPath(route.path))
const basePath = computed(() => stripEnPrefix(route.path))
const enPath = computed(() => withLocalePath('en', basePath.value))

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: enCandidate } = await useAsyncData(`en-candidate:${enPath.value}`, () =>
  queryContent(enPath.value).only(['_path']).findOne()
)
const hasEnglish = computed(() => Boolean(enCandidate.value))

const localeItems = computed(() => [[
  {
    label: '中文',
    click: () => setPreferredLocale('zh')
  },
  {
    label: 'English',
    click: () => setPreferredLocale('en')
  }
]])

async function setPreferredLocale(locale: PreferredLocale) {
  preferredLocale.value = locale

  if (locale === currentLocale.value) return

  if (locale === 'en') {
    if (!hasEnglish.value) return
    await navigateTo({ path: enPath.value, query: route.query, hash: route.hash })
    return
  }

  await navigateTo({ path: basePath.value, query: route.query, hash: route.hash })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent()
  .where({
    _extension: 'md',
    navigation: { $ne: false },
    _path: { $not: { $regex: /\/_\./ } }, // 过滤 Nuxt 约定的隐藏文件/目录（以"."开头）
  })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path))
)

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
  // Mark English pages as machine-translated
  ogLocale: currentLocale.value === 'en' ? 'en_US' : 'zh_CN',
})

// hreflang for multilingual SEO (only if English version exists)
const baseUrl = 'https://lionad.art'
useHead(computed(() => {
  if (!hasEnglish.value) return {}

  const links = [
    { rel: 'alternate', hreflang: 'zh', href: `${baseUrl}${basePath.value}` },
    { rel: 'alternate', hreflang: 'en', href: `${baseUrl}${enPath.value}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}${basePath.value}` },
  ]

  return { link: links }
}))

// console.log('[info] Page:', page.value.title, page.value)

// remove og-image
// defineOgImage({
//   component: 'Docs',
//   title: page.value.title,
//   description: page.value.description
// })

const headline = computed(() => findPageHeadline(page.value))

const links = computed(() => [toc?.bottom?.edit && {
  icon: 'i-heroicons-pencil-square',
  label: 'Edit this page',
  to: `${toc.bottom.edit}/${page?.value?._file}`,
  target: '_blank',
}, ...(toc?.bottom?.links || [])].filter(Boolean))
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" :headline="headline">
      <template #links>
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            v-for="(link, index) in (page.links || [])"
            :key="index"
            v-bind="link"
            :color="link.color || 'gray'"
            :variant="link.variant || 'outline'"
          />

          <UDropdown
            v-if="hasEnglish"
            :items="localeItems"
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton
              color="gray"
              variant="outline"
              icon="i-heroicons-language"
              :label="preferredLocale === 'en' ? 'EN*' : '中文'"
            />
          </UDropdown>
        </div>
      </template>
    </UPageHeader>

    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />
      <hr v-if="surround?.length">
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page.toc !== false" #right>
      <UContentToc :title="toc?.title" :links="page.body?.toc?.links">
        <template v-if="toc?.bottom" #bottom>
          <div class="hidden lg:block space-y-6" :class="{ '!mt-6': page.body?.toc?.links?.length }">
            <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />
            <UPageLinks :title="toc.bottom.title" :links="links" />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
