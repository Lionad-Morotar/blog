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
      
      this.lines = Array(10).fill().map(() => {
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
      if (this.drawIDX > 1) {
        ctx.noLoop()
        return
      } else {
        this.lines.map((curLine, idx) => {
          const nextLine = this.lines[idx + 1] || this.lines[0]
          const p1 = curLine.lerp(this.drawIDX)
          const p2 = nextLine.lerp(this.drawIDX)
          const distance = p1.distance(p2)
          const alpha = ctx.map(distance, 0, this.canvasWidth, 30, 0)
          ctx.stroke(0, alpha)
          ctx.line(p1.x, p1.y, p2.x, p2.y)
        })
        this.drawIDX += 0.005
      }
    }
  }
}
</script>
