<template>
  <div class="page-qrcodes-show">
    <div v-if="code" class="num-con"><span class="num">{{code}}</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: 0
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    getCode() {
      const codes = window.location.href.match(/code=(\d+)/)
      const code = codes && codes[1]
      if (code) {
        this.code = String(code).padStart(3, '0')
        return true
      }
      return false
    } 
  }
}
</script>

<style lang="stylus" scoped>
.page-qrcodes {
  margin-top: -8vh !important;
}
.num-con {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99998;
  background: var(--color-background);

  .num {
    display: block;
    margin-top: -5vh;
    font-family: var(--font-garamond), 'Noto Serif CJK BOLD';
    font-size: 25vw;
    font-weight: bolder;
    color: rgba(0,0,0,.8);
  }
}
</style>