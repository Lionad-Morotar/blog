<template>
  <div class="text-highlight-playground">
    <div class="playground-layout">
      <!-- 左侧内容区 -->
      <div class="content-area" ref="articleRef">
        <article class="article-card">
          <h2 class="text-xl font-bold mb-4 text-primary">
            浏览器文本高亮原理
          </h2>
          <p class="mb-4 leading-relaxed">
            文本高亮（Text Highlighting）是阅读软件、笔记工具和 PDF 阅读器中的核心功能。
            它允许用户用鼠标选中任意文本段落，然后通过马克笔效果进行标记。
          </p>
          <p class="mb-4 leading-relaxed">
            实现这一功能的核心是浏览器提供的 <strong>Selection API</strong> 和 <strong>Range API</strong>。
            当用户选中文本时，可以通过 <code>window.getSelection()</code> 获取选区信息，
            包括起始节点、终止节点以及偏移量。
          </p>
          <p class="mb-4 leading-relaxed">
            持久化存储是文本高亮的难点。因为 DOM 结构可能动态变化，
            我们需要将高亮位置转换为 <strong>XPath</strong> 或<strong>文本指纹</strong>的形式存储，
            而不是直接保存 HTML 标记。
          </p>
          <p class="leading-relaxed">
            <em>试着选中这段文字，然后点击右侧的颜色按钮进行高亮标记。</em>
            你可以看到 Range 对象的详细信息，以及如何将高亮数据序列化存储。
          </p>
        </article>
      </div>

      <!-- 右侧控制面板 -->
      <div class="control-panel">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-paint-brush" class="text-primary" />
              <span class="font-semibold">高亮控制面板</span>
            </div>
          </template>

          <!-- 颜色选择 -->
          <div class="mb-6">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              选择颜色
            </label>
            <div class="flex gap-2">
              <UButton
                v-for="color in colors"
                :key="color.name"
                :class="['color-btn', { active: currentColor === color.name }]"
                :style="{ backgroundColor: color.value }"
                @click="currentColor = color.name"
                size="sm"
              />
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="space-y-2 mb-6">
            <UButton
              color="primary"
              block
              :disabled="!hasSelection"
              @click="applyHighlight"
            >
              <template #leading>
                <UIcon name="i-heroicons-highlighter" />
              </template>
              高亮选中文本 (H)
            </UButton>

            <UButton
              color="gray"
              variant="soft"
              block
              @click="copyRangeInfo"
            >
              <template #leading>
                <UIcon name="i-heroicons-clipboard-document" />
              </template>
              复制选区信息
            </UButton>

            <UButton
              color="red"
              variant="soft"
              block
              @click="clearAllHighlights"
            >
              <template #leading>
                <UIcon name="i-heroicons-trash" />
              </template>
              清除所有高亮
            </UButton>
          </div>

          <!-- 已保存高亮 -->
          <div v-if="highlights.length > 0" class="mb-6">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              已保存的高亮 ({{ highlights.length }})
            </label>
            <div class="highlights-list space-y-2 max-h-40 overflow-y-auto">
              <div
                v-for="h in highlights"
                :key="h.id"
                class="highlight-item flex items-center gap-2 p-2 rounded bg-gray-50 dark:bg-gray-800"
              >
                <div
                  class="w-3 h-3 rounded-full flex-shrink-0"
                  :style="{ backgroundColor: colors.find(c => c.name === h.color)?.value }"
                />
                <div class="flex-1 text-xs text-gray-600 dark:text-gray-400 truncate">
                  {{ h.text }}
                </div>
                <UButton
                  color="red"
                  variant="ghost"
                  size="xs"
                  icon="i-heroicons-x-mark"
                  @click="deleteHighlight(h.id)"
                />
              </div>
            </div>
          </div>

          <!-- 当前选区信息 -->
          <div class="mb-4">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Range 信息
            </label>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">{{ rangeInfoDisplay }}</pre>
          </div>

          <!-- 存储数据 -->
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              持久化数据
            </label>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto max-h-40">{{ storageDisplay }}</pre>
          </div>
        </UCard>
      </div>
    </div>

    <!-- 浮动工具栏 -->
    <div
      v-if="showToolbar"
      class="floating-toolbar"
      :style="toolbarPosition"
    >
      <UButton
        v-for="color in colors"
        :key="color.name"
        :style="{ backgroundColor: color.value }"
        size="xs"
        class="toolbar-btn"
        @click="applyHighlightFromToolbar(color.name)"
      />
    </div>

    <!-- Toast 提示 -->
    <UNotifications />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const toast = useToast()
const articleRef = ref(null)

// 颜色配置
const colors = [
  { name: 'yellow', value: '#ffeb3b' },
  { name: 'green', value: '#69f0ae' },
  { name: 'blue', value: '#82b1ff' },
  { name: 'pink', value: '#ff80ab' },
  { name: 'orange', value: '#ffab40' }
]

// 状态
const currentColor = ref('yellow')
const highlights = ref([])
const currentSelection = ref(null)
const hasSelection = ref(false)
const showToolbar = ref(false)
const toolbarPosition = ref({ top: '0px', left: '0px' })

// 显示内容
const rangeInfoDisplay = computed(() => {
  if (!currentSelection.value) {
    return '// 选中文字后查看 Range 对象\n{\n  "startContainer": "...",\n  "startOffset": 0,\n  "collapsed": true\n}'
  }
  return JSON.stringify({
    text: currentSelection.value.text.slice(0, 50) + (currentSelection.value.text.length > 50 ? '...' : ''),
    startXPath: currentSelection.value.startXPath,
    startOffset: currentSelection.value.startOffset,
    endXPath: currentSelection.value.endXPath,
    endOffset: currentSelection.value.endOffset,
    length: currentSelection.value.text.length
  }, null, 2)
})

const storageDisplay = computed(() => {
  return JSON.stringify(highlights.value, null, 2)
})

// 生命周期
onMounted(() => {
  if (process.client) {
    document.addEventListener('selectionchange', handleSelectionChange)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeydown)
    loadHighlights()
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('selectionchange', handleSelectionChange)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('keydown', handleKeydown)
  }
})

// 处理选择变化
function handleSelectionChange() {
  if (!process.client) return

  const selection = window.getSelection()

  if (!selection.rangeCount || selection.isCollapsed) {
    currentSelection.value = null
    hasSelection.value = false
    return
  }

  const range = selection.getRangeAt(0)

  // 检查选区是否在文章内
  if (!articleRef.value?.contains(range.commonAncestorContainer)) {
    currentSelection.value = null
    hasSelection.value = false
    return
  }

  currentSelection.value = {
    range: range.cloneRange(),
    text: selection.toString(),
    startXPath: getXPath(range.startContainer),
    startOffset: range.startOffset,
    endXPath: getXPath(range.endContainer),
    endOffset: range.endOffset
  }

  hasSelection.value = true
}

// 鼠标抬起显示工具栏
function handleMouseUp(e) {
  if (!process.client) return

  const selection = window.getSelection()
  if (!selection.rangeCount || selection.isCollapsed) {
    showToolbar.value = false
    return
  }

  const range = selection.getRangeAt(0)
  if (!articleRef.value?.contains(range.commonAncestorContainer)) {
    showToolbar.value = false
    return
  }

  const rect = range.getBoundingClientRect()
  const articleRect = articleRef.value.getBoundingClientRect()

  toolbarPosition.value = {
    top: `${rect.top - articleRect.top - 50}px`,
    left: `${rect.left - articleRect.left + rect.width / 2 - 100}px`
  }
  showToolbar.value = true
}

// 键盘快捷键
function handleKeydown(e) {
  if ((e.key === 'h' || e.key === 'H') && hasSelection.value) {
    applyHighlight()
    window.getSelection()?.removeAllRanges()
    showToolbar.value = false
  }
}

// 应用高亮
function applyHighlight() {
  if (!currentSelection.value || !process.client) return

  const { range, text, ...data } = currentSelection.value

  try {
    const span = document.createElement('span')
    span.className = `highlight-${currentColor.value}`
    span.style.backgroundColor = colors.find(c => c.name === currentColor.value)?.value
    span.style.padding = '2px 4px'
    span.style.borderRadius = '3px'
    span.style.cursor = 'pointer'
    span.dataset.highlightId = Date.now().toString()

    if (range.startContainer === range.endContainer) {
      range.surroundContents(span)
    } else {
      const contents = range.extractContents()
      span.appendChild(contents)
      range.insertNode(span)
    }

    const highlightData = {
      id: span.dataset.highlightId,
      text,
      color: currentColor.value,
      ...data,
      timestamp: Date.now()
    }

    highlights.value.push(highlightData)
    saveHighlights()
    showToolbar.value = false
    toast.add({ title: '高亮已保存', color: 'green' })
  } catch (err) {
    toast.add({ title: '高亮失败: ' + err.message, color: 'red' })
  }
}

// 从工具栏应用高亮
function applyHighlightFromToolbar(color) {
  currentColor.value = color
  applyHighlight()
  window.getSelection()?.removeAllRanges()
}

// 获取 XPath
function getXPath(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node = node.parentNode
  }

  const paths = []
  for (; node && node.nodeType === Node.ELEMENT_NODE; node = node.parentNode) {
    let index = 1
    for (let sibling = node.previousSibling; sibling; sibling = sibling.previousSibling) {
      if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === node.nodeName) {
        index++
      }
    }
    paths.unshift(`${node.nodeName.toLowerCase()}[${index}]`)
  }

  return '/' + paths.join('/')
}

// 删除高亮
function deleteHighlight(id) {
  if (!process.client) return

  const span = document.querySelector(`[data-highlight-id="${id}"]`)
  if (span) {
    const parent = span.parentNode
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span)
    }
    parent.removeChild(span)
    parent.normalize()
  }

  highlights.value = highlights.value.filter(h => h.id !== id)
  saveHighlights()
  toast.add({ title: '已删除', color: 'blue' })
}

// 清除所有高亮
function clearAllHighlights() {
  if (!process.client) return

  document.querySelectorAll('[data-highlight-id]').forEach(span => {
    const parent = span.parentNode
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span)
    }
    parent.removeChild(span)
    parent.normalize()
  })

  highlights.value = []
  saveHighlights()
  toast.add({ title: '已清除所有高亮', color: 'blue' })
}

// 保存/加载高亮
function saveHighlights() {
  if (process.client) {
    localStorage.setItem('text-highlight-playground', JSON.stringify(highlights.value))
  }
}

function loadHighlights() {
  if (!process.client) return

  const saved = localStorage.getItem('text-highlight-playground')
  if (saved) {
    highlights.value = JSON.parse(saved)
    restoreHighlights()
  }
}

// 恢复高亮（简化版）
function restoreHighlights() {
  // 实际项目中需要根据 XPath 重新定位
  // 这里简化处理，仅保留数据
}

// 复制选区信息
function copyRangeInfo() {
  if (!currentSelection.value) {
    toast.add({ title: '请先选中文本', color: 'orange' })
    return
  }

  if (process.client) {
    navigator.clipboard.writeText(JSON.stringify(currentSelection.value, null, 2))
    toast.add({ title: '已复制到剪贴板', color: 'green' })
  }
}
</script>

<style scoped>
.text-highlight-playground {
  margin: 2rem 0;
}

.playground-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .playground-layout {
    grid-template-columns: 1fr;
  }
}

.content-area {
  position: relative;
}

.article-card {
  padding: 1.5rem;
  background: var(--ui-bg);
  border-radius: var(--ui-radius);
  border: 1px solid var(--ui-border);
  line-height: 1.8;
}

.article-card :deep(.highlight-yellow) { background-color: #ffeb3b; }
.article-card :deep(.highlight-green) { background-color: #69f0ae; }
.article-card :deep(.highlight-blue) { background-color: #82b1ff; }
.article-card :deep(.highlight-pink) { background-color: #ff80ab; }
.article-card :deep(.highlight-orange) { background-color: #ffab40; }

.article-card :deep([class^="highlight-"]) {
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.article-card :deep([class^="highlight-"]:hover) {
  opacity: 0.8;
}

.color-btn {
  width: 32px !important;
  height: 32px !important;
  padding: 0 !important;
  border: 3px solid transparent !important;
}

.color-btn.active {
  border-color: var(--ui-text) !important;
  box-shadow: 0 0 0 2px var(--ui-bg), 0 0 0 4px var(--ui-text) !important;
}

.floating-toolbar {
  position: absolute;
  display: flex;
  gap: 4px;
  background: var(--ui-bg);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 100;
}

.toolbar-btn {
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;
}

.highlights-list {
  scrollbar-width: thin;
  scrollbar-color: var(--ui-border) transparent;
}

pre {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
