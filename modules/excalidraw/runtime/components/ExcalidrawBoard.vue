<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import React from 'react'
import type { Ref } from 'vue'
import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types'

export interface Props extends ExcalidrawProps {}

const props = defineProps<Props>()

const excalidrawRef: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  nextTick(async () => {
    if (excalidrawRef.value) {
      const Excalidraw = (await import('@excalidraw/excalidraw')).Excalidraw

      const ReactDOM = await import('react-dom/client')
      const root = ReactDOM.createRoot(excalidrawRef.value)
      root.render(React.createElement(Excalidraw, props as any))
    }
  })
})
</script>

<template>
  <div ref="excalidrawRef" class="excalidraw-board" />
</template>

<style scoped>
.excalidraw-board {
  min-height: 100%;
  height: 90dvh;
}
</style>
