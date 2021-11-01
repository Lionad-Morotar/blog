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
      
      this.lines = Array(100).fill().map(() => {
        const x1 = ctx.random(this.canvasWidth)
        const x2 = ctx.random(this.canvasWidth)
        const y1 = ctx.random(this.canvasHeight)
        const y2 = ctx.random(this.canvasHeight)
        return new Line({
          start: { x: x1, y: y1 },
          end: { x: x2, y: y2 },
          color: ctx.color(0, 32)
        }).init(ctx)
      })
      this.lines.map(line => {
        const rest = this.lines.filter(x => x !== line)
        rest.map(another => {
          const intersect = line.intersect(another)
          if (intersect) {
            ctx.stroke(0, 32)
            ctx.strokeWeight(5)
            ctx.point(intersect.x, intersect.y)
          }
        })
      })
      this.lines.map(x => x.draw())
    },
  }
}
</script>
