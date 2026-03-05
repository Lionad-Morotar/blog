<template>
  <span class="spark-cmpt" :class="classname || ''">
    <particle
      v-for="sparkle in data.sparkles" :key="sparkle.id" :color="sparkle.color" :size="sparkle.size"
      :styles="sparkle.style"
    />
    <span class="children-wrapper">
      <slot />
    </span>
  </span>
</template>

<script setup>
import Particle from './particle.vue'

const props = defineProps({
  // 星星的颜色，默认为黄色，可以传入颜色值或者 colors 对象内的键名，也支持直接传入数组
  color: {
    type: [String, Array],
    default: 'default'
  },
  // 最小生成延迟（当最小生成延迟===最大生成延迟时，星星会一个接一个的生成，相当于 setTimeout）
  minDelay: {
    type: [Number, String],
    default: 60
  },
  // 最大生成延迟
  maxDelay: {
    type: [Number, String],
    default: 600
  },
  // // 持续闪烁多久，默认
  last: {
    type: [Number, String],
    default: Infinity
  },
  // // 触发方式
  type: {
    type: [String, Function],
    default: 'default'
  },
  // 自定义 Class 名称
  classname: {
    type: String,
    default: ''
  }
})

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

// 颜色配置
const colors = {
  default: '#FFE55D',
  multy: [
    '#FFE55D',
    '#F5FC5C',
    '#AFEC56',
    '#51DF72',
    '#51B2DF',
    '#517BDF',
    '#517CDF',
    '#7651DF',
    '#C651DF',
    '#EA5595',
    '#FF695D',
    '#FFA45D',
    '#FFC45D'
  ]
}

// 随机生成 Sparkle 实例信息
const genSparkle = (color = colors.default) => {
  return {
    id: String(random(10000, 99999)) + '-' + +Date.now(),
    color: color instanceof Array ? color[random(0, color.length)] : color,
    size: random(4, 16),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2
    }
  }
}

const data = reactive({
  sparkles: [],
  task: null
})

onMounted(() => {
  data.task = triggerSpark()
})

onBeforeUnmount(() => {
  data.task && data.task.stop()
  data.sparkles.length = 0
})

const propColors = []
try {
  const _colors = eval(props.color)
  const useColors = _colors instanceof Array ? _colors : colors[_colors] || _colors
  propColors.push(...useColors)
} catch (e) {
  // console.log('[ERR] e', e, props.color, typeof props.color)
  propColors.push(colors.multy)
}

function triggerSpark(minDelay = +props.minDelay, maxDelay = +props.maxDelay) {
  let isStop = false
  const task = {
    stop: () => (isStop = true),
    run: () => {
      window.setTimeout(() => {
        const newSpark = genSparkle(propColors)
        data.sparkles.push(newSpark)
        window.setTimeout(() => {
          data.sparkles.splice(
            data.sparkles.find(x => x === newSpark),
            1
          )
        }, 1000)
        task.run()
      }, random(minDelay, maxDelay))
    }
  }
  task.run()
  return task
}
</script>

<style lang="stylus" scoped>
.children-wrapper {
    position: relative;
    z-index: 1;
    font-weight: bold;
}
.spark-cmpt {
    position: relative;
    &.callout {
        display: block;
        margin-top: 1em;
        margin-bottom: 1em;
        text-align: center;
        font-size: 2em;
        font-weight: bold;
    }
}
</style>
