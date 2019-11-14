<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.value = 'font-005'
  }
}
</script>

<style>
@import './subfont/005/index.css';

body.font-005 {
  font-family: 'Noto Serif SC 005';
}

.placeholder {
  content: 'import fonts';
}
</style>