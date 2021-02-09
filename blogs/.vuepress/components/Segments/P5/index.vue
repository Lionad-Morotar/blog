<template>
  <ClientOnly>
    <div class="p5-con" />
  </ClientOnly>
</template>

<script>
const initialEvents = [
  'preload',
  'setup',
  'draw',
  'deviceMoved',
  'deviceTurned',
  'deviceShaken',
  'keyPressed',
  'keyReleased',
  'keyTyped',
  'mouseMoved',
  'mouseDragged',
  'mousePressed',
  'mouseReleased',
  'mouseClicked',
  'doubleClicked',
  'mouseWheel',
  'touchStarted',
  'touchMoved',
  'touchEnded',
  'windowResized'
]

const extFns = {
  /* Common Helper */
  // 判断点击位置是否在画布内
  isClickInCanvas () {
    return this.mouseX >= 0 &&
      this.mouseY >= 0 &&
      this.mouseX <= this.WIDTH && 
      this.mouseY <= this.HEIGHT
  },
  /* Semantics Helper */
  stopIf (cond) {
    cond && this.noLoop()
  }
}

/** @see https://github.com/Kinrany/vue-p5 */
export default {
  name: 'VueP5',
  props: [
    'additionalEvents',
    'w',
    'h'
  ],
  data: () => ({
    width: 740,
    height: 450
  }),
  computed: {
    p5Events() {
      const { additionalEvents } = this
      return Array.isArray(additionalEvents) 
        ? [...new Set(initialEvents.concat(additionalEvents))]
        : initialEvents
    }
  },
  mounted() {
    /* init p5.js */
    this.initP5()
    /* init canvas size */
    const $h1 = document.querySelector('h1')
    this.width = this.w || ($h1 ? $h1.offsetWidth : (window.innerWidth || this.width))
    this.height = this.h || (~~(this.width * 0.618))
  },
  methods: {
    async initP5() {
      await this.$utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.min.js')
      new p5(ctx => {
        /* extends ctx with some helper fns */
        ctx = this.extendP5(ctx)
        this.$emit('p5', ctx)
        // TODO execution times control
        /* wrapper raw event handlerv with preHooks and postHooks */
        this.p5Events.map(event => {
          const emitName = event.toLowerCase()
          const rawHandler = ctx[event]
          ctx[event] = (...args) => {
            const rest = [ctx, ...args]
            const prename = 'pre' + emitName
            const postname = 'post' + emitName
            this[prename] && this[prename](...rest)
            const res = rawHandler && rawHandler(...rest)
            this[postname] && this[postname](...rest)
            this.$emit(emitName, ...rest)
            return res
          }
        })
      }, this.$el)
    },
    extendP5(ctx) {
      // TODO expose fn to parents
      return !Proxy ? ctx : new Proxy(ctx, {
        get (target, key) {
          const findExt = extFns[key] && extFns[key].bind(ctx)
          return findExt || ctx[key]
        }
      })
    },
    presetup(ctx) {
      ctx.createCanvas(this.width, this.height)
      ctx.WIDTH = this.width
      ctx.HEIGHT = this.height
    }
  }
}
</script>
<style lang="stylus">
.wh-container {
  & > .p5-con {
    display flex
    width 100%
    height 100%
  }
  & > .p5-con > canvas {
    width 100% !important;
    height unset !important;
  }
}
</style>
