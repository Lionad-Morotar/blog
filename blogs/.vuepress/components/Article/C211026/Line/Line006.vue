<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
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
      
      this.lines = Array(35).fill().map(() => {
        const x1 = ctx.random(this.canvasWidth)
        const x2 = ctx.random(this.canvasWidth)
        const y1 = ctx.random(this.canvasHeight)
        const y2 = ctx.random(this.canvasHeight)
        return new Line({
          start: { x: x1, y: y1 },
          end: { x: x2, y: y2 },
          color: ctx.color(0, 20)
        }).init(ctx)
      })
      this.lines.map(x => x.draw())
    },
    draw(ctx) {
      const center = { x: this.canvasWidth / 2, y: this.canvasHeight / 2 }
      const curLine = this.lines[this.drawIDX]
      if (!curLine) {
        ctx.noLoop()
        return
      } else {
        Array(180).fill().map(() => {
          curLine.rotate(center, ctx.TAU / 360)
          curLine.draw()
        })
        this.drawIDX++
      }
    }
  }
}
</script>
