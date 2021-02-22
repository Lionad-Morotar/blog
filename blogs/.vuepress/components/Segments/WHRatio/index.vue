<template>
  <div class="wh-container" :style="{ width: this.w }">
    <slot name="default" />
    <div class="padding-box" :style="{ paddingTop: this.h }" />
  </div>
</template>

<script>
export default {
  name: 'WHRatio',
  props: {
    w: {
      type: String,
      default: '100%'
    },
    h: {
      type: String,
      default: '100%'
    }
  }
}
</script>
<style lang="stylus">
.wh-container {
  display flex
  border-radius 3px
  overflow hidden

  & > .padding-box {
    width: 0;
    height: 0;
  }
}
</style>
