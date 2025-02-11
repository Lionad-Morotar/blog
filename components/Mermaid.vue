<template>
  <!-- Keep this to fetch `default` slot in metadata -->
  <slot v-if="false" />
  <pre ref="el" :style="{ display: rendered ? 'block' : 'none' }" class="not-prose">
    {{ mermaidSyntax }}
  </pre>
</template>

<script setup>
import { nodeTextContent } from '@nuxtjs/mdc/runtime/utils/node'

// * online editor
// https://mermaid-js.github.io/mermaid-live-editor/

// * source code
// see https://github.com/nuxt/content/issues/1866

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

// watch(mermaidSyntax, () => {
//   render()
// })

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
  el.value.classList.add('mermaid')
  rendered.value = true
  await mermaid.run({ nodes: [el.value] })

  const svg = el.value.querySelector('svg')
  const svg2roughjs = new Svg2Roughjs(el.value)
  svg2roughjs.svg = svg
  svg2roughjs.sketch()
}

onBeforeUpdate(() => {
  rerenderCounter.value++
})

onMounted(() => {
  render()
})
</script>

<style>
.mermaid > svg:has(+ svg) {
  display: none;
}

html.dark .mermaid svg {
  filter: invert(1);
}
</style>
