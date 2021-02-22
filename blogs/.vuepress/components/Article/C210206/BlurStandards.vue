<template>
  <WHRatio h="62%">
    <vue-p5 @preload="preload" @setup="setup" @draw="draw" />
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
      this.img = ctx.loadImage('/images/art/3398528868805936641.jpg')
    },
    setup(ctx) {
      ctx.noLoop()
    },
    draw(ctx) {
      ctx.image(img, 0, 0)
      
      const edgeImg = ctx.createImage(img.width, img.height)
            edgeImg.loadPixels()
      
      for (let x = 1; x < this.img.width; x++) {
        for (let y = 1; y < this.img.height; y++) {
          let sum = 0
          for (kx = -1; kx <= 1; kx++) {
            for (ky = -1; ky <= 1; ky++) {
              let xpos = x + kx
              let ypos = y + ky
              let val = green(this.img.get(xpos, ypos))
              sum += kernel[kx+1][ky+1] * val
            }
          }
          edgeImg.set(x, y, color(sum))
        }
      }
      edgeImg.updatePixels()
      ctx.image(edgeImg, this.img.width, 0)
    },
  }
}
</script>