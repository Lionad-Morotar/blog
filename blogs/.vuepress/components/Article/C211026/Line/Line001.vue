<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Line } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    lines: [],
    canvasWidth: 0,
    canvasHeight: 0
  }),
  mounted() {
    this.canvasWidth = document.querySelector('h1').offsetWidth
    this.canvasHeight = 400
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.canvasWidth, this.canvasHeight)
      ctx.background(233)
      this.lines = Array(100).fill().map((_, idx) => {
        const x = ctx.map(idx, 0, 99, 1, this.canvasWidth - 1)
        const y1 = ctx.random(this.canvasHeight)
        const y2 = ctx.random(this.canvasHeight)
        const line = new Line({
          start: { x, y: y1 },
          end: { x, y: y2 },
        }).init(ctx)
        line.width = ctx.map(line.length, 0, this.canvasHeight, 0, 7)
        line.color = ctx.map(line.length, 0, this.canvasHeight, 0, 233)
        return line
      })
      this.lines.map(x => x.draw())
    }
  }
}
</script>
