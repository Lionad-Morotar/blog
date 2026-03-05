<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

interface Props {
  src: string
}

const props = defineProps<Props>()
const colorMode = useColorMode()
const route = useRoute()

// Client-only flag
const isMounted = ref(false)

// Compute Excalidraw theme from color mode
const excalidrawTheme = computed(() =>
  colorMode.value === 'dark' ? 'dark' : 'light'
)

// Resolve the file path based on article location
const resolvedPath = computed(() => {
  const articlePath = route.path
  const basePath = articlePath.endsWith('/') ? articlePath.slice(0, -1) : articlePath
  const srcPath = props.src.startsWith('./') ? props.src.slice(2) : props.src
  return `${basePath}/${srcPath}`
})

// Load the .excalidraw file via API - only on client
const diagramData = ref(null)
const pending = ref(true)
const error = ref(null)

const loadData = async () => {
  console.log('[Excalidraw] loadData called')
  const url = `/api/excalidraw${resolvedPath.value}`
  console.log('[Excalidraw] Fetching from:', url)

  try {
    const res = await fetch(url)
    console.log('[Excalidraw] Response status:', res.status)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    console.log('[Excalidraw] Data loaded:', data?.type || 'no type')
    diagramData.value = data
    pending.value = false
  } catch (e) {
    console.error('[Excalidraw] Failed:', e)
    error.value = e
    pending.value = false
  }
}

onMounted(() => {
  console.log('[Excalidraw] onMounted triggered')
  isMounted.value = true
  loadData()
})

// 强制加载函数（用于调试）
const forceLoad = () => {
  console.log('[Excalidraw] Force load clicked')
  isMounted.value = true
  loadData()
}

// 暴露到全局用于原生 JS 调试
declare global {
  interface Window {
    __excalidrawForceLoad?: () => void
  }
}

if (typeof window !== 'undefined') {
  window.__excalidrawForceLoad = () => {
    console.log('[Excalidraw] Global force load called')
    forceLoad()
  }
}

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
    <!-- SSR / 未挂载状态 -->
    <div v-if="!isMounted" class="excalidraw-state" data-excalidraw-loader>
      <span class="excalidraw-state-text">图表加载中 (SSR)...</span>
      <!-- 强制触发加载按钮 -->
      <button
        @click="forceLoad"
        style="margin-left: 10px; padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        强制加载
      </button>
      <!-- 原生 JS 调试按钮 -->
      <button
        onclick="console.log('[Excalidraw] Native onclick, global fn:', typeof window.__excalidrawForceLoad); window.__excalidrawForceLoad && window.__excalidrawForceLoad();"
        style="margin-left: 10px; padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        JS加载
      </button>
      <!-- 直接 fetch 按钮 -->
      <button
        onclick="
          console.log('[Excalidraw] Direct fetch starting...');
          const path = '/articles/excalidraw-test/assets/test-diagram.excalidraw';
          fetch('/api/excalidraw' + path)
            .then(r => r.json())
            .then(data => {
              console.log('[Excalidraw] Data loaded:', data.type);
              window.__excalidrawData = data;
              document.querySelector('[data-excalidraw-loader] .excalidraw-state-text').textContent = '数据已加载到 window.__excalidrawData';
            })
            .catch(e => console.error('[Excalidraw] Fetch failed:', e));
        "
        style="margin-left: 10px; padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        直接Fetch
      </button>
    </div>

    <!-- 客户端挂载后的状态 -->
    <template v-else>
      <!-- Debug info -->
      <div style="position: absolute; top: 0; left: 0; background: yellow; color: black; padding: 4px; font-size: 12px; z-index: 9999;">
        Debug: pending={{ pending }}, error={{ error?.message || 'none' }}, data={{ diagramData ? 'yes' : 'no' }}
      </div>

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
        :initial-data="diagramData"
        :view-mode-enabled="true"
        :theme="excalidrawTheme"
        :UIOptions="uiOptions"
      />
    </template>
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
