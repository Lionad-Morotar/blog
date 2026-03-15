<script setup lang="ts">
/**
 * SectionExtract - 从其他 Markdown 文件中提取特定章节
 * 
 * 用法:
 * ::section-extract{from="_docs/api-reference" heading="认证方式"}
 * ::
 * 
 * ::section-extract{from="_docs/api-reference" level="2" index="1"}
 * ::
 */

interface Props {
  from: string           // 源文件路径（相对于 6.maps/ 目录，不带 .md 后缀）
  heading?: string       // 按标题文字匹配（优先级高于 index）
  level?: string | number  // 标题层级，默认 2 (h2)
  index?: string | number  // 第几个同级标题，0-based
  class?: string         // 额外 CSS 类
}

const props = defineProps<Props>()

// 解析数字（MDC 传递的是字符串）
const level = computed(() => {
  const val = props.level
  if (val === undefined) return 2
  const num = Number(val)
  return isNaN(num) ? 2 : num
})
const index = computed(() => {
  const val = props.index
  if (val === undefined) return 0
  const num = Number(val)
  return isNaN(num) ? 0 : num
})

// 获取当前页面路径用于解析相对路径
const route = useRoute()
const currentPath = computed(() => route.path)

// 解析相对路径
function resolveRelativePath(src: string, basePath: string): string {
  // 移除 .md 后缀
  let path = src.replace(/\.md$/, '')

  // 如果不是相对路径，直接返回相对于 maps 根目录的路径
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

// 处理路径
const contentPath = computed(() => resolveRelativePath(props.from, currentPath.value))

// URL 路径（用于链接）
const urlPath = computed(() => contentPath.value)

// 使用 path 查询
const { data } = await useAsyncData(
  () => `section-extract-${props.from}-${props.heading ?? props.index ?? 0}-${props.level ?? 2}-${currentPath.value}`,
  () => queryCollection('maps')
    .path(contentPath.value)
    .first()
)

// 调试：打印数据结构
watchEffect(() => {
  if (data.value) {
    console.log('[SectionExtract] Data structure:', {
      title: data.value.title,
      body: data.value.body,
      bodyType: typeof data.value.body,
      isArray: Array.isArray(data.value.body),
      keys: Object.keys(data.value)
    })
  }
})

// 提取文本的辅助函数（适配 minimark 格式）
function extractText(node: any): string {
  if (!node) return ''
  // 纯文本节点
  if (typeof node === 'string') return node
  // 对象格式 { type: 'text', value: '...' }
  if (node.type === 'text') return node.value || ''
  if (node.value) return node.value
  // minimark 数组格式: [tag, props, ...children]
  if (Array.isArray(node)) {
    const tag = node[0]
    // 如果是文本数组，直接拼接
    if (typeof tag !== 'string') {
      return node.map(extractText).join('')
    }
    // minimark 格式: [tag, props, ...children]
    const children = node.slice(2)
    return children.map(extractText).join('')
  }
  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join('')
  }
  if (node.content) return node.content
  return ''
}

// 获取 body 内容（适配 Nuxt Content v3 minimark 格式）
const bodyContent = computed(() => {
  const body = data.value?.body
  if (!body) return []
  // minimark 格式: { type: "minimark", value: [...] }
  if (body.type === 'minimark' && Array.isArray(body.value)) return body.value
  if (Array.isArray(body)) return body
  if (Array.isArray((body as any).children)) return (body as any).children
  return []
})

// 判断节点是否为 heading（适配 minimark 格式）
function isHeadingNode(node: any): { isHeading: boolean; level: number; text: string } {
  // 对象格式: { type: 'element', tag: 'h2', ... }
  if (node?.type === 'element' && node.tag?.match?.(/^h[1-6]$/)) {
    return {
      isHeading: true,
      level: parseInt(node.tag[1]),
      text: extractText(node).trim()
    }
  }
  // minimark 数组格式: ['h2', {...}, ...children]
  if (Array.isArray(node) && typeof node[0] === 'string' && node[0].match(/^h[1-6]$/)) {
    return {
      isHeading: true,
      level: parseInt(node[0][1]),
      text: extractText(node).trim()
    }
  }
  return { isHeading: false, level: 0, text: '' }
}

// 提取特定 section
const extractedContent = computed(() => {
  const children = bodyContent.value
  if (!children.length) {
    return null
  }
  const result: any[] = []
  let capturing = false
  const targetLevel = level.value
  let headingCount = 0

  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    const { isHeading, level: currentLevel, text: headingText } = isHeadingNode(node)

    if (isHeading) {
      // 按标题文字匹配（优先级最高）
      if (props.heading) {
        if (headingText.toLowerCase().includes(props.heading.toLowerCase())) {
          capturing = true
          result.push(node)
          continue
        }
        // 遇到同级或更高级 heading，停止捕获
        if (capturing && currentLevel <= targetLevel) {
          break
        }
      }

      // 按索引匹配（第N个指定级别的heading）
      else if (index.value !== undefined) {
        if (currentLevel === targetLevel) {
          if (!capturing && headingCount === index.value) {
            capturing = true
            result.push(node)
          } else if (capturing) {
            break
          }
          headingCount++
          continue
        }
      }
    }

    if (capturing) {
      result.push(node)
    }
  }

  if (result.length === 0) {
    return null
  }

  // 创建一个新的 body 对象，只包含提取的内容（保持原格式）
  const originalBody = data.value.body
  let newBody: any

  if (originalBody?.type === 'minimark') {
    // minimark 格式
    newBody = { ...originalBody, value: result }
  } else if (Array.isArray(originalBody)) {
    // 纯数组格式
    newBody = result
  } else {
    // 其他对象格式（尝试使用 children）
    newBody = { ...(originalBody as any), children: result }
  }

  return {
    ...data.value,
    body: newBody
  }
})

// 所有可用章节（用于调试）
const availableHeadings = computed(() => {
  return bodyContent.value
    .filter((n: any) => {
      // 对象格式
      if (n?.type === 'element' && n.tag?.match?.(/^h[1-6]$/)) return true
      // minimark 数组格式
      if (Array.isArray(n) && typeof n[0] === 'string' && n[0].match(/^h[1-6]$/)) return true
      return false
    })
    .map((n: any) => extractText(n))
})

// 源文件标题
const sourceTitle = computed(() => data.value?.title || props.from)
</script>

<template>
  <div class="section-extract border-l-4 border-primary-500 pl-4 py-2 my-4 bg-gray-50/50 dark:bg-gray-900/30 rounded-r-lg relative" :class="$props.class">
    <!-- 源文件引用信息 -->
    <div class="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2 flex-wrap">
      <UIcon name="i-heroicons-document-text" class="w-4 h-4" />
      <span>引用自: </span>
      <NuxtLink
        :to="urlPath"
        class="text-primary-600 dark:text-primary-400 hover:underline font-medium"
      >
        {{ sourceTitle }}
      </NuxtLink>
      <span v-if="heading" class="text-gray-400">/ {{ heading }}</span>
      <span v-else-if="props.index !== undefined" class="text-gray-400">/ 第 {{ Number(props.index) + 1 }} 节</span>
    </div>

    <!-- 提取的内容 -->
    <div
      ref="contentRef"
      class="overflow-y-auto"
      :class="{ 'resize-active': isResizing }"
      :style="customHeight ? { height: `${customHeight}px` } : { maxHeight: '50vh' }"
    >
      <ContentRenderer v-if="extractedContent" :value="extractedContent" />
    
    <!-- 调试信息（开发时显示） -->
    <div v-else-if="data" class="text-amber-600 text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 inline mr-1" />
      未找到指定章节
      <span v-if="heading">"{{ heading }}"</span>
      <span v-else>（第 {{ Number(props.index ?? 0) + 1 }} 个 h{{ props.level ?? 2 }}）</span>
      <details class="mt-1">
        <summary class="cursor-pointer text-xs text-gray-500">可用章节 ({{ availableHeadings.length }}个)</summary>
        <ul class="text-xs text-gray-500 mt-1 ml-4">
          <li v-for="(h, i) in availableHeadings" :key="i">{{ i + 1 }}. {{ h }}</li>
        </ul>
      </details>
    </div>

    <!-- 未找到文件 -->
    <div v-else class="text-red-500 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 inline mr-1" />
      无法加载文件: {{ from }}
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
</template>

<style scoped>
.section-extract :deep(h2:first-child),
.section-extract :deep(h3:first-child) {
  margin-top: 0 !important;
}

.section-extract :deep(p:last-child) {
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
