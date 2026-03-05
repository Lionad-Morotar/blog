<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// 宽屏布局状态
const isWideLayout = useState('docs-wide-layout', () => false)

// 客户端：读取持久化状态
onMounted(() => {
  const saved = localStorage.getItem('docs-wide-layout')
  if (saved === 'true') {
    isWideLayout.value = true
  }
})

// 客户端：持久化到 localStorage
watch(isWideLayout, (value) => {
  localStorage.setItem('docs-wide-layout', String(value))
})
</script>

<template>
  <UContainer :class="{ 'wide-layout': isWideLayout }">
    <UPage class="docs-page">

      <template #left>
        <UPageAside class="docs-aside-left">
          <UContentNavigation :navigation="navigation" :collapsible="false" />
        </UPageAside>
      </template>

      <slot />

    </UPage>
  </UContainer>
</template>

<style>
/* 宽屏布局：扩展容器宽度 */
.wide-layout {
  max-width: 100% !important;
}

/* 宽屏布局：左侧边栏固定宽度 */
.wide-layout .docs-aside-left {
  width: 280px;
  flex-shrink: 0;
}

/* 宽屏布局：中间内容区自适应 */
.wide-layout .docs-page > [data-slot="center"] {
  flex: 1;
  max-width: none;
  min-width: 0;
}

/* 宽屏布局：右侧边栏固定宽度 */
.wide-layout .docs-page > [data-slot="right"] {
  width: 280px;
  flex-shrink: 0;
}

/* 移动端：恢复默认布局 */
@media screen and (max-width: 1024px) {
  .wide-layout .docs-page {
    padding: 0;
  }

  .wide-layout .docs-aside-left {
    width: auto;
  }

  .wide-layout .docs-page > [data-slot="right"] {
    width: auto;
  }
}
</style>
