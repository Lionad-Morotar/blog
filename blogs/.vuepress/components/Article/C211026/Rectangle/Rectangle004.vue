<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Line, Rectangle } = Utils

class SubRectangle extends Rectangle {
  constructor (...args) {
    super(...args)
  }
  subverse () {
    const [c1, c2, c3, c4] = this.vertexes
    const [p1, p2, p3, p4] = this.edges.map(x => x.lerp(.5))
    const [l1, l2] = [
      new Line({ start: p1, end: p3, ctx: this.ctx }),
      new Line({ start: p2, end: p4, ctx: this.ctx })
    ]
    l1.draw()
    const crossPoint = l1.intersect(l2)
    return [
      new SubRectangle({
        ...this,
        corners: [c1, crossPoint],
      }),
      new SubRectangle({
        ...this,
        corners: [crossPoint, c2],
      }),
      new SubRectangle({
        ...this,
        corners: [crossPoint, c3],
      }),
      new SubRectangle({
        ...this,
        corners: [c4, crossPoint],
      })
    ]
  }
}

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
      this.rectangles.push(new SubRectangle({
        ctx,
        corners: [
          { x: 0, y: 0 },
          { x: this.canvasWidth - 1, y: this.canvasHeight - 1 }
        ],
        fill: false,
        color: ctx.color(0),
      }))
    },
    async draw (ctx) {
      if (this.rectangles.length === 0) {
        ctx.noLoop()
        return null
      }
      let count = 0
      while (count++ < 15) {
        const next = this.rectangles.pop()
        if (next) {
          next.draw()
          if (next.area > 20) {
            const subs = next.subverse()
            subs.map(x => {
              if (next.area > (this.canvasWidth * this.canvasHeight / 5)) {
                this.rectangles.unshift(x)
              } else if (ctx.random() < 0.72) {
                this.rectangles.unshift(x)
              }
            })
          }
        }
      }
    }
  }
}
</script>
