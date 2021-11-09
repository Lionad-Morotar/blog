<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Triangle } = Utils

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
    },
    async draw (ctx) {
      if (this.drawIDX++ > 300) {
        ctx.noLoop()
      } else {
        ctx.noStroke()
        ctx.fill(ctx.color(0, 5))
        ctx.circle(
          this.canvasWidth / 2,
          this.canvasHeight / 2,
          this.canvasShortEdge * 0.8
        )
        Array(1).fill().map(_ => {
          const createApex = () => ({
            x: ctx.random(this.canvasWidth),
            y: ctx.random(this.canvasHeight),
          })
          const triangle = new Triangle({
            apexes: Array(3).fill().map(createApex),
            ctx
          })
          triangle.circumcircle.set({
            color: ctx.color(0, 1)
          }).draw()
          triangle.set({
            color: 233
          }).draw()
          this.triangles.push(triangle)
        })
        ctx.noStroke()
        ctx.fill(ctx.color(0, 5))
        ctx.circle(
          this.canvasWidth / 2,
          this.canvasHeight / 2,
          this.canvasShortEdge * 0.8
        )
      }
    }
  }
}
</script>
