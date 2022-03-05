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

export default {
  data: () => ({
    drawIDX: 0,
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

      const [p1s, p2s] = [
        Array(8 + 2).fill().map((_, idx) => new Line({
          start: { x: 0, y: 0 },
          end: { x: this.canvasWidth - 1, y: 0 },
          ctx,
        }).lerp(idx * ((10 / 9) - 1))),
        Array(4 + 2).fill().map((_, idx) => new Line({
          start: { x: this.canvasWidth - 1, y: 0 },
          end: { x: this.canvasWidth - 1, y: this.canvasHeight - 1 },
          ctx,
        }).lerp(idx * (2 / 10))),
      ]
      for (let j = 0; j < 4 + 1; j++) {
        for (let i = 0; i < 8 + 1; i++) {
          const c1 = { x: p1s[i].x, y: p2s[j].y }
          const c2 = { x: p1s[i + 1].x, y: p2s[j + 1].y }
          const rects = this.memo.rects || (this.memo.rects = [])
          rects.push(new Rectangle({
            corners: [c1, c2],
            fill: false,
            color: ctx.color(0, 40),
            ctx
          }))
        }
      }
      this.memo.rects.map(x => x.draw())

      const nums = [7, 3, 9, 4, 5, 8, 2, 1, 0, 6]
      for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i+1; j < nums.length; j++) {
          const history = (this.memo.history || (this.memo.history = []))
          history.push([].concat(nums))
          if (nums[i] > nums[j]) {
            const t = nums[i]
            nums[i] = nums[j]
            nums[j] = t
          }
        }
      }

      this.memo.history.shift()
      this.memo.history.push(nums)
    },
    async draw (ctx) {
      if (this.memo.history.length === 0) {
        ctx.noLoop()
        return null
      }
      const [rect, history] = [
        this.memo.rects.shift(),
        this.memo.history.shift(),
      ]
      const [paddingX, paddingY] = [10, 23]
      const [max, min] = [ctx.max(...history), ctx.min(...history)]
      const [c1, c2] = rect.corners
      const [, ymax] = [c2.x - c1.x - paddingX, c2.y - c1.y - paddingY]
      const [, ycenter] = [(c2.x + c1.x)/2, (c2.y + c1.y)/2]
      history.map((num, idx) => {
        const x = ctx.map(idx, 0, history.length - 1, c1.x + paddingX, c2.x - paddingX)
        const ylen = ctx.map(num, min, max, 1, ymax - 1)
        ctx.stroke(ctx.color(0, 220))
        ctx.strokeWeight(2.5)
        ctx.line(x, ycenter - (ylen / 2), x, ycenter + (ylen / 2))
        ctx.textAlign(ctx.LEFT, ctx.TOP)
        ctx.strokeWeight(0.2)
        ctx.text(45 - this.memo.history.length, c1.x + paddingX / 3, c1.y + paddingY / 5)
      })
    }
  }
}
</script>
