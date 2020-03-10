
<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.value = 'font-140059979'
  }
}
</script>

<style>
@import './subfont/140059979/index.css';

body.font-140059979 {
  font-family: 'Noto Serif SC 140059979';
}

.placeholder {
  content: 'import fonts';
}
</style>
