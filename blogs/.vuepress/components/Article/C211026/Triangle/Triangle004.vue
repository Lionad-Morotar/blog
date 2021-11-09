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
      const offset = {
        x: this.canvasWidth / 7,
        y: -this.canvasHeight / 140,
      }
      const ytop = this.canvasShortEdge * (1 / 7)
      const ybottom = this.canvasShortEdge * (6 / 7)
      const shortDistance = ybottom - ytop
      const xcenter = this.canvasWidth / 2
      const xleft = xcenter - (shortDistance / 2)
      const xright = xcenter + (shortDistance / 2)
      this.triangles = [
        new Triangle({
          apexes: [
            new Point({
              x: xcenter - offset.x,
              y: ytop - offset.y,
            }),
            new Point({
              x: xleft - offset.x,
              y: ybottom - offset.y,
            }),
            new Point({
              x: xright - offset.x,
              y: ybottom - offset.y,
            }),
          ],
          color: ctx.color(0, 50),
          fill: false,
          ctx
        }).draw(),
        new Triangle({
          apexes: [
            new Point({
              x: xleft + offset.x,
              y: ytop + offset.y,
            }),
            new Point({
              x: xright + offset.x,
              y: ytop + offset.y,
            }),
            new Point({
              x: xcenter + offset.x,
              y: ybottom + offset.y,
            }),
          ],
          color: ctx.color(0, 50),
          fill: false,
          ctx
        }).draw()
      ]
    },
    async draw (ctx) {
      if (this.drawIDX++ > 99) {
        ctx.noLoop()
      } else {
        this.triangles[0] = this.triangles[0].lerp(0.01201).draw()
        this.triangles[1].lerp(this.drawIDX * 0.01).draw()
      }
    }
  }
}
</script>
