<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const props = defineProps<{
  href: string
  target?: string
}>()

const route = useRoute()
const isPreview = computed(() => route.path.startsWith('/preview'))

const shouldShowHover = computed(() => {
  return isPreview.value && props.href?.startsWith('/') && !props.href?.startsWith('//')
})

interface RepoFileResponse {
  path: string
  content: string
  ext: string
  size: number
  absolutePath?: string
  vscodeScheme?: string
}

const loading = ref(false)
const data = ref<RepoFileResponse | null>(null)
const hasFetched = ref(false)

const size = useLocalStorage<'sm' | 'md' | 'lg'>('preview-hover-card-size', 'md')

const sizeClasses = computed(() => {
  switch (size.value) {
    case 'sm':
      return 'w-80'
    case 'lg':
      return 'w-[640px]'
    default:
      return 'w-[480px]'
  }
})

const contentHeightClass = computed(() => {
  switch (size.value) {
    case 'sm':
      return 'max-h-40'
    case 'lg':
      return 'max-h-96'
    default:
      return 'max-h-64'
  }
})

const cardUi = computed(() => {
  const p = '!p-2'
  return {
    header: `${p} min-h-0`,
    body: `${p} min-h-0`,
    footer: `${p} min-h-0`,
  }
})

const filePathForApi = computed(() => props.href.split('#')[0])
const anchor = computed(() => props.href.split('#')[1] || '')

const highlightLines = computed(() => {
  const match = anchor.value.match(/^L(\d+)(?:-L(\d+))?$/)
  if (!match) return []
  const start = parseInt(match[1], 10)
  const end = match[2] ? parseInt(match[2], 10) : start
  const arr: number[] = []
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
})

const language = computed(() => {
  const ext = data.value?.ext || ''
  const map: Record<string, string> = {
    rs: 'rust',
    ts: 'typescript',
    js: 'javascript',
    mjs: 'javascript',
    cjs: 'javascript',
    py: 'python',
    vue: 'vue',
    html: 'html',
    css: 'css',
    scss: 'scss',
    less: 'less',
    json: 'json',
    md: 'markdown',
    mdc: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    go: 'go',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    php: 'php',
    rb: 'ruby',
    swift: 'swift',
    kt: 'kotlin',
    sql: 'sql',
    dockerfile: 'dockerfile',
    toml: 'toml',
  }
  return map[ext] || ext || 'text'
})

const filename = computed(() => {
  const parts = filePathForApi.value.split('/')
  return parts[parts.length - 1] || ''
})

const vscodeUrl = computed(() => {
  if (!data.value?.absolutePath) return ''
  const line = props.href.split('#')[1] || ''
  const match = line.match(/^L(\d+)/)
  const lineSuffix = match ? `:${match[1]}` : ''
  const scheme = data.value.vscodeScheme || 'vscode-insiders'
  return `${scheme}://file${data.value.absolutePath}${lineSuffix}`
})

async function fetchContent() {
  if (hasFetched.value || loading.value) {
    return
  }
  loading.value = true
  try {
    const result = await $fetch<RepoFileResponse>('/api/preview-repo-file', {
      query: { path: filePathForApi.value },
    })
    data.value = result
  }
  catch (err: any) {
    data.value = {
      path: filePathForApi.value,
      content: err?.statusMessage || '无法加载内容',
      ext: '',
      size: 0,
    }
  }
  finally {
    loading.value = false
    hasFetched.value = true
  }
}

function onOpenChange(open: boolean) {
  if (open) {
    fetchContent()
  }
}
</script>

<template>
  <UPopover
    v-if="shouldShowHover"
    mode="hover"
    :open-delay="300"
    :close-delay="200"
    @update:open="onOpenChange"
  >
    <NuxtLink
      :href="href"
      :target="target"
      class="text-primary hover:underline"
    >
      <slot />
    </NuxtLink>

    <template #content>
      <UCard :class="['shadow-xl', sizeClasses]" :ui="cardUi">
        <template #header>
          <div class="flex justify-between items-center gap-2">
            <span class="font-mono text-gray-500 dark:text-gray-400 text-xs truncate">{{ href }}</span>
            <span class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-[10px] text-gray-500 dark:text-gray-400">{{ data?.ext || 'file' }}</span>
          </div>
        </template>

        <div class="overflow-auto custom-scrollbar" :class="contentHeightClass">
          <div v-if="loading" class="flex justify-center items-center h-32">
            <span class="text-gray-400 text-sm">加载中...</span>
          </div>
          <CodePreview
            v-else
            :code="data?.content || ''"
            :language="language"
            :highlight-lines="highlightLines"
            :filename="filename"
          />
        </div>

        <template #footer>
          <div class="flex justify-between items-center gap-2">
            <a
              v-if="vscodeUrl"
              :href="vscodeUrl"
              class="inline-flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="在 VSCode 中打开"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.583 1.936 9.42 9.45 4.41 5.55 2.25 7.2v9.6l2.16 1.65 5.01-3.9 8.163 7.515L21.75 20.4V3.6l-4.167-1.664zM16.5 19.065l-6.885-5.34 6.885-5.34v10.68z"/>
              </svg>
            </a>
            <div class="flex justify-end gap-1">
              <UButton
                label="小"
                size="xs"
                :color="size === 'sm' ? 'primary' : 'neutral'"
                :variant="size === 'sm' ? 'solid' : 'ghost'"
                @click="size = 'sm'"
              />
              <UButton
                label="中"
                size="xs"
                :color="size === 'md' ? 'primary' : 'neutral'"
                :variant="size === 'md' ? 'solid' : 'ghost'"
                @click="size = 'md'"
              />
              <UButton
                label="大"
                size="xs"
                :color="size === 'lg' ? 'primary' : 'neutral'"
                :variant="size === 'lg' ? 'solid' : 'ghost'"
                @click="size = 'lg'"
              />
            </div>
          </div>
        </template>
      </UCard>
    </template>
  </UPopover>

  <NuxtLink
    v-else
    :href="href"
    :target="target"
    class="text-primary hover:underline"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

.dark .custom-scrollbar {
  scrollbar-color: rgba(75, 85, 99, 0.6) transparent;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.6);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.8);
}
</style>
