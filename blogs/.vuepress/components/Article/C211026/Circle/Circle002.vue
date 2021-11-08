<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Circle, GOLDEN_RATIO } = Utils

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
      const center = {
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2
      }
      const circles = Array(300).fill().map((_, idx) => {
        const rad = ctx.TAU * GOLDEN_RATIO * idx
        const range = ctx.sqrt(idx + 1) * 25
        const x = center.x + ctx.cos(rad) * range
        const y = center.y + ctx.sin(rad) * range
        const opacity = ctx.map(range, 0, this.canvasLongEdge / 2, 255, 30)
        return new Circle({
          x, y,
          radius: ctx.random(12, 20),
          color: ctx.color(0, opacity),
          fill: false
        }).init(ctx)
      })
      circles.map(x => x.draw())
    }
  }
}
</script>
