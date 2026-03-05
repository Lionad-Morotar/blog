<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<ContentNavigationItem[]>('navigation', [])

const { header } = useAppConfig()
</script>

<template>
  <UHeader>
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
