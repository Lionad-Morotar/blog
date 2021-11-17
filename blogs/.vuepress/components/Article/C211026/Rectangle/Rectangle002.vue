<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Point, Rectangle } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    rectangles: [],
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
      this.points = Array(35).fill().map(_ => new Point({
        x: ctx.random(this.canvasWidth),
        y: ctx.random(this.canvasHeight),
        ctx
      }))
      this.rectangles = Array(50).fill().map(_ => new Rectangle({
        corners: [
          { x: ctx.random(this.canvasWidth), y: ctx.random(this.canvasHeight) },
          { x: ctx.random(this.canvasWidth), y: ctx.random(this.canvasHeight) },
        ],
        ctx
      }))
      this.rectangles.map(rect => {
        rect.step = {
          x: ctx.random(-3, 3),
          y: ctx.random(-3, 3),
        }
      })
    },
    async draw (ctx) {
      if (this.drawIDX > 500) {
        ctx.noLoop()
        return null
      } else {
        this.drawIDX++
      }
      this.rectangles.map(rect => {
        const [p1, p2] = rect.corners
        rect.set({
          corners: [
            new Point({ x: p1.x + rect.step.x, y: p1.y + rect.step.y }).init(ctx),
            new Point({ x: p2.x + rect.step.x, y: p2.y + rect.step.y }).init(ctx),
          ]
        })
        this.points.map(point => {
          if (rect.contains(point)) {
            ctx.stroke(ctx.color(10, 35))
            ctx.strokeWeight(0.08)
            ctx.line(point.x, point.y, p1.x, p1.y)
            ctx.line(point.x, point.y, p2.x, p2.y)
          }
        })
      })
    }
  }
}
</script>
