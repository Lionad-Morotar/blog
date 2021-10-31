<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Particle, Vector } = Utils

export default {
  data: () => ({
    particles: [],
    drawIDX: 0,
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
      const particles = []
      let i = 100
      while(i--) {
        particles.push(
          new Particle({
            x: ctx.random(this.canvasWidth),
            y: ctx.random(this.canvasHeight),
          })
        )
      }
      particles.map(x => x.init(ctx))
      this.particles = particles
    },
    draw(ctx) {
      this.drawIDX++
      if (this.drawIDX < 1000) {
        this.particles.map(p => {
          const x = ctx.random(-1, 1)
          const y = ctx.random(-1, 1)
          const f = new Vector({ x, y })
          p.apply(f)
          p.update()
          p.draw()
        })
      }
    }
  }
}
</script>
