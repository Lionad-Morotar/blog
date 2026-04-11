<script setup lang="ts">
export interface PreviewNode {
  name: string
  isFile: boolean
  slug?: string
  title?: string
  description?: string
  children?: PreviewNode[]
}

const props = defineProps<{
  nodes: PreviewNode[]
  level?: number
}>()

const open = defineModel<Record<string, boolean>>('open', {
  default: () => ({}),
})

function toggle(name: string) {
  open.value[name] = !open.value[name]
}

function isOpen(name: string): boolean {
  return open.value[name] !== false
}
</script>

<template>
  <ul class="space-y-0.5" :class="level ? 'ms-5 border-l border-gray-200 dark:border-gray-800 pl-2' : ''">
    <li v-for="node in nodes" :key="node.name" class="">
      <!-- Folder -->
      <div
        v-if="!node.isFile"
        class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        @click="toggle(node.name)"
      >
        <UIcon
          :name="isOpen(node.name) ? 'lucide:folder-open' : 'lucide:folder'"
          class="h-4 w-4 shrink-0 text-amber-500"
        />
        <span class="truncate">{{ node.name }}</span>
        <UIcon
          :name="isOpen(node.name) ? 'lucide:chevron-down' : 'lucide:chevron-right'"
          class="ml-auto h-3.5 w-3.5 shrink-0 text-gray-400"
        />
      </div>

      <!-- File -->
      <NuxtLink
        v-else
        :to="`/preview/${node.slug}`"
        class="flex items-center gap-2 rounded px-2 py-1 text-sm text-primary hover:bg-gray-100 hover:underline dark:hover:bg-gray-800"
      >
        <UIcon name="lucide:file-text" class="h-4 w-4 shrink-0 text-gray-400" />
        <span class="truncate">{{ node.title || node.name }}</span>
      </NuxtLink>

      <!-- Children -->
      <PreviewTree
        v-if="node.children?.length && isOpen(node.name)"
        v-model:open="open"
        :nodes="node.children"
        :level="(level || 0) + 1"
      />
    </li>
  </ul>
</template>
