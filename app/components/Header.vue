<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<ContentNavigationItem[]>('navigation', [])

const { header } = useAppConfig()

// 宽屏布局状态 - 使用 useState 实现全局共享
const isWideLayout = useState('docs-wide-layout', () => false)
function toggleWideLayout() {
  isWideLayout.value = !isWideLayout.value
}
</script>

<template>
  <UHeader :class="{ 'wide-header': isWideLayout }">
    <template #logo>
      <ClientOnly>
        <template v-if="header?.logo?.dark || header?.logo?.light">
          <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
        </template>
        <template v-else>
          LIONAD'S BLOG
        </template>
      </ClientOnly>
    </template>

    <template v-if="header?.search" #center>
      <UContentSearchButton class="hidden lg:flex" />
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" collapsed class="lg:hidden" />

      <!-- 宽屏布局切换按钮 - 仅桌面端显示 -->
      <ClientOnly>
        <UButton
          color="neutral"
          variant="ghost"
          :icon="isWideLayout ? 'i-heroicons-arrows-pointing-in' : 'i-heroicons-arrows-pointing-out'"
          :aria-label="isWideLayout ? '退出宽屏' : '宽屏模式'"
          class="hidden lg:flex"
          @click="toggleWideLayout"
        />
      </ClientOnly>

      <ClientOnly>
        <UColorModeButton v-if="header?.colorMode" />
      </ClientOnly>

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #panel>
      <UContentNavigation :navigation="navigation" />
    </template>
  </UHeader>
</template>

<style>
/* 宽屏布局：Header 容器全宽 */
.wide-header > div {
  max-width: 100% !important;
  padding-left: calc(var(--spacing) * 8);
  padding-right: calc(var(--spacing) * 8);
}
</style>
