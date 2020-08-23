<script>
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: 'js'
    },
    trim: {
      type: Boolean,
      default: true
    },
    deindent: {
      type: Boolean,
      default: true
    },
    run: {
      type: Boolean,
      default: false
    }
  },
  render(h) {
    let data = this.content || (this.$slots.default && this.$slots.default[0].text) || ''
    if (this.trim) {
      data = this.content
        ? data.replace(/^[ ]+|[ ]+$/g, '')
        : data.slice(data.search(/[^\n]/), data.search(/[^\n\s]\n\s*$/) + 1)
    }
    if (this.deindent) {
      const splits = data.split(/\r?\n/)
      const tabs = splits.map(x => x.search(/[^\s]/))
      const minSpace = Math.min(...tabs)
      data = splits.map(x => x.slice(minSpace)).join('\n')
    }
    const code = prism.highlight(data, prism.languages[this.lang], this.lang)
    const codeWrap = `<pre v-pre class="language-${this.lang}"><code>${code}</code></pre>`

    this.run && (1, eval)(data)

    return h('div', {
      props: {
        'v-pre': 'v-pre'
      },
      domProps: {
        className: `language-${this.lang} extra-class`,
        innerHTML: codeWrap
      }
    })
  }
}
</script>
