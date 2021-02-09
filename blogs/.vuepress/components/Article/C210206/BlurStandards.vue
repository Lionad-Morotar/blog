<template>
  <WHRatio h="503px">
    <vue-p5 h="503" @preload="preload" @setup="setup" @draw="draw" />
  </WHRatio>
</template>

<script>
let v = 1.0 / 9.0
let kernel = [[ v, v, v ], [ v, v, v ], [ v, v, v ]]

export default {
  data: () => ({
    img: null
  }),
  methods: {
    preload(ctx) {
      this.img = ctx.loadImage('https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20210209213519.png')
    },
    setup(ctx) {
      ctx.noLoop()
    },
    async draw(ctx) {
      ctx.image(this.img, 0, 0)
      const blurImage = ctx.createImage(this.img.width, this.img.height)
            blurImage.loadPixels()
      // this.$utils.forAwait(this.img.width, x => {
      //   for (let y = 0; y < this.img.height; y+=1) {
      //     let kx, ky, c = { r:0, g:0, b: 0 }
      //     for (kx = -1; kx <= 1; kx+=1) {
      //       for (ky = -1; ky <= 1; ky+=1) {
      //         let xpos = x + kx
      //         let ypos = y + ky
      //         const point = this.img.get(xpos, ypos)
      //         c.r += kernel[kx+1][ky+1] * ctx.red(point)
      //         c.b += kernel[kx+1][ky+1] * ctx.blue(point)
      //         c.g += kernel[kx+1][ky+1] * ctx.green(point)
      //       }
      //     }
      //     blurImage.set(x, y, ctx.color(c.r, c.g, c.b))
      //   }
      // })
      for (let x = 0; x < this.img.height; x+=1) {
        for (let y = 0; y < this.img.height; y+=1) {
          let kx, ky, c = { r:0, g:0, b: 0 }
          for (kx = -1; kx <= 1; kx+=1) {
            for (ky = -1; ky <= 1; ky+=1) {
              let xpos = x + kx
              let ypos = y + ky
              const point = this.img.get(xpos, ypos)
              c.r += kernel[kx+1][ky+1] * ctx.red(point)
              c.b += kernel[kx+1][ky+1] * ctx.blue(point)
              c.g += kernel[kx+1][ky+1] * ctx.green(point)
            }
          }
          blurImage.set(x, y, ctx.color(c.r, c.g, c.b))
        }
      }
      blurImage.updatePixels()
      ctx.image(blurImage, ctx.WIDTH / 2, 0)
    },
  }
}
</script>