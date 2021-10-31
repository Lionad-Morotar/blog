<template>
  <WHRatio h="400px">
    <ClientOnly>
      <vue-p5 @setup="setup" @draw="draw" />
    </ClientOnly>
  </WHRatio>
</template>

<script>
import Utils from '../utils'

const { Particle, Attractor } = Utils

export default {
  data: () => ({
    drawIDX: 0,
    particles: [],
    attractors: [],
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
      this.attractors = [
        // 用于吸引所有粒子
        new Attractor({
          x: this.canvasWidth / 2,
          y: this.canvasHeight / 2,
          magnitude: 1
        }),
        // 用来控制上一个吸引子的移动
        new Attractor({
          x: this.canvasWidth / 2,
          y: 0,
          magnitude: 1
        })
      ]
      this.particles = Array(200).fill().map(() => new Particle({
        x: ctx.random(this.canvasWidth),
        y: ctx.random(this.canvasHeight),
      }))
      this.particles.map(x => x.init(ctx))
    },
    draw(ctx) {
      this.drawIDX++
      const [attractor, attractorMover] = this.attractors
      if (this.drawIDX < 150) {
        this.particles.map(p => {
          const f = attractor.force(p.position)
          p.apply(f)
          p.update()
          p.draw()
        })
        const f = attractorMover.force(attractor.position)
        attractor.instance.apply(f)
        attractor.instance.update()
        if (this.drawIDX % 100 === 0) {
          attractorMover.setMagnitude(attractorMover.magnitude * -1)
        }
      }
    }
  }
}
</script>
