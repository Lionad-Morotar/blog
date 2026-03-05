<script setup lang="ts">
/**
 * 文章时间戳组件
 * 显示基于 Git 历史的创建时间和最后更新时间
 * 由 nuxt-content-git 模块提供数据
 */
interface Props {
  createdAt?: string
  updatedAt?: string
}

const props = defineProps<Props>()

// 格式化日期为本地格式
function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 判断是否需要显示更新时间（与创建时间不同才显示）
const shouldShowUpdated = computed(() => {
  if (!props.createdAt || !props.updatedAt) return false
  const created = new Date(props.createdAt).getTime()
  const updated = new Date(props.updatedAt).getTime()
  // 如果时间差超过 1 分钟，认为是不同的更新时间
  return Math.abs(updated - created) > 60000
})
</script>

<template>
  <div class="article-timestamp">
    <div class="timestamp-item">
      <span class="timestamp-label">发布于</span>
      <span class="timestamp-value">{{ formatDate(createdAt) }}</span>
    </div>
    <div v-if="shouldShowUpdated" class="timestamp-item">
      <span class="timestamp-label">更新于</span>
      <span class="timestamp-value">{{ formatDate(updatedAt) }}</span>
    </div>
  </div>
</template>

<style scoped>
.article-timestamp {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
  font-size: 0.875rem;
}

.timestamp-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timestamp-label {
  color: var(--color-text-muted, #6b7280);
  font-weight: 400;
}

.timestamp-value {
  color: var(--color-text, #374151);
  font-weight: 500;
}

/* 深色模式适配 */
.dark .article-timestamp {
  border-color: var(--color-border-dark, #374151);
}

.dark .timestamp-label {
  color: var(--color-text-muted-dark, #9ca3af);
}

.dark .timestamp-value {
  color: var(--color-text-dark, #d1d5db);
}
</style>
