<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Line } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    lines: [],
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
      this.lines = [
        new Line({
          start: { x: 0, y: 0 },
          end: { x: this.canvasWidth - 1, y: 0 },
        }),
        new Line({
          start: { x: this.canvasWidth - 1, y: this.canvasHeight - 1 },
          end: { x: 0, y: this.canvasHeight - 1 },
        }),
      ]
      this.lines.map(x => x.init(ctx))
      this.lines.map(line => {
        Array(90).fill().map(_ => {
          line.end.rotate(line.start, ctx.TAU / 4 / 90)
          line.draw()
        })
      })
    }
  }
}
</script>
