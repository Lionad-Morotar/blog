<script setup lang="ts">
interface Props {
  src: string
}

const props = defineProps<Props>()
const colorMode = useColorMode()

// Compute Excalidraw theme from color mode
const excalidrawTheme = computed(() =>
  colorMode.value === 'dark' ? 'dark' : 'light'
)

// Get current article path for resolving relative paths
const route = useRoute()

// Resolve the file path based on article location
const resolvedPath = computed(() => {
  // Get the current article path (e.g., /articles/my-post)
  const articlePath = route.path

  // Remove trailing slash if present
  const basePath = articlePath.endsWith('/') ? articlePath.slice(0, -1) : articlePath

  // Join with the src prop to get the full path
  // src is relative to the article's directory (e.g., "assets/diagram.excalidraw")
  return `${basePath}/${props.src}`
})

// Load the .excalidraw file
const { data: diagramData, pending, error } = await useFetch(() => resolvedPath.value, {
  key: `excalidraw-${resolvedPath.value}`,
  transform: (data) => {
    try {
      const parsed = JSON.parse(data as string)
      // Ensure the data has the required structure
      return {
        elements: parsed.elements || [],
        appState: parsed.appState || {},
        ...parsed
      }
    } catch (e) {
      console.error('Failed to parse Excalidraw file:', e)
      return null
    }
  },
  // Handle 404 and other errors gracefully
  onResponseError: (ctx) => {
    console.error('Failed to load Excalidraw file:', ctx.response?.status, resolvedPath.value)
  }
})

// UI Options to disable all editing actions for read-only mode
const uiOptions = {
  canvasActions: {
    changeViewBackgroundColor: false,
    clearCanvas: false,
    export: false,
    loadScene: false,
    saveToActiveFile: false,
    toggleTheme: false,
    saveAsImage: false
  }
}
</script>

<template>
  <div class="excalidraw-wrapper">
    <ClientOnly>
      <div v-if="pending" class="excalidraw-state">
        <span class="excalidraw-state-text">加载中...</span>
      </div>
      <div v-else-if="error || !diagramData" class="excalidraw-state excalidraw-error">
        <span class="excalidraw-state-text">图表加载失败</span>
      </div>
      <ExcalidrawBoard
        v-else
        :initial-data="diagramData"
        :view-mode-enabled="true"
        :theme="excalidrawTheme"
        :UIOptions="uiOptions"
      />
      <template #fallback>
        <div class="excalidraw-state">
          <span class="excalidraw-state-text">加载中...</span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.excalidraw-wrapper {
  width: 100%;
  min-height: 400px;
  border: 1px solid var(--ui-border);
  margin: 1rem 0;
  position: relative;
}

.excalidraw-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
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
