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

class SubTriangle extends Triangle {
  constructor (...args) {
    super(...args)
  }
  subverse (...args) {
    const apexes = this.lines.map((line, idx) => line.lerp(args[idx] || args[0]))
    const [a, b, c] = apexes
    const [p1, p2, p3] = this.apexes
    return [
      new SubTriangle({
        ...this,
        apexes: [p1, a, c]
      }),
      new SubTriangle({
        ...this,
        apexes: [p2, a, b]
      }),
      new SubTriangle({
        ...this,
        apexes: [p3, b, c]
      }),
      new SubTriangle({
        ...this,
        apexes: [a, b, c]
      })
    ]
  }
}

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
      const xcenter = this.canvasWidth / 2
      this.triangles = [
        new SubTriangle({
          apexes: [
            new Point({ x: 0, y: 0 }),
            new Point({ x: 0, y: this.canvasHeight - 1 }),
            new Point({ x: xcenter, y: 0 })
          ]
        }),
        new SubTriangle({
          apexes: [
            new Point({ x: 0, y: this.canvasHeight - 1 }),
            new Point({ x: xcenter, y: 0 }),
            new Point({ x: xcenter, y: this.canvasHeight - 1})
          ]
        }),
        new SubTriangle({
          apexes: [
            new Point({ x: this.canvasWidth - 1, y: this.canvasHeight - 1 }),
            new Point({ x: xcenter, y: 0 }),
            new Point({ x: xcenter, y: this.canvasHeight - 1}),
          ]
        }),
        new SubTriangle({
          apexes: [
            new Point({ x: this.canvasWidth - 1, y: 0 }),
            new Point({ x: this.canvasWidth - 1, y: this.canvasHeight - 1 }),
            new Point({ x: xcenter, y: 0 }),
          ]
        }),
      ]
      this.triangles.map(triangle => triangle.set({
        color: ctx.color(0, 50),
        fill: false,
        ctx
      }).draw())
    },
    async draw (ctx) {
      if (this.triangles.length === 0) {
        ctx.noLoop()
      }
      let count = -1
      while (count++ < 10) {
        const next = this.triangles.pop()
        if (!next) {
          continue
        }
        if (next.area < 2) {
          count--
          continue
        } else {
          let targets = next.subverse(0.5)
          let parta = targets.reduce((h, c, idx) => !(idx % 2) ? (h.push(c), h) : h, [])
          let partb = targets.reduce((h, c, idx) => ([1].includes(idx)) ? (h.push(c), h) : h, [])
          targets = [...new Set([...new Set(parta), ...new Set(partb)])]
          targets.map(x => x.draw())
          this.triangles = partb.concat(this.triangles).concat(parta)
        }
      }
    }
  }
}
</script>
