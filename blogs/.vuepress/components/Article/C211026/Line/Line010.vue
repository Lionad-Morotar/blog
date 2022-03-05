<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Line } = Utils

class DividedLine extends Line {
  constructor (...args) {
    super(...args)
  }
  divide (num = 1, ...radLimit) {
    if (radLimit.length === 0) {
      radLimit = [0, this.ctx.TAU]
    }
    return Array(num).fill().map(() => {
      const p1 = this.end.copy()
      const rad = this.ctx.random(...radLimit)
      const len = this.length / 2
      return new DividedLine({
        start: p1,
        end: {
          x: p1.x + this.ctx.cos(rad) * len,
          y: p1.y + this.ctx.sin(rad) * len,
        }
      }).init(this.ctx)
    })
  }
}

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
      const lines = Array(5).fill().map((_, idx) => {
        const x = ctx.map(idx, 0, 4, 0 + 100, this.canvasWidth - 101)
        return new DividedLine({
          start: { x, y: this.canvasHeight - 1 },
          end: { x, y: ctx.random(this.canvasHeight * .8, this.canvasHeight * .6) },
        }).init(ctx)
      })
      lines.map(x => x.draw())
      this.lines = lines.map(x => x.divide(4, 0, -ctx.TAU / 2)).flat()
    },
    draw(ctx) {
      if (this.lines.length === 0) {
        ctx.noLoop()
        return
      }
      let lines = []
      let line
      // 防止单帧的计算量过大
      let count = 0
      while (count++ < 100 && (line = this.lines.pop())) {
        if (line && line.length > 1) {
          line.draw()
          lines = lines.concat(line.divide(4, 0, -ctx.TAU / 2))
        }
      }
      this.lines = this.lines.concat(lines)
    }
  }
}
</script>
