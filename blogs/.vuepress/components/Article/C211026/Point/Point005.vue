<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Point } = Utils

export default {
  data: () => ({
    canvasWidth: 0,
    canvasHeight: 0
  }),
  mounted() {
    this.canvasWidth = document.querySelector('h1').offsetWidth
    this.canvasHeight = 400
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.canvasWidth, this.canvasHeight)
      ctx.background(233)

      const points = []
      const count = 150
      const padding = 30

      Array(count).fill('').map((x, idx) => {
        points.push(
          new Point({
            x: ctx.random(padding, this.canvasWidth - padding),
            y: ctx.random(padding, this.canvasHeight - padding),
            width: 1,
            color: 1,
          })
        )
      })
      points.map(x => x.init(ctx))
      points.map(x => {
        const distanceThreshold = 200
        const maxLineWidth = 3
        const rest = points.filter(y => y !== x)
        rest.map(y => {
          const distance = x.distance(y)
          if (distance < distanceThreshold) {
            const width = ctx.pow(ctx.map(distance, 0, distanceThreshold, maxLineWidth, 0), 1)
            const opacity = ctx.pow(ctx.map(distance, 0, distanceThreshold, 1, 0), 3)
            x.lineTo(y, width, `rgba(0,0,0, ${opacity})`)
          }
        })
      })
      const maxLinesCount = Math.max(...points.map(x => x.lines.length))
      points.map(x => {
        x.set({
          width: ctx.map(x.lines.length, 0, maxLinesCount, 20, 1),
          color: ctx.map(x.lines.length, 0, maxLinesCount, 0, 256)
        })
      })
      points.map(x => x.draw())
    },
  }
}
</script>
