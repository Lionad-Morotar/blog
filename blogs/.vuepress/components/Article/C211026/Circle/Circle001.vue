<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Circle } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    circles: [],
    canvasWidth: 0,
    canvasHeight: 0,
    canvasLongEdge: 0,
  }),
  mounted() {
    this.canvasWidth = document.querySelector('h1').offsetWidth
    this.canvasHeight = 400
    this.canvasLongEdge = Math.max(this.canvasWidth, this.canvasHeight)
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.canvasWidth, this.canvasHeight)
      ctx.background(233)
      const circles = Array(15).fill().map((_, idx) => {
        const x = ctx.random(this.canvasWidth)
        const y = ctx.random(this.canvasHeight)
        const radius = ctx.random(10, this.canvasLongEdge / 4)
        const opacity = ctx.map(radius, 0, this.canvasLongEdge, 135, 0)
        return new Circle({ x, y, radius, color: ctx.color(0, opacity) }).init(ctx)
      })
      circles.map(x => x.draw())
    }
  }
}
</script>
