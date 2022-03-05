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
      const xs = [2]
      let x
      while ((x = ctx.pow(xs[xs.length-1], 1.01)) < this.canvasWidth) {
        xs.push(x)
      }
      this.lines = xs.map((x, idx) => {
        const y = ctx.noise(idx / 30) * this.canvasHeight
        const line = new Line({
          start: { x, y: y - (this.canvasHeight / 4) },
          end: { x, y: y + (this.canvasHeight / 4) },
        }).init(ctx)
        return line
      })
      this.lines.map(x => x.draw())
    }
  }
}
</script>
