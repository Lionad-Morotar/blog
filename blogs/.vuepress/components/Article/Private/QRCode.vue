<template>
  <div class="page-qrcodes">
    <div class="qrcodes-con" v-for="i in count">
      <div :class="`qrcodes qrcodes-${i}`" :key="i" :data-qrcode-content="i" />
    </div>
    <div v-if="code" class="num-con"><span class="num">{{code}}</span></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data() {
    return {
      count: 1,
      code: 0
    }
  },
  mounted () {
    if (!this.getCode()) {
      this.generateQRCode()
    }
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
    },
    generateQRCode() {
      [...document.querySelectorAll('.qrcodes')].map((e,i) => {
        new QRCode(e, {
          text: `www.lionad.art/articles/private/qrcodes.html?code=${i}`,
          width: 512,
          height: 512,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-qrcodes {
  margin-top: -8vh !important;
}

.qrcodes-con {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .qrcodes {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    img {
      margin: auto;
      width: 68%;
    }
  }
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
    font-family: garamond, 'Noto Serif CJK BOLD';
    font-size: 25vw;
    font-weight: bolder;
    color: rgba(0,0,0,.8);
  }
}
</style>

<style>
@media print {
  h1 {
    page-break-before: always;
  }
}
</style>