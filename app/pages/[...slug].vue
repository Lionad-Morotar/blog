<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { getLocaleFromPath, stripEnPrefix, withLocalePath, type PreferredLocale } from '~/utils/locale'

// 根据路径确定 collection
type CollectionName = 'flows' | 'articles' | 'books' | 'music' | 'maps' | 'tools' | 'sourceCode' | 'hire' | 'links' | 'achieved' | 'other'

function getCollectionFromPath(path: string): CollectionName {
  if (path.startsWith('/1.flows') || path.startsWith('/flows')) return 'flows'
  if (path.startsWith('/2.articles') || path.startsWith('/articles')) return 'articles'
  if (path.startsWith('/4.books') || path.startsWith('/books')) return 'books'
  if (path.startsWith('/4.music') || path.startsWith('/music')) return 'music'
  if (path.startsWith('/6.maps') || path.startsWith('/maps')) return 'maps'
  if (path.startsWith('/7.tools') || path.startsWith('/tools')) return 'tools'
  if (path.startsWith('/8.source-code') || path.startsWith('/source-code')) return 'sourceCode'
  if (path.startsWith('/9.hire') || path.startsWith('/hire')) return 'hire'
  if (path.startsWith('/10.links') || path.startsWith('/links')) return 'links'
  if (path.startsWith('/_achieved')) return 'achieved'
  return 'other'
}

// 从导航路径中提取 headline（替代已移除的 findPageHeadline）
async function getPageHeadline(path: string): Promise<string | undefined> {
  const collection = getCollectionFromPath(path)
  const navigation = await queryCollectionNavigation(collection)
  const findHeadline = (items: any[], targetPath: string): string | undefined => {
    for (const item of items) {
      if (item.children?.some((child: any) => child.path === targetPath)) {
        return item.title
      }
      if (item.children) {
        const found = findHeadline(item.children, targetPath)
        if (found) return found
      }
    }
    return undefined
  }
  return findHeadline(navigation, path)
}

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc, seo } = useAppConfig()
const preferredLocale = usePreferredLocale()

const currentLocale = computed(() => getLocaleFromPath(route.path))
const basePath = computed(() => stripEnPrefix(route.path))
const enPath = computed(() => withLocalePath('en', basePath.value))

const collection = computed(() => getCollectionFromPath(route.path))
const { data: page } = await useAsyncData(route.path, () => queryCollection(collection.value).path(route.path).first())
const typedPage = computed(() => page.value as typeof page.value & { body?: { toc?: { links?: any[] } } })
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const enCollection = computed(() => getCollectionFromPath(enPath.value))
const { data: enCandidate } = await useAsyncData(`en-candidate:${enPath.value}`, () =>
  queryCollection(enCollection.value).path(enPath.value).first()
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

const surroundCollection = computed(() => getCollectionFromPath(route.path))
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings(surroundCollection.value, withoutTrailingSlash(route.path), {
    fields: ['title', 'description', 'path']
  })
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

const { data: headline } = await useAsyncData(`headline:${route.path}`, () => getPageHeadline(route.path))

const links = computed(() => [(toc?.bottom as any)?.edit && {
  icon: 'i-heroicons-pencil-square',
  label: 'Edit this page',
  to: `${(toc?.bottom as any).edit}/${page?.value?.stem}.md`,
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
            :color="(link.color as any) || 'neutral'"
            :variant="(link.variant as any) || 'outline'"
          />

          <UDropdownMenu
            v-if="hasEnglish"
            :items="localeItems"
            :content="{ side: 'bottom', align: 'end' }"
          >
            <UButton
              color="neutral"
              variant="outline"
              icon="i-heroicons-language"
              :label="preferredLocale === 'en' ? 'EN*' : '中文'"
            />
          </UDropdownMenu>
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
            <USeparator v-if="page.body?.toc?.links?.length" type="dashed" />
            <UPageLinks :title="toc.bottom.title" :links="links" />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
