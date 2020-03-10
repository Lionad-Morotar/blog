<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.value = 'font-006'
  }
}
</script>

<style>
@import './subfont/006/index.css';

body.font-006 {
  font-family: 'Noto Serif SC 006';
}

.placeholder {
  content: 'import fonts';
}
</style>