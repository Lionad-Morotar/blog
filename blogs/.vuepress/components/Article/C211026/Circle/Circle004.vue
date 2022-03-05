<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
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
    points: [],
    memo: {},
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
    },
    async draw (ctx) {
      if (this.drawIDX++ > 35) {
        ctx.noLoop()
      } else {
        const center = {
          x: this.canvasWidth / 2,
          y: this.canvasHeight / 2
        }
        const radius = 50 + ctx.random(this.drawIDX * 10)
        const offset = {
          x: ctx.random(ctx.sqrt(this.drawIDX)) * 3,
          y: ctx.random(ctx.sqrt(this.drawIDX)) * 3,
        }
        const circle = new Circle({
          x: center.x + offset.x ,
          y: center.y + offset.y ,
          radius,
          color: ctx.color(0, 255 * 0.1),
          fill: false
        }).init(ctx)
        circle.draw()
        this.points = this.points.concat(this.circles.map(x => x.intersect(circle)).flat())
        this.points.map(p => p.set({ width: 5, color: ctx.color(0, 255 * 0.62) }).draw())
        this.circles.push(circle)
      }
    }
  }
}
</script>
