<template>
  <WHRatio h="600px" data-cmpt="frame">
    <iframe ref="frame" class="frame" :title="displayTitle" :src="src" />
    <a id="frame-tip" :href="src">Checkout: {{displayTitle}}</a>
  </WHRatio>
</template>

<script>
export default {
  name: 'frame-cmpt',
  props: {
    title: String,
    src: String,
  },
  computed: {
    displayTitle () {
      return this.title || this.getTitle()
    }
  },
  mounted () {
    const $frame = this.$refs.frame
    $frame.onload = () => {
      this.$utils.insertStyles(
        $frame.contentDocument.querySelector('body'),
        `.navbar, .sidebar, h1, #valine-vuepress-comment, #page-bottom { display: none }
        .page { overflow-x: hidden }
        .page > *:first-child { padding-top: 0 }
        .frame { display: none }
        .wh-container[data-cmpt="frame"] > .padding-box { display: none }
        .wh-container[data-cmpt="frame"] > .frame + #frame-tip { display: block }
        `
      )
    }
  },
  methods: {
    getTitle () {
      /**
       * @example "/gists/git.html.md" returns "git"
       */
      return (this.src || '').replace(/.*\/([^/\.]*).[^/]*$/, '$1')
    }
  }
}
</script>

<style lang="stylus">
.frame {
  width: 100%;
  max-height: 68vh;
  box-shadow: 0 0 0 15px rgba(0,0,0,.3);
  border: 2px solid #aaa;
}
#frame-tip {
  display: none;
}
</style>