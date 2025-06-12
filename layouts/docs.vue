<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const customNavigations = {
  '/articles': {
    '/articles': {
      title: "🖌️ Blockies Animation",
      _path: "/maps/_fe-framework/motion/blockies-animation"
    }
  }
}

Object.entries(customNavigations).forEach(([path, navigations]) => {
  const h1 = navigation.value.find(item => item._path === path)
  if (!h1) return
  Object.entries(navigations).forEach(([path, article]) => {
    const pushAfter = h1.children.find(item => item._path === path)
    if (!pushAfter) return
    const articles = Array.isArray(article) ? article : (article ? [article] : [])
    articles.forEach((item) => {
      if (h1.children.some(child => child._path === item._path)) return
      h1.children.splice(h1.children.indexOf(pushAfter) + 1, 0, item)
    })
  })
})
</script>

<template>
  <UContainer>
    <UPage>

      <template #left>
        <UAside>
          <UNavigationTree :links="mapContentNavigation(navigation)" />
        </UAside>
      </template>

      <slot />

    </UPage>
  </UContainer>
</template>
