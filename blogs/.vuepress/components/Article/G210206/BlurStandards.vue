<template>
  <WHRatio h="503px">
    <vue-p5 h="503" @preload="preload" @setup="setup" @draw="draw" />
  </WHRatio>
</template>

<script>
export default {
  data: () => ({
    blurImage: null,
    rawImage: null,
    referImage: null,
    drawX: 0,
    repeat: 100,
  }),
  methods: {
    preload(ctx) {
      this.rawImage = ctx.loadImage('https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210209213519.png')
      this.referImage = this.rawImage
    },
    setup(ctx) {
      ctx.image(this.rawImage, 0, 0)
      ctx.image(this.rawImage, ctx.HALF_WIDTH, 0)
      this.blurImage = ctx.createImage(this.rawImage.width, this.rawImage.height)
      this.blurImage.loadPixels()
      ctx.drawUntil(() => this.repeat <= 0)
      ctx.drawUntil(() => {
        const isStop = this.drawX++ > ctx.HALF_WIDTH
        if (isStop === true) {
          this.repeat--
          this.drawX = 0
          this.referImage = this.blurImage
          return false
        }
        return isStop
      })
    },
    kernel ({ kx, ky, x, y }) {
      if (kx === 0 && ky === 0) {
        return 0
      } else {
        return 1 / 8
      }
    },
    async draw(ctx) {
      // console.log('draw')
      let x = this.drawX
      for (let y = 0; y < this.rawImage.height; y+=1) {
        let kx, ky, c = { r:0, g:0, b: 0 }
        if (x <= 0 || 
          y <= 0 || 
          x >= (ctx.HALF_WIDTH - 1) || 
          y >= this.rawImage.height - 1
        ) {
          const point = this.referImage.get(x, y)
          c.r += ctx.red(point)
          c.b += ctx.blue(point)
          c.g += ctx.green(point)
        } else {
          for (kx = -1; kx <= 1; kx+=1) {
            for (ky = -1; ky <= 1; ky+=1) {
              let xpos = x + kx
              let ypos = y + ky
              const point = this.referImage.get(xpos, ypos)
              const args = { kx, ky, x, y }
              c.r += this.kernel(args) * ctx.red(point)
              c.b += this.kernel(args) * ctx.blue(point)
              c.g += this.kernel(args) * ctx.green(point)
            }
          }
        }
        this.blurImage.set(x, y, ctx.color(c.r, c.g, c.b))
      }
      this.blurImage.updatePixels()
      ctx.image(this.blurImage, ctx.HALF_WIDTH, 0)
      for (let lx = 0; lx < Math.min(15, x); lx++) {
        ctx.stroke(`rgba(35, 22, 34, ${1 * (0.62 ** lx)})`)
        ctx.line(ctx.HALF_WIDTH + x - lx, 0, ctx.HALF_WIDTH + x - lx, ctx.HEIGHT)
      }
    },
  }
}
</script>