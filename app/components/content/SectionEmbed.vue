<script setup lang="ts">
/**
 * SectionEmbed - 嵌入另一个 Markdown 文件的完整内容
 *
 * 用法:
 * ::section-embed{src="_docs/shared-config"}
 * ::
 */

interface Props {
  src: string            // 源文件路径（相对于 maps/ 内容集合，不带 .md 后缀，如 "_docs/shared-config"）
  showTitle?: string | boolean  // 是否显示源文件标题，默认 "true"
  showLink?: string | boolean   // 是否显示"查看原文"链接，默认 "true"
  'show-title'?: string | boolean  // MDC kebab-case 支持
  'show-link'?: string | boolean   // MDC kebab-case 支持
  class?: string         // 额外 CSS 类
}

const props = defineProps<Props>()

// 解析布尔值（MDC 传递的是字符串，支持 camelCase 和 kebab-case）
const rawShowTitle = computed(() => props.showTitle ?? props['show-title'])
const rawShowLink = computed(() => props.showLink ?? props['show-link'])
const showTitle = computed(() => rawShowTitle.value !== 'false' && rawShowTitle.value !== false)
const showLink = computed(() => rawShowLink.value !== 'false' && rawShowLink.value !== false)

// 调试
watchEffect(() => {
  console.log('[SectionEmbed] Props:', {
    src: props.src,
    showTitle: props.showTitle,
    'show-title': props['show-title'],
    rawShowTitle: rawShowTitle.value,
    computedShowTitle: showTitle.value
  })
})

// 获取当前页面路径用于解析相对路径
const route = useRoute()
const currentPath = computed(() => route.path)

// 解析相对路径
function resolveRelativePath(src: string, basePath: string): string {
  // 移除 .md 后缀
  let path = src.replace(/\.md$/, '')

  // 如果不是相对路径，返回相对于 maps 根目录的路径
  if (!path.startsWith('./') && !path.startsWith('../')) {
    return '/maps/' + path
  }

  // 获取基础目录（去掉最后一个 segment）
  const baseDir = basePath.replace(/\/[^\/]*$/, '')

  // 分割路径
  const baseParts = baseDir.split('/').filter(Boolean)
  const relParts = path.split('/').filter(Boolean)

  // 处理相对路径
  for (const part of relParts) {
    if (part === '..') {
      baseParts.pop()
    } else if (part !== '.') {
      baseParts.push(part)
    }
  }

  return '/' + baseParts.join('/')
}

// 处理路径
const contentPath = computed(() => {
  const resolved = resolveRelativePath(props.src, currentPath.value)
  return resolved
})

// 拖拽调整高度
const contentRef = ref<HTMLElement>()
const customHeight = ref<number | null>(null)
const isResizing = ref(false)

function startResize(e: MouseEvent) {
  isResizing.value = true
  const startY = e.clientY
  const startHeight = contentRef.value?.offsetHeight || 0

  function onMouseMove(e: MouseEvent) {
    const delta = e.clientY - startY
    const newHeight = Math.max(100, startHeight + delta)
    customHeight.value = newHeight
  }

  function onMouseUp() {
    isResizing.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

// URL 路径（用于链接）
const urlPath = computed(() => contentPath.value)

// 使用 path 查询
const { data } = await useAsyncData(
  `section-embed-${props.src}-${currentPath.value}`,
  async () => {
    try {
      const result = await queryCollection('maps')
        .path(contentPath.value)
        .first()
      return result
    } catch (e) {
      console.error('Query error:', e)
      return null
    }
  }
)
</script>

<template>
  <div 
    class="section-embed border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden my-4" 
    :class="$props.class"
  >
    <!-- 头部信息 -->
    <div v-if="showTitle || showLink" class="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div v-if="showTitle && data?.title" class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4 text-primary-500" />
        {{ data.title }}
      </div>
      <NuxtLink 
        v-if="showLink"
        :to="urlPath"
        class="text-xs text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 flex items-center gap-1 transition-colors"
      >
        <span>查看原文</span>
        <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
      </NuxtLink>
    </div>
    
    <!-- 内容区域 -->
    <div class="relative">
      <div
        ref="contentRef"
        class="p-4 overflow-y-auto"
        :class="{ 'resize-active': isResizing }"
        :style="customHeight ? { height: `${customHeight}px` } : { maxHeight: '50vh' }"
      >
        <ContentRenderer v-if="data" :value="data" />
        <div v-else class="text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 inline mr-1" />
          无法加载文件: {{ src }}
          <div class="text-xs text-gray-500 mt-1">
            尝试路径: {{ contentPath }}
          </div>
        </div>
      </div>

      <!-- Resize handle -->
      <div
        class="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-ns-resize flex items-end justify-end group"
        :class="{ 'active': isResizing }"
        @mousedown.prevent="startResize"
      >
        <svg
          class="w-3 h-3 text-gray-400 group-hover:text-primary-500 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M22 22L16 16M22 16L16 22" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-embed :deep(h1:first-child),
.section-embed :deep(h2:first-child) {
  margin-top: 0 !important;
}

.section-embed :deep(p:last-child),
.section-embed :deep(ul:last-child),
.section-embed :deep(ol:last-child) {
  margin-bottom: 0 !important;
}

/* Resize handle styles */
.resize-handle {
  background: linear-gradient(135deg, transparent 50%, rgba(156, 163, 175, 0.3) 50%);
  border-bottom-right-radius: 0.5rem;
}

.resize-handle:hover,
.resize-handle.active {
  background: linear-gradient(135deg, transparent 50%, rgba(99, 102, 241, 0.4) 50%);
}

.resize-handle svg {
  margin: 0 2px 2px 0;
}

.resize-active {
  user-select: none;
}
</style>
