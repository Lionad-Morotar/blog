<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Point, Triangle } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    triangles: [],
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
      this.points = Array(7).fill().map(_ => new Point({
        x: ctx.random(this.canvasWidth),
        y: ctx.random(this.canvasHeight)
      }).init(ctx))
    },
    async draw (ctx) {
      if (this.drawIDX++ > 500) {
        ctx.noLoop()
      } else {
        this.points.map(async (point, idx) => {
          const apexes = [point, this.points[idx + 1], this.points[idx + 2]]
          if (apexes.filter(x => !x).length) return

          new Triangle({
            apexes,
            fill: 0,
            ctx
          })
          .circumcircle.set({
            color: ctx.color(0, 25),
            fill: false,
          }).draw()
          
          const nextPoint = idx === this.points.length - 1 - 2
            ? this.points[0]
            : this.points[idx + 1]
          this.points[idx] = point.rotate(nextPoint, 0.01)
        })
      }
    }
  }
}
</script>
