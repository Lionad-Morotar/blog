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
      let i = 1000
      while(i--) {
        points.push(
          new Point({
            x: ctx.random(this.canvasWidth),
            y: ctx.random(this.canvasHeight),
            width: ctx.random(20),
            color: ctx.random(256),
          })
        )
      }
      points.map(x => x.init(ctx).draw())
    },
  }
}
</script>
