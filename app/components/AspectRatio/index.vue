<template>
  <div class="wh-container relative flex rounded-sm overflow-hidden" :style="{ width: w }">
    <slot name="default">
      <svg
        class="absolute inset-0 h-full w-full border rounded  stroke-gray-900/10 dark:stroke-white/10 border-gray-900/10 dark:border-gray-white/10"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-cx-svg-bg-placeholder"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
          </pattern>
        </defs>
        <rect
          stroke="none"
          fill="url(#pattern-cx-svg-bg-placeholder)"
          width="100%"
          height="100%"
        >
          <text :content="props.placeholder" />
        </rect>
      </svg>
    </slot>
    <div class="padding-box w-0 h-0" :style="{ paddingTop: h }" />
  </div>
</template>

<script setup>
const props = defineProps({
  w: {
    type: String,
    default: '100%'
  },
  h: {
    type: String,
    default: '100%'
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>
