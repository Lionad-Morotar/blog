<template>
  <WHRatio h="62%">
    <vue-p5 @setup="setup" @draw="draw" @mousepressed="mousePressed" />
  </WHRatio>
</template>

<script>
export default {
  data: () => ({
    lightDirection: 0,
    radius: 5,
    width: null,
    height: null,
    center: {
      x: 0,
      y: 0
    }
  }),
  methods: {
    setup(ctx) {
      this.width = ctx.WIDTH
      this.height = ctx.HEIGHT
      this.calcCenter()
      ctx.background(233)
      ctx.strokeCap(ctx.ROUND)
      ctx.noFill()
      ctx.loop()
    },
    draw(ctx) {
      const rand = ctx.random()
      const rand2 = ctx.random()

      ctx.stroke(233 * (1 - rand))
      const strokeWeight = ~~(rand * 5)
      ctx.strokeWeight(strokeWeight)
      ctx.arc(
        this.center.x,
        this.center.y,
        this.radius,
        this.radius,
        ctx.PI * rand - (this.lightDirection + ctx.HALF_PI),
        ctx.PI * rand2 * 2 - (this.lightDirection + ctx.HALF_PI)
      )
      this.radius += strokeWeight

      ctx.stopIf(this.radius >= this.width * ctx.sqrt(2))
    },
    mousePressed(ctx) {
      if (ctx.isClickInCanvas()) {
        if (ctx.mouseButton === ctx.LEFT) {
          this.calcCenter(ctx.mouseX, ctx.mouseY)
          this.lightDirection = ~~(ctx.random() * 360)
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
      this.radius = 5
      this.center = {
        x: w || this.width / 2,
        y: h || this.height / 2
      }
    }
  }
}
</script>