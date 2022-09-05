<script>
const { TeX } = require('mathjax3/mathjax3/input/tex')
const { SVG } = require('mathjax3/mathjax3/output/svg')
const { HTMLDocument } = require('mathjax3/mathjax3/handlers/html/HTMLDocument')
const { liteAdaptor } = require('mathjax3/mathjax3/adaptors/liteAdaptor')
const { LiteDocument } = require('mathjax3/mathjax3/adaptors/lite/Document')

const escapedCharacters = '^$()[]{}*.?+\\|'

function toEscapedString(source) {
    const chars = source.split('').map((char) => {
        return escapedCharacters.includes(char) ? '\\' + char : char
    })
    const lastChar = chars[chars.length - 1]
    if (lastChar.match(/\w/)) chars.push('\\b')
    return chars.join('')
}

export default {
    render(h) {
        let data = (this.$slots.default && this.$slots.default[0].text) || ''
        let symbol = data[0] === '$' ? '$' : ''
        symbol && (symbol += data[1] === '$' ? '$' : '')
        const symbolLen = symbol.length

        // 是否需要换行显示
        const wrapLine = symbolLen === 2

        if (symbol) {
            const isValid = data.slice(0, symbolLen) === data.slice(-symbolLen)
            if (isValid) {
                data = data.slice(symbolLen, -symbolLen)
            } else {
                return h(wrapLine ? 'div' : 'span', { style: 'color: red' }, `Error : ${data}`)
            }
        }

        const {
            em = 16,
            ex = 8,
            width = 80 * 16,
            target = 'chtml',
            macros = {
                '*': '\\times',
            },
        } = {
            /* TODO Props & Import from ConfigJS */
        }

        /** @see vuepress-plugin-mathjax */

        const macroRegex = new RegExp(Object.keys(macros).map(toEscapedString).join('|'), 'g')

        const InputJax = new TeX()
        const OutputJax = new SVG()
        const adaptor = liteAdaptor()
        const html = new HTMLDocument(new LiteDocument(), adaptor, {
            InputJax,
            OutputJax,
        })

        let style = adaptor.textContent(OutputJax.styleSheet(html)).replace(/\bwhite space\b/g, 'white-space')

        const source = data.replace(macroRegex, (matched) => macros[matched] + ' ')

        const math = new html.options.MathItem(source, InputJax, wrapLine)

        math.setMetrics(em, ex, width, 100000, 1)
        math.compile(html)
        math.typeset(html)
        const output = adaptor.outerHTML(math.typesetRoot)

        return h('mjx-container', {
            props: {
                'v-pre': 'v-pre',
            },
            domProps: {
                className: 'MathJax',
                jax: 'CHTML',
                innerHTML: String(output).replace(/^\<mjx-container[^>]*\>(.*)\<\/mjx-container\>$/, '$1'),
            },
        })
    },
}
</script>