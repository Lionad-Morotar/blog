<template>
  <div class="page-qrcodes">
    <div class="qrcodes-con" v-for="i in count">
      <div :class="`qrcodes qrcodes-${i}`" :key="i" :data-qrcode-content="i" />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data() {
    return {
      count: 26
    }
  },
  mounted () {
    this.generateQRCode()
  },
  methods: {
    generateQRCode() {
      [...window.document.querySelectorAll('.qrcodes')].map((e,i) => {
        new QRCode(e, {
          text: `www.lionad.art/articles/private/qrcodes.html?code=${i+1}`,
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
</style>