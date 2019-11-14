<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.value = 'font-001'
  }
}
</script>

<style>
@import './subfont/001/index.css';

body.font-001 {
  font-family: 'Noto Serif SC 001';
}

.placeholder {
  content: 'import fonts';
}
</style>