<template>
  <div class="circle-draw">
    <vue-p5 @setup="setup" @draw="draw" @mousepressed="mousePressed"></vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'
export default {
  components: {
    'vue-p5': VueP5
  },
  data: () => ({
    lightDirection: 0,
    radius: 5,
    width: 740,
    height: 450,
    center: {
      x: 0,
      y: 0
    }
  }),
  mounted() {
    this.calcCenter()
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.width, this.height)
      ctx.background(233)
      ctx.strokeCap(ctx.ROUND)
      ctx.noFill()
      ctx.loop()
    },
    draw(ctx) {
      const rand = ctx.random()
      const rand2 = ctx.random()

      ctx.stroke(233 * (1 - rand))
      ctx.strokeWeight(rand * 5)
      ctx.arc(
        this.center.x,
        this.center.y,
        this.radius,
        this.radius,
        ctx.PI * rand - (this.lightDirection + ctx.HALF_PI),
        ctx.PI * rand2 * 2 - (this.lightDirection + ctx.HALF_PI)
      )
      this.radius += rand * 4

      ctx.noFill()
      this.checkStop(ctx)
    },
    mousePressed(ctx) {
      if (ctx.mouseX <= this.width && ctx.mouseY <= this.height) {
        if (ctx.mouseButton === ctx.LEFT) {
          this.calcCenter(ctx.mouseX * 2, ctx.mouseY * 2)
          this.changeLight()
          ctx.loop()
        }
        if (ctx.mouseButton === ctx.RIGHT) {
          ctx.noLoop()
        }
        if (ctx.mouseButton === ctx.CENTER) {
          ctx.noLoop()
          ctx.clear()
          ctx.background(233)
        }
      }
      return false
    },
    calcCenter(w, h) {
      this.center = {
        x: (w || this.width) / 2,
        y: (h || this.height) / 2
      }
      this.radius = 5
    },
    changeLight() {
      this.lightDirection = Math.random() * 360
    },
    checkStop(ctx) {
      if (this.radius >= this.width * ctx.sqrt(2)) {
        ctx.noLoop()
      }
    }
  }
}
</script>
<style lang="stylus">
.circle-draw {
  display flex
  border-radius 3px
  overflow hidden

  & > div {
    display flex
  }
}
</style>
