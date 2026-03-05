<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

interface Props {
  src: string
}

const props = defineProps<Props>()
const colorMode = useColorMode()
const route = useRoute()

const isMounted = ref(false)

const excalidrawTheme = computed(() =>
  colorMode.value === 'dark' ? 'dark' : 'light'
)

const resolvedPath = computed(() => {
  const articlePath = route.path
  const basePath = articlePath.endsWith('/') ? articlePath.slice(0, -1) : articlePath
  const srcPath = props.src.startsWith('./') ? props.src.slice(2) : props.src
  return `${basePath}/${srcPath}`
})

const diagramData = ref(null)
const pending = ref(true)
const error = ref(null)

const loadData = async () => {
  const url = `/api/excalidraw${resolvedPath.value}`

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    diagramData.value = data
    pending.value = false
  } catch (e) {
    error.value = e
    pending.value = false
  }
}

onMounted(() => {
  isMounted.value = true
  loadData()
})

const uiOptions = {
  canvasActions: {
    changeViewBackgroundColor: false,
    clearCanvas: false,
    export: false as const,
    loadScene: false,
    saveToActiveFile: false,
    toggleTheme: false,
    saveAsImage: false
  }
}

const loadingText = computed(() => {
  return `加载图表 ${resolvedPath.value} 中...`
})
</script>

<template>
  <div class="excalidraw-wrapper">
    <ClientOnly>
      <div v-if="pending" class="excalidraw-state">
        <span class="excalidraw-state-text">{{ loadingText }}</span>
      </div>
      <div v-else-if="error" class="excalidraw-state excalidraw-error">
        <span class="excalidraw-state-text">图表加载失败: {{ error.message }}</span>
      </div>
      <div v-else-if="!diagramData" class="excalidraw-state excalidraw-error">
        <span class="excalidraw-state-text">图表数据为空</span>
      </div>
      <ExcalidrawBoard
        v-else
        :initialData="diagramData"
        :viewModeEnabled="true"
        :theme="excalidrawTheme"
        :UIOptions="uiOptions"
      />

      <template #fallback>
        <div class="excalidraw-state">
          <span class="excalidraw-state-text">图表加载中...</span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.excalidraw-wrapper {
  width: 100%;
  min-height: 400px;
  max-height: 50vh;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  margin: 1rem 0;
  position: relative;
}

.excalidraw-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  max-height: 50vh;
  overflow: hidden;
  width: 100%;
}

.excalidraw-state-text {
  color: var(--ui-text-muted);
  font-size: 0.875rem;
}

.excalidraw-error .excalidraw-state-text {
  color: var(--ui-error);
}
</style>
