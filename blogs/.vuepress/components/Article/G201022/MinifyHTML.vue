<template>
  <div class="task-slice-cmpt">
    <div class="frame" />
  </div>
</template>

<script>
const raw = require('!!raw-loader!./snapshot.html').default
const fixStyle = require('!!raw-loader!./snapshot.fix.html').default

export default {
  data() {
    return {
      raw,
      fixStyle
    }
  },
  mounted() {
    this.putTo(raw, '.frame')
  },
  methods: {
    putTo(html, c) {
      const shadow = document.querySelector(c).attachShadow({ mode: 'open' })
      shadow.innerHTML = html
      shadow.innerHTML += fixStyle
    },
    minify() {}
  }
}
</script>

<style lang="stylus" scoped>
.frame {
  width: 100%;
  height: 50vh;
  max-height: 500px;
  border: solid 1px #999;
  overflow: scroll;
}
</style>
