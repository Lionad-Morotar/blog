<template>
  <WHRatio h="600px" data-cmpt="frame" :style="heightStyle">
    <template v-if="src">
      <iframe ref="frame" class="frame" :title="displayTitle" :src="src" :style="iframeStyle" />
      <a id="frame-tip" :href="src">Checkout: {{displayTitle}}</a>
    </template>
    <template v-else-if="content">
      {{ content }}
    </template>
  </WHRatio>
</template>

<script>
export default {
  name: 'frame-cmpt',
  props: {
    title: String,
    src: String,
    content: String
  },
  data () {
    return {
      isOnlyPre: false,
      height: null,
    }
  },
  computed: {
    displayTitle () {
      return this.title || this.getTitle()
    },
    heightStyle () {
      return {
        height: this.height ? `${this.height}px` : 'unset'
      }
    },
    iframeStyle () {
      return Object.assign({
        border: this.isOnlyPre ? 'unset' : '2px solid #aaa'
      }, this.heightStyle)
    }
  },
  mounted () {
    if (this.src) {
      this.initFrame()
    }
  },
  methods: {
    getTitle () {
      /**
       * @example "/gists/git.html.md" returns "git"
       */
      return (this.src || '').replace(/.*\/([^/\.]*).[^/]*$/, '$1')
    },
    initFrame () {
      const $frame = this.$refs.frame
      $frame.onload = () => {
        const document = $frame.contentDocument

        // general pretty, ect...
        const $css = this.$utils.insertStyles(
          document.querySelector('body'),
          `.navbar, .sidebar, h1, .page-edit, #valine-vuepress-comment, #page-bottom { display: none }
          .page { overflow-x: hidden; padding-left: 0; }
          .page > *:first-child { padding-top: 0 }
          .frame { display: none }
          .wh-container[data-cmpt="frame"] > .padding-box { display: none }
          .wh-container[data-cmpt="frame"] > .frame + #frame-tip { display: block }
          .page > .content__default h1 + h1,
          .page > .content__default h1 + h2,
          .page > .content__default h1 + h3, 
          .page > .content__default h1 + h4, 
          .page > .content__default h1 + h5 { margin-top: revert; }
          `
        )
        $css.onload = () => Promise.resolve.bind(Promise)
        console.log($css.onload)

        // if pre tag only
        if (document.querySelector('.page > div > pre:nth-child(1)')) {
          this.isOnlyPre = true
          const $css2 = this.$utils.insertStyles(
            document.querySelector('body'),
            `.page > div > pre { margin: 0 !important }
             .page, .content__default { padding: 0 !important }
            `
          )
          $css2.onload = Promise.resolve.bind(Promise)
          console.log($css.onload)
          Promise.all([$css.onload, $css2.onload]).then(() => {
            this.height = document.body.scrollHeight
          }).catch(err => {
            throw new Error('style load failed,', err.message)
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.frame {
  width: 100%;
  max-height: 68vh;
  box-shadow: 0 0 0 15px rgba(0,0,0,.3);
}
#frame-tip {
  display: none;
}
</style>