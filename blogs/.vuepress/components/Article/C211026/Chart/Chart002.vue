<template>
  <WHRatio h="600px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
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
    this.canvasHeight = 600
    this.canvasArea = this.canvasWidth * this.canvasHeight
    this.canvasLongEdge = Math.max(this.canvasWidth, this.canvasHeight)
    this.canvasShortEdge = Math.min(this.canvasWidth, this.canvasHeight)
  },
  methods: {
    setup(ctx) {
      ctx.createCanvas(this.canvasWidth, this.canvasHeight)
      ctx.background(233)

      const nums = Array(60).fill().map((_, idx) => idx).sort(() => -1)
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
      let count = 1
      ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
      while (count ++ < 20) {
        const history = this.memo.history.length % 2
          ? this.memo.history.pop()
          : this.memo.history.shift()
        ctx.stroke(ctx.color(0, 160))
        ctx.strokeWeight(.8)
        ctx.noFill()
        ctx.beginShape()
        const baseRadius = 50
        const ratio = 3
        history && history.map((num, idx) => {
          const rad = ctx.map(idx, 0, history.length - 1, 0, ctx.TAU)
          const r = baseRadius + num * ratio
          const x = ctx.cos(rad) * r
          const y = ctx.sin(rad) * r
          ctx.vertex(x, y)
        })
        ctx.endShape()
      }
    }
  }
}
</script>
