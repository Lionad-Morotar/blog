<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Circle, GOLDEN_RATIO } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    circles: [],
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
      if (this.drawIDX++ > 100) {
        ctx.noLoop()
      } else {
        const center = {
          x: this.canvasWidth / 2,
          y: this.canvasHeight / 2
        }
        const HelixDotsGen = function* (initPoint = center) {
          let i = 0
          while (true) {
            i++
            const rad = (i * 0.1) % ctx.TAU
            const radius = i * 0.1
            const dot = {
              x: initPoint.x + ctx.cos(rad) * radius,
              y: initPoint.y + ctx.sin(rad) * radius,
            }
            yield dot
          }
        }
        const findSpacePoint = async (fromPoint, radius) => {
          const helix = HelixDotsGen(fromPoint)
          let cur = null
          while ((cur = helix.next().value)) {
            const memo = this.memo[`${cur.x}-${cur.y}`]
            if (memo && memo.min < radius) continue

            ctx.stroke(ctx.color(0, 255 / 50))
            ctx.point(cur.x, cur.y)
            const target = new Circle({ x: cur.x, y: cur.y, radius, fill: false, color: ctx.color(0, 255 / 100) }).init(ctx)
            const find = this.circles.find(x => x.cross(target))
            if (!find) {
              return cur
            } else {
              // 如果在某个点半径 radius 都放不下，
              // 那么比 radius 大的半径肯定也放不下了
              if (!memo || (radius < memo.min)) {
                this.memo[`${cur.x}-${cur.y}`] = { min: radius }
              }
            }
          }
        }
        const radius = ctx.random(5, 50)
        const point = await findSpacePoint(center, radius)
        if (point) {
          const opacity = ctx.map(radius, 5, 50, 255, 200)
          const circle = new Circle({
            x: point.x,
            y: point.y,
            radius,
            color: ctx.color(0, opacity),
            fill: false
          }).init(ctx)
          this.circles.push(circle)
          circle.draw()
        }
      }
    }
  }
}
</script>
