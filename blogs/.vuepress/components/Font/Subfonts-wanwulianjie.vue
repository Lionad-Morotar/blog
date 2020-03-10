<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.value = 'font-wanwulianjie'
  }
}
</script>

<style lang="stylus">
@import './subfont/wanwulianjie/fonts-0a60461fa1.css';

body.font-wanwulianjie {
  font-family: 'Noto Serif SC wanwulianjie';
}

.placeholder {
  content: 'import fonts';
}
</style>