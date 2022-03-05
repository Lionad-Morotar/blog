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
      const radius = Math.min(this.canvasWidth, this.canvasHeight) / 2
      const pointSizeMax = 10
      const pointColorMax = 256
      const radiusStep = 12
      let curRadius = 0
      while(curRadius < radius) {
        if (curRadius == 0) {
          points.push(
            new Point({
              x: 0,
              y: 0,
              width: ctx.random(pointSizeMax/2, pointSizeMax),
              color: ctx.random(pointColorMax),
            })
          )
        } else {
          const girth = ctx.TAU * curRadius
          const count = Math.floor(girth / radiusStep)
          Array(count).fill('').map((x, idx) => {
            const rad = ctx.TAU * (idx / count)
            points.push(
              new Point({
                x: ctx.cos(rad) * curRadius,
                y: ctx.sin(rad) * curRadius,
                width: ctx.random(pointSizeMax),
                color: ctx.random(pointColorMax),
              })
            )
          })
        }
        curRadius += radiusStep
      }

      ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
      points.map(x => x.init(ctx).draw())
    },
  }
}
</script>
