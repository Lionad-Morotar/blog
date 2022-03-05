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
      let i = 500
      while(i--) {
        const rad = ctx.random(ctx.TAU)
        // 由于 radius 决定点的分布概率，和面积是 x:x**2 的关系，所以接下来要对 radius 开 1/2 次方，
        // 才能使点在圆形内的分布平均
        const radius = Math.min(this.canvasWidth, this.canvasHeight) / 2
        const radiusUnite = ctx.pow(ctx.random(1), .5) * radius
        points.push(
          new Point({
            x: ctx.cos(rad) * radiusUnite,
            y: ctx.sin(rad) * radiusUnite,
            width: ctx.random(16),
            color: ctx.random(256),
          })
        )
      }

      ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
      points.map(x => x.init(ctx).draw())
    },
  }
}
</script>
