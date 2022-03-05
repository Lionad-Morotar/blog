<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Rectangle } = Utils

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
    },
    async draw (ctx) {
      if (this.drawIDX > 30) {
        ctx.noLoop()
        return null
      } else {
        this.drawIDX++
      }
      const rects = Array(1).fill().map(_ => new Rectangle({
        corners: [
          { x: ctx.random(this.canvasWidth), y: ctx.random(this.canvasHeight) },
          { x: ctx.random(this.canvasWidth), y: ctx.random(this.canvasHeight) },
        ],
        fill: false,
        color: ctx.color(0, 10),
        ctx
      }).draw())
      rects.map(rect => {
        const rest = this.rectangles.filter(x => x !== rect)
        rest.map(x => {
          const intersect = rect.intersectRect(x)
          if (intersect) {
            const [p1, p2] = intersect.corners
            const [minx, maxx, miny, maxy] = [
              ctx.min(p1.x, p2.x),
              ctx.max(p1.x, p2.x),
              ctx.min(p1.y, p2.y),
              ctx.max(p1.y, p2.y),
            ]
            const lineCount = Math.floor((maxx - minx) / 2)
            Array(lineCount).fill().map((_, idx) => {
              const curx = ctx.map(idx, 0, lineCount - 1, minx, maxx)
              ctx.stroke(ctx.color(0, 40))
              ctx.line(curx, miny, curx, maxy)
            })
          }
        })
        this.rectangles.push(rect)
      })
    }
  }
}
</script>
