<template>
  <!-- Keep this to fetch `default` slot in metadata -->
  <slot v-if="false" />
  <div
    v-if="parsedData"
    ref="container"
    class="infograph-cmpt not-prose"
    :class="[`is-${size}`, `template-${parsedData.template}`]"
  >
    <!-- 用户画像模板 -->
    <template v-if="parsedData.template === 'persona'">
      <div class="persona-card">
        <div class="persona-header">
          <div v-if="parsedData.data.avatar" class="persona-avatar">
            {{ parsedData.data.avatar }}
          </div>
          <div class="persona-title">
            <h3>{{ parsedData.data.name }}</h3>
            <p v-if="parsedData.data.role" class="persona-role">{{ parsedData.data.role }}</p>
          </div>
        </div>
        <div class="persona-body">
          <div v-if="parsedData.data.demographics?.length" class="persona-section">
            <h4>基本信息</h4>
            <div class="tag-list">
              <span v-for="(item, i) in parsedData.data.demographics" :key="i" class="tag">
                {{ item }}
              </span>
            </div>
          </div>
          <div v-if="parsedData.data.goals?.length" class="persona-section">
            <h4>目标</h4>
            <ul>
              <li v-for="(goal, i) in parsedData.data.goals" :key="i">{{ goal }}</li>
            </ul>
          </div>
          <div v-if="parsedData.data.painPoints?.length" class="persona-section">
            <h4>痛点</h4>
            <ul class="pain-points">
              <li v-for="(pain, i) in parsedData.data.painPoints" :key="i">{{ pain }}</li>
            </ul>
          </div>
          <div v-if="parsedData.data.behaviors?.length" class="persona-section">
            <h4>行为特征</h4>
            <ul>
              <li v-for="(behavior, i) in parsedData.data.behaviors" :key="i">{{ behavior }}</li>
            </ul>
          </div>
          <div v-if="parsedData.data.quote" class="persona-quote">
            <blockquote>"{{ parsedData.data.quote }}"</blockquote>
          </div>
        </div>
      </div>
    </template>

    <!-- 流程步骤模板 -->
    <template v-else-if="parsedData.template === 'steps'">
      <div class="steps-container">
        <div
          v-for="(step, i) in parsedData.data.steps"
          :key="i"
          class="step-item"
          :class="{ 'is-active': step.active }"
        >
          <div class="step-number">{{ i + 1 }}</div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p v-if="step.desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 对比模板 -->
    <template v-else-if="parsedData.template === 'compare'">
      <div class="compare-container">
        <div class="compare-side compare-left">
          <h4>{{ parsedData.data.left.title }}</h4>
          <ul>
            <li v-for="(item, i) in parsedData.data.left.items" :key="i">{{ item }}</li>
          </ul>
        </div>
        <div class="compare-divider">VS</div>
        <div class="compare-side compare-right">
          <h4>{{ parsedData.data.right.title }}</h4>
          <ul>
            <li v-for="(item, i) in parsedData.data.right.items" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>
    </template>

    <!-- 数据卡片模板 -->
    <template v-else-if="parsedData.template === 'stats'">
      <div class="stats-container">
        <div
          v-for="(stat, i) in parsedData.data.stats"
          :key="i"
          class="stat-card"
          :style="{ '--accent-color': stat.color || 'var(--color-primary)' }"
        >
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div v-if="stat.change" class="stat-change" :class="{ 'is-positive': stat.change > 0, 'is-negative': stat.change < 0 }">
            {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
          </div>
        </div>
      </div>
    </template>

    <!-- 时间线模板 -->
    <template v-else-if="parsedData.template === 'timeline'">
      <div class="timeline-container">
        <div
          v-for="(event, i) in parsedData.data.events"
          :key="i"
          class="timeline-item"
          :class="{ 'is-milestone': event.milestone }"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">{{ event.date }}</div>
            <h4>{{ event.title }}</h4>
            <p v-if="event.desc">{{ event.desc }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 未知模板提示 -->
    <template v-else>
      <div class="infograph-error">
        <p>未知模板: {{ parsedData.template }}</p>
        <p>可用模板: persona, steps, compare, stats, timeline</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { nodeTextContent } from '@nuxtjs/mdc/runtime/utils/node'

const props = defineProps({
  size: {
    type: String,
    default: 'full' // 'sm' | 'md' | 'lg' | 'full'
  },
  // YAML frontmatter 直接作为 props 传递的字段
  template: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  demographics: {
    type: Array,
    default: () => null
  },
  goals: {
    type: Array,
    default: () => null
  },
  painPoints: {
    type: Array,
    default: () => null
  },
  behaviors: {
    type: Array,
    default: () => null
  },
  quote: {
    type: String,
    default: null
  }
})

const container = ref(null)
const parsedData = ref(null)

// 检查是否通过 props 接收了数据（Nuxt Content v3 YAML 方式）
const hasPropsData = computed(() => {
  return props.template && props.name
})

// 从 props 构建数据对象
const propsData = computed(() => {
  if (!hasPropsData.value) return null
  return {
    template: props.template,
    data: {
      name: props.name,
      role: props.role,
      avatar: props.avatar,
      demographics: props.demographics,
      goals: props.goals,
      painPoints: props.painPoints,
      behaviors: props.behaviors,
      quote: props.quote
    }
  }
})

const slots = useSlots()
const graphSyntax = computed(() => {
  const defaultSlot = slots.default?.()[0]
  if (!defaultSlot) return ''

  // 纯文本节点
  if (typeof defaultSlot.children === 'string') {
    return defaultSlot.children
  }

  // code 节点
  const codeChild = defaultSlot.children?.default?.()[0]
  if (codeChild?.type === 'code') {
    if (typeof codeChild.children === 'string') {
      return codeChild.children
    }
    return nodeTextContent(codeChild.children)
  }

  return ''
})

// 检测是否为 YAML frontmatter 格式
function isYamlFormat(text) {
  const trimmed = text.trim()
  return trimmed.startsWith('---') && trimmed.includes('\n---')
}

// 简单 YAML 解析（不引入外部库）
function parseSimpleYaml(text) {
  const lines = text.trim().split('\n')
  const result = {}
  let currentKey = null
  let currentArray = null
  let inArray = false

  for (const line of lines) {
    const trimmed = line.trim()

    // 跳过 --- 分隔符
    if (trimmed === '---') continue

    // 跳过空行
    if (!trimmed) {
      if (inArray) {
        inArray = false
        currentArray = null
        currentKey = null
      }
      continue
    }

    // 数组项
    if (trimmed.startsWith('- ')) {
      const item = trimmed.slice(2).trim()
      if (currentArray) {
        currentArray.push(item)
      }
      continue
    }

    // 键值对
    if (trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':')
      const key = trimmed.slice(0, colonIndex).trim()
      const value = trimmed.slice(colonIndex + 1).trim()

      // 值为空，开始数组
      if (value === '') {
        currentArray = []
        result[key] = currentArray
        inArray = true
        currentKey = key
      } else {
        result[key] = value.replace(/^["']|["']$/g, '')
        inArray = false
        currentArray = null
      }
    }
  }

  return result
}

// 解析声明式语法
function parseSyntax(text) {
  if (!text) return null

  // 检测 YAML 格式并解析
  if (isYamlFormat(text)) {
    const data = parseSimpleYaml(text)
    if (data.template) {
      return { template: data.template, data }
    }
    console.warn('[UserPersona] YAML 缺少 template 字段')
    return null
  }

  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.length === 0) return null

  // 第一行格式: template [template-name]
  const firstLine = lines[0]
  const templateMatch = firstLine.match(/^template\s+(\w+)/)
  if (!templateMatch) {
    console.warn('[InfoGraph] 语法错误: 第一行必须是 "template [name]"')
    return null
  }

  const template = templateMatch[1]
  const data = {}

  // 解析数据行
  let currentSection = null
  let currentArray = null

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    // 跳过注释
    if (line.startsWith('#')) continue

    // 数组项: - item
    if (line.startsWith('- ')) {
      const item = line.slice(2).trim()
      if (currentArray) {
        currentArray.push(item)
      }
      continue
    }

    // 对象数组项: - key: value
    if (line.startsWith('-') && line.includes(':')) {
      const obj = parseObjectLine(line.slice(1))
      if (currentArray && typeof obj === 'object') {
        currentArray.push(obj)
      }
      continue
    }

    // section 定义: section [name]
    const sectionMatch = line.match(/^section\s+(\w+)/)
    if (sectionMatch) {
      currentSection = sectionMatch[1]
      data[currentSection] = {}
      continue
    }

    // 键值对: key: value
    if (line.includes(':')) {
      const colonIndex = line.indexOf(':')
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()

      // 检测是否为数组开始
      if (value === '' || value === '[]') {
        currentArray = []
        if (currentSection) {
          data[currentSection][key] = currentArray
        } else {
          data[key] = currentArray
        }
      } else {
        // 解析值类型
        const parsedValue = parseValue(value)
        if (currentSection) {
          data[currentSection][key] = parsedValue
        } else {
          data[key] = parsedValue
        }
      }
      continue
    }
  }

  return { template, data }
}

function parseObjectLine(line) {
  const obj = {}
  const pairs = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
  for (const pair of pairs) {
    const colonIndex = pair.indexOf(':')
    if (colonIndex > 0) {
      const key = pair.slice(0, colonIndex).trim()
      const value = pair.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      obj[key] = parseValue(value)
    }
  }
  return obj
}

function parseValue(value) {
  // 布尔值
  if (value === 'true') return true
  if (value === 'false') return false
  // 数字
  if (/^-?\d+$/.test(value)) return parseInt(value, 10)
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value)
  // 字符串（去除引号）
  return value.replace(/^["']|["']$/g, '')
}

// 初始化数据
onMounted(() => {
  // 优先使用 props 数据（Nuxt Content v3 YAML 方式）
  if (hasPropsData.value) {
    parsedData.value = propsData.value
  } else {
    // 否则使用 slot 解析（原有自定义语法方式）
    parsedData.value = parseSyntax(graphSyntax.value)
  }
})

// 监听语法变化（slot 方式）
watch(graphSyntax, (newVal) => {
  // 只有在没有 props 数据时才解析 slot
  if (!hasPropsData.value) {
    parsedData.value = parseSyntax(newVal)
  }
})
</script>

<style scoped>
.infograph-cmpt {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-purple: #8b5cf6;
  --bg-subtle: #f8fafc;
  --border-color: #e2e8f0;

  margin: 1.5rem auto;
  font-family: system-ui, -apple-system, sans-serif;
}

/* 尺寸变体 */
.is-sm { max-width: 30%; }
.is-md { max-width: 50%; }
.is-lg { max-width: 70%; }
.is-full { max-width: 100%; }

/* ===== 用户画像模板 ===== */
/* 容器：水平居中，最大宽度，支持多列布局 */
.infograph-cmpt.template-persona {
  display: inline-block;
  vertical-align: top;
  max-width: 400px;
  width: 100%;
  margin: 0;
}

.template-persona .persona-card {
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  & + .template-persona {
    margin-left: 1em;
  }
}

.persona-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-primary);
  color: white;
}

.persona-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.persona-title h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.persona-role {
  margin: 0.25rem 0 0;
  opacity: 0.9;
  font-size: 0.875rem;
}

.persona-body {
  padding: 1.5rem;
}

.persona-section {
  margin-bottom: 1.25rem;
}

.persona-section:last-child {
  margin-bottom: 0;
}

.persona-section h4 {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  background: #e0e7ff;
  color: #4338ca;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.persona-section ul {
  margin: 0;
  padding-left: 1.25rem;
}

.persona-section li {
  margin-bottom: 0.375rem;
  color: #374151;
}

.pain-points li {
  color: #991b1b;
}

.persona-quote {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef3c7;
  border-left: 4px solid var(--color-warning);
  border-radius: 0 8px 8px 0;
}

.persona-quote blockquote {
  margin: 0;
  font-style: italic;
  color: #92400e;
}

/* ===== 流程步骤模板 ===== */
.template-steps .steps-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s;
}

.step-item.is-active {
  border-color: var(--color-primary);
  background: #eff6ff;
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: #111827;
}

.step-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

/* ===== 对比模板 ===== */
.template-compare .compare-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: stretch;
}

.compare-side {
  padding: 1.5rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.compare-left {
  border-top: 4px solid var(--color-primary);
}

.compare-right {
  border-top: 4px solid var(--color-success);
}

.compare-side h4 {
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #111827;
}

.compare-side ul {
  margin: 0;
  padding-left: 1.25rem;
}

.compare-side li {
  margin-bottom: 0.5rem;
  color: #374151;
}

.compare-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #9ca3af;
  font-size: 0.875rem;
}

/* ===== 数据卡片模板 ===== */
.template-stats .stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.stat-card {
  padding: 1.25rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  border-top: 4px solid var(--accent-color);
  text-align: center;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--accent-color);
  line-height: 1;
}

.stat-label {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-change {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-change.is-positive {
  color: var(--color-success);
}

.stat-change.is-negative {
  color: var(--color-danger);
}

/* ===== 时间线模板 ===== */
.template-timeline .timeline-container {
  position: relative;
  padding-left: 2rem;
}

.template-timeline .timeline-container::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -1.625rem;
  top: 0.25rem;
  width: 12px;
  height: 12px;
  background: white;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
}

.timeline-item.is-milestone .timeline-marker {
  background: var(--color-primary);
  width: 16px;
  height: 16px;
  left: -1.75rem;
}

.timeline-content {
  background: white;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.timeline-date {
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.timeline-content h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: #111827;
}

.timeline-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

/* ===== 错误提示 ===== */
.infograph-error {
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #991b1b;
}

.infograph-error p {
  margin: 0;
}

.infograph-error p:first-child {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* 暗黑模式适配 */
html.dark .infograph-cmpt {
  --bg-subtle: #1f2937;
  --border-color: #374151;
}

html.dark .template-persona .persona-card,
html.dark .step-item,
html.dark .compare-side,
html.dark .stat-card,
html.dark .timeline-content {
  background: #1f2937;
  border-color: #374151;
}

html.dark .persona-section li,
html.dark .step-content h4,
html.dark .compare-side h4,
html.dark .timeline-content h4 {
  color: #f3f4f6;
}

html.dark .step-content p,
html.dark .compare-side li,
html.dark .stat-label,
html.dark .timeline-content p {
  color: #9ca3af;
}

html.dark .persona-quote {
  background: #451a03;
  border-color: #b45309;
}

html.dark .persona-quote blockquote {
  color: #fbbf24;
}

html.dark .tag {
  background: #312e81;
  color: #a5b4fc;
}

html.dark .timeline-marker {
  background: #1f2937;
}
</style>
