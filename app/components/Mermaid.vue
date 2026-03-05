<template>
  <!-- Keep this to fetch `default` slot in metadata -->
  <slot v-if="false" />
  <pre ref="el" :style="{ display: rendered ? 'block' : 'none' }" class="not-prose" :class="`is-${size}`">
    {{ mermaidSyntax }}
  </pre>
</template>

<script setup>
import { nodeTextContent } from '@nuxtjs/mdc/runtime/utils/node'
import tinycolor from 'tinycolor2'

// * online editor
// https://mermaid-js.github.io/mermaid-live-editor/

// * source code
// see https://github.com/nuxt/content/issues/1866

// 柔和且对比度友好的色板（莫兰迪色系 + 柔和色调）
const softColorPalette = [
  { bg: '#E8D5C4', text: '#4A403A' }, // 暖米色
  { bg: '#D4E5ED', text: '#3A4A52' }, // 雾蓝
  { bg: '#E4DED0', text: '#4A453A' }, // 米灰
  { bg: '#D5E8D4', text: '#3A4A38' }, // 薄荷绿
  { bg: '#E8D4E5', text: '#4A3A47' }, // 藕荷色
  { bg: '#D4D5E8', text: '#3A3B4A' }, // 薰衣草灰
  { bg: '#E8E4D0', text: '#4A473A' }, // 淡黄
  { bg: '#D0E4E8', text: '#3A474A' }, // 青灰
  { bg: '#E8D0D5', text: '#4A3A3F' }, // 玫瑰灰
  { bg: '#D8E8D4', text: '#3F4A3A' }, // 淡绿
  { bg: '#E4D0E8', text: '#453A4A' }, // 淡紫
  { bg: '#D0D8E8', text: '#3A3F4A' }, // 钢蓝灰
]

/**
 * 从色板中随机获取一个颜色组合
 */
function getRandomColor() {
  const index = Math.floor(Math.random() * softColorPalette.length)
  return softColorPalette[index]
}

/**
 * 确保颜色对比度符合 WCAG AA 标准（至少 4.5:1）
 */
function ensureContrast(bg, text) {
  let bgColor = tinycolor(bg)
  let textColor = tinycolor(text)

  // 计算当前对比度
  let contrast = tinycolor.readability(bgColor, textColor)

  // 如果对比度不足，调整文字颜色
  if (contrast < 4.5) {
    // 尝试加深或提亮文字颜色
    const isDarkBg = bgColor.isDark()

    for (let i = 0; i < 10; i++) {
      if (isDarkBg) {
        textColor = textColor.lighten(10)
      } else {
        textColor = textColor.darken(10)
      }

      contrast = tinycolor.readability(bgColor, textColor)
      if (contrast >= 4.5) break
    }

    // 如果还是不够，直接使用黑白
    if (contrast < 4.5) {
      textColor = isDarkBg ? tinycolor('#FFFFFF') : tinycolor('#1A1A1A')
    }
  }

  return {
    bg: bgColor.toHexString(),
    text: textColor.toHexString(),
    contrast: tinycolor.readability(bgColor, textColor)
  }
}

/**
 * 生成 Mermaid 主题配置，使用随机柔和色板
 */
function generateMermaidTheme() {
  const colors = softColorPalette.map(() => getRandomColor())

  // 确保主色调对比度
  const primary = ensureContrast(colors[0].bg, colors[0].text)
  const secondary = ensureContrast(colors[1].bg, colors[1].text)
  const tertiary = ensureContrast(colors[2].bg, colors[2].text)

  return {
    theme: 'base',
    themeVariables: {
      // 主要颜色
      primaryColor: primary.bg,
      primaryTextColor: primary.text,
      primaryBorderColor: tinycolor(primary.bg).darken(15).toHexString(),

      // 次要颜色
      secondaryColor: secondary.bg,
      secondaryTextColor: secondary.text,
      secondaryBorderColor: tinycolor(secondary.bg).darken(15).toHexString(),

      // 第三颜色
      tertiaryColor: tertiary.bg,
      tertiaryTextColor: tertiary.text,
      tertiaryBorderColor: tinycolor(tertiary.bg).darken(15).toHexString(),

      // 线条和边框
      lineColor: tinycolor(primary.text).setAlpha(0.6).toHexString(),
      edgeLabelBackground: '#FFFFFF',

      // 节点背景色（循环使用色板）
      cScale0: ensureContrast(colors[0].bg, colors[0].text).bg,
      cScale1: ensureContrast(colors[1].bg, colors[1].text).bg,
      cScale2: ensureContrast(colors[2].bg, colors[2].text).bg,
      cScale3: ensureContrast(colors[3].bg, colors[3].text).bg,
      cScale4: ensureContrast(colors[4].bg, colors[4].text).bg,
      cScale5: ensureContrast(colors[5].bg, colors[5].text).bg,
      cScale6: ensureContrast(colors[6].bg, colors[6].text).bg,
      cScale7: ensureContrast(colors[7].bg, colors[7].text).bg,

      // 文字颜色
      cScaleLabel0: ensureContrast(colors[0].bg, colors[0].text).text,
      cScaleLabel1: ensureContrast(colors[1].bg, colors[1].text).text,
      cScaleLabel2: ensureContrast(colors[2].bg, colors[2].text).text,
      cScaleLabel3: ensureContrast(colors[3].bg, colors[3].text).text,
      cScaleLabel4: ensureContrast(colors[4].bg, colors[4].text).text,
      cScaleLabel5: ensureContrast(colors[5].bg, colors[5].text).text,
      cScaleLabel6: ensureContrast(colors[6].bg, colors[6].text).text,
      cScaleLabel7: ensureContrast(colors[7].bg, colors[7].text).text,

      // 特殊节点
      pieOuterStrokeWidth: '2px',
      pieInnerStrokeWidth: '0px',
      pieSectionTextSize: '14px',

      // 时序图
      actorBorder: tinycolor(primary.text).setAlpha(0.3).toHexString(),
      actorBkg: primary.bg,
      actorTextColor: primary.text,
      actorLineColor: tinycolor(primary.text).setAlpha(0.3).toHexString(),
      signalColor: primary.text,
      signalTextColor: primary.text,

      // 流程图
      nodeBorder: tinycolor(primary.text).setAlpha(0.3).toHexString(),
      nodeTextColor: primary.text,

      // 类图
      classText: primary.text,
    }
  }
}

const props = defineProps(['size'])
const size = props.size || 'full' // 'sm' | 'md' | 'lg' | 'full'

const el = ref(null)
const rendered = ref(false)
const rerenderCounter = ref(1)

const slots = useSlots()
const mermaidSyntax = computed(() => {
  // Trick to force re-render when the slot content changes (for preview inside studio)
  rerenderCounter.value

  const defaultSlot = slots.default?.()[0]
  if (!defaultSlot) {
    return ''
  }

  // Old syntax with text node
  if (typeof defaultSlot.children === 'string') {
    return defaultSlot.children
  }

  // New syntax with code node
  const codeChild = defaultSlot.children?.default()[0]
  if (codeChild.type !== 'code') {
    return ''
  }

  // New syntax without highlight
  if (typeof codeChild.children === 'string') {
    return codeChild.children
  }

  // New syntax with highlight
  return nodeTextContent(codeChild.children)
})
watch(mermaidSyntax, render)

async function render() {
  if (!el.value) {
    return
  }
  if (el.value.querySelector('svg')) {
    // Already rendered
    return
  }

  // // Iterate children to remove comments
  for (const child of el.value.childNodes) {
    if (child.nodeType === Node.COMMENT_NODE) {
      el.value.removeChild(child)
    }
  }

  const [{ default: mermaid }, { Svg2Roughjs }] = await Promise.all([
    import("mermaid"),
    import('svg2roughjs')
  ])

  // 生成随机主题配置
  const themeConfig = generateMermaidTheme()

  // 初始化 mermaid 配置
  mermaid.initialize({
    startOnLoad: false,
    ...themeConfig,
    // 确保字体大小可读
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 16,
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: true,
      rightAngles: false,
      showSequenceNumbers: false,
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d',
    },
  })

  el.value.classList.add('mermaid')
  rendered.value = true
  await mermaid.run({ nodes: [el.value] })

  const svg = el.value.querySelector('svg')
  const svg2roughjs = new Svg2Roughjs(el.value)
  svg2roughjs.svg = svg
  svg2roughjs.sketch()

  const roughSVG = el.value.querySelector('svg + svg')
  const width = roughSVG.getAttribute('width')
  const height = roughSVG.getAttribute('height')
  roughSVG.setAttribute('viewBox', `0 0 ${width} ${height}`)
  roughSVG.setAttribute('width', '100%')
  roughSVG.setAttribute('height', '100%')
}

onBeforeUpdate(() => {
  rerenderCounter.value++
})
onMounted(render)
</script>

<style>
.mermaid > svg:has(+ svg) {
  display: none;
}

html.dark .mermaid svg {
  filter: invert(1);
}

.mermaid {
  margin: auto;

  svg {
    max-width: 100%;
    height: auto;
  }

  &.is-sm {
    max-width: 30%;
  }
  &.is-md {
    max-width: 50%;
  }
  &.is-lg {
    max-width: 70%;
  }
  &.is-full {
    max-width: 100%;
  }
}
</style>
