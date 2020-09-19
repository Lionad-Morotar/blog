<template>
  <div class="fps-meter">{{fps}}</div>
</template>

<script>
/*********************************************************** animation frame api */
let requestFrameStore = null
const requestAnimationFrame = (cb) => {
  const fn =
    requestFrameStore ||
    (requestFrameStore =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      })
  return fn(cb)
}
let cancelFrameStore = null
const cancelAnimationFrame = (id) => {
  const fn =
    cancelFrameStore ||
    (cancelFrameStore =
      window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      clearTimeout)
  return fn(id)
}

/*********************************************************** vue logic */
export default {
  name: 'fps-meter-cmpt',
  data() {
    return {
      fps: '',
    }
  },
  mounted() {
    let tick = null
    let date = +new Date()
    this.$once('hook:beforeDestroy', () => cancelAnimationFrame(step))
    const step = () => {
      const currentFPS = Math.floor(1000 / Math.abs(date - (date = +new Date())))
      this.fps = currentFPS
      tick = requestAnimationFrame(step)
    }

    step()
  },
}
</script>

<style lang="scss">
.fps-meter {
  position: absolute;
  top: 0;
  right: 0px;
  padding: 0 5px;
  width: 20px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
  font-size: 12px;
  line-height: 18px;
  font-weight: bold;
}
</style>
