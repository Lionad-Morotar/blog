<template>
  <div class="p5-con" />
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
    const stop = typeof cond === 'function' ? cond() : cond
    stop && this.noLoop()
    return stop
  },
  drawUntil (condFn, step) {
    this._predraw = this._predraw || []
    const condFnWrapper = () => {
      const _remove = x => x.splice(x.findIndex(item => item === x), 1)
      const isStop = extFns.stopIf.bind(this)(condFn)
      if (isStop) {
        _remove(this._predraw, condFnWrapper)
      } else {
        step && step()
      }
    }
    this._predraw.push(condFnWrapper)
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
    id: String(+new Date()) + String(Math.random()).slice(-6),
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
  async mounted() {
    /* init p5.js */
    await this.loadScript()
    this.observeIntersection()
    /* init canvas size */
    const $h1 = document && document.querySelector('h1')
    if ($h1) {
      this.width = this.w || ($h1 ? $h1.offsetWidth : (window.innerWidth || this.width))
      this.height = this.h || (~~(this.width * 0.618))
    } else {
      this.width = 0
      this.height = 0
    }
  },
  methods: {
    async loadScript() {
      return await this.$utils.loadScriptFromURL(
        'https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js',
        // 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js'
      )
    },
    // 只在出现于视窗内时才开始加载
    observeIntersection() {
      const observer = new IntersectionObserver(changeElms => {
        changeElms.forEach(elm => {
          if (elm.isIntersecting) {
            observer.unobserve(this.$el)
            this.initP5()
          }
        })
      })
      observer.observe(this.$el)
    },
    async initP5() {
      new p5(ctx => {
        /* extends ctx with some helper fns */
        ctx = this.extendP5(ctx)
        this.$emit('p5', ctx)
        // TODO execution times control
        /* wrapper raw event handlerv with preHooks and postHooks */
        this.p5Events.map(event => {
          const emitName = event.toLowerCase()
          const rawHandler = ctx[event]
          ctx[event] = async (...args) => {
            const rest = [ctx, ...args]
            // TODO refactor
            const prename = 'pre' + emitName
            const postname = 'post' + emitName
            const _prename = '_pre' + emitName
            const _postname = '_post' + emitName
            this[prename] && this[prename](...rest)
            ctx[_prename] && ctx[_prename].map(fn => fn(...rest))
            const res = rawHandler && rawHandler(...rest)
            this[postname] && this[postname](...rest)
            ctx[_postname] && ctx[_postname].map(fn => fn(...rest))
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
      ctx.HALF_WIDTH = ~~(ctx.WIDTH / 2)
      ctx.HALF_HEIGHT = ~~(ctx.HEIGHT / 2)
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
