<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Rectangle } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    rectangles: [],
    points: [],
    memo: {},
    canvasWidth: 0,
    canvasHeight: 0,
    canvasLongEdge: 0,
  }),
  mounted() {
    this.canvasWidth = document.querySelector('h1').offsetWidth
    this.canvasHeight = 400
    this.canvasArea = this.canvasWidth * this.canvasHeight
    this.canvasLongEdge = Math.max(this.canvasWidth, this.canvasHeight)
    this.canvasShortEdge = Math.min(this.canvasWidth, this.canvasHeight)
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.canvasWidth, this.canvasHeight)
      ctx.background(233)
    },
    async draw (ctx) {
      if (this.drawIDX > 500) {
        ctx.noLoop()
        return null
      }
      this.drawIDX++
      const rect = new Rectangle({
        corners: [
          { x: ctx.random(this.canvasWidth), y: ctx.random(this.canvasHeight) },
          { x: ctx.random(this.canvasWidth), y: ctx.random(this.canvasHeight) },
        ],
        ctx
      })
      const opacity = ctx.map(rect.area, 0, this.canvasWidth * this.canvasHeight, 25, 1)
      rect.set({
        color: ctx.color((ctx.random() < 0.5) ? 0 : 233, opacity),
      }).draw()
      this.rectangles.push(rect)
    }
  }
}
</script>
