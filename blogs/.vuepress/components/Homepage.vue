<template>
  <div class="home">
    <link rel="prefetch" href="/articles/index.html" />

    <PageLoading />
  </div>
</template>

<script>
import PageLoading from './Animation/PageLoading'

export default {
  components: {
    PageLoading
  },
  computed: {
    data() {
      return {
        ...this.$page.frontmatter
      }
    }
  },
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="stylus">
@import './styles/animation.scss';

.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
