<template>
  <WHRatio h="800px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Point } = Utils

export default {
  data: () => ({
    points: [],
    genedPoints: [],
    drawIDX: 0,
    canvasWidth: 0,
    canvasHeight: 0
  }),
  mounted() {
    this.canvasWidth = document.querySelector('h1').offsetWidth
    this.canvasHeight = 800
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.canvasWidth, this.canvasHeight)
      ctx.background(233)

      const points = []
      let i = 50
      while(i--) {
        points.push(
          new Point({
            x: ctx.random(this.canvasWidth),
            y: ctx.random(this.canvasHeight),
            width: ctx.random(3),
            color: ctx.random(256),
          })
        )
      }

      points.map(x => x.init(ctx))
      points.map((x, i) => {
        const curPoint = x
        const nextPoint = points[i + 1] || points[0]
        Array(50).fill('').map(() => {
          curPoint.rotate(nextPoint, 0.01)
          this.genedPoints.push(curPoint.copy().set({ color: 'rgba(0,0,0,0)' }))
        })
      })
      this.points = points
    },
    draw(ctx) {
      const curPoint = this.genedPoints[this.drawIDX]
      if (!curPoint) {
        ctx.noLoop()
        return
      } else {
        curPoint.init(ctx)
        const rest = this.genedPoints.filter(y => y !== curPoint)
        rest.map(y => {
          const distance = curPoint.distance(y)
          const distanceThreshold = 120
          if (distance < distanceThreshold) {
            const color = ctx.map(distance, 0, distanceThreshold, 233, 0)
            curPoint.lineTo(y, 0.1, color)
          }
        })
        curPoint.draw()
        this.drawIDX += 1
      }
    }
  }
}
</script>
