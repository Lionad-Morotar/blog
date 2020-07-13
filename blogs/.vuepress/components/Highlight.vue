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
        cutTab: {
            type: Boolean,
            default: true
        }
    },
    render(h) {
        let data = this.content || (this.$slots.default && this.$slots.default[0].text) || ''
        if (this.trim) {
            data = data.replace(/^[ ]+|[ ]+$/g, '')
        }
        if (this.cutTab) {
            const splits = data.split(/\n/)
            const tabs = splits.map(x => x.search(/[^\s]/))
            const minSpace = Math.min(...tabs)
            const reMinSpace = new RegExp(`\\s{${minSpace}}`)
            data = splits.map(x => x.replace(reMinSpace, '')).join('\n')
        }
        const code = prism.highlight(data, prism.languages[this.lang], this.lang)
        const codeWrap = `<pre v-pre class="language-${this.lang}"><code>${code}</code></pre>`

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