<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const props = defineProps<{
  code: string
  language?: string
  highlightLines?: number[]
  filename?: string
}>()

const colorMode = useColorMode()
const highlightedHtml = ref<string | null>(null)
const isCopied = ref(false)
const contentRef = ref<HTMLDivElement | null>(null)

async function scrollToFirstHighlight() {
  if (!props.highlightLines?.length) return
  await nextTick()
  if (!contentRef.value) return

  const tryScroll = (): boolean => {
    if (!contentRef.value) return false
    const first = contentRef.value.querySelector('.line-highlight') as HTMLElement | null
    if (!first) return false

    let scrollParent: HTMLElement | null = first.parentElement
    while (scrollParent) {
      const style = window.getComputedStyle(scrollParent)
      if ((/(auto|scroll)/.test(style.overflowY) || /(auto|scroll)/.test(style.overflow)) && scrollParent.scrollHeight > scrollParent.clientHeight) {
        break
      }
      scrollParent = scrollParent.parentElement
    }

    if (scrollParent) {
      const firstRect = first.getBoundingClientRect()
      const parentRect = scrollParent.getBoundingClientRect()
      const lineHeight = first.offsetHeight || 16
      const offset = firstRect.top - parentRect.top + scrollParent.scrollTop - lineHeight * 2
      scrollParent.scrollTop = Math.max(0, offset)
    }
    else {
      first.scrollIntoView({ block: 'start', inline: 'nearest' })
    }
    return true
  }

  tryScroll()
  requestAnimationFrame(() => requestAnimationFrame(() => tryScroll()))
  setTimeout(() => tryScroll(), 100)
  setTimeout(() => tryScroll(), 300)
  setTimeout(() => tryScroll(), 600)
}

async function highlight() {
  try {
    const result = await $fetch<{ html: string }>('/api/highlight-code', {
      method: 'POST',
      body: {
        code: props.code,
        language: props.language || 'text',
        theme: colorMode.value === 'dark' ? 'github-dark' : 'github-light',
        highlightLines: props.highlightLines || [],
      },
    })
    highlightedHtml.value = result.html
    scrollToFirstHighlight()
  }
  catch {
    // fallback to plain text wrapped in pre
    highlightedHtml.value = `<pre class="shiki" style="padding: 0.75rem 0"><code>${escapeHtml(props.code)}</code></pre>`
    scrollToFirstHighlight()
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

watch(
  () => [props.code, props.language, props.highlightLines, colorMode.value],
  () => {
    highlight()
  },
  { immediate: true },
)

async function copyCode() {
  if (!props.code) return
  await navigator.clipboard.writeText(props.code)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div class="group relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950">
    <div
      v-if="filename || language"
      class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
    >
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span v-if="language" class="font-mono">{{ language }}</span>
        <span v-if="filename" class="font-medium">{{ filename }}</span>
      </div>
      <button
        type="button"
        class="inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        :aria-label="isCopied ? '已复制' : '复制代码'"
        @click="copyCode"
      >
        <svg
          v-if="isCopied"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-green-600 dark:text-green-400"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </button>
    </div>

    <div
      ref="contentRef"
      v-if="highlightedHtml"
      class="text-[13px] [&_pre]:bg-transparent [&_pre]:m-0 [&_pre]:p-0 [&_code]:block [&_code]:w-full"
      v-html="highlightedHtml"
    />
    <div v-else class="flex items-center justify-center h-32 text-sm text-gray-400">
      高亮加载中...
    </div>
  </div>
</template>

<style scoped>
:deep(.line) {
  display: flex;
  line-height: 1.25;
  white-space: pre;
}

:deep(.line-number) {
  user-select: none;
  text-align: right;
  padding-right: 1rem;
  padding-left: 0.75rem;
  width: 3rem;
  flex-shrink: 0;
  color: rgba(107, 114, 128, 0.6);
}

:deep(.line-highlight) {
  background-color: rgba(251, 191, 36, 0.2);
}

.dark :deep(.line-highlight) {
  background-color: rgba(251, 191, 36, 0.15);
}

:deep(pre) {
  white-space: normal;
  padding: 0.75rem 0 !important;
  overflow-x: auto;
}
</style>
