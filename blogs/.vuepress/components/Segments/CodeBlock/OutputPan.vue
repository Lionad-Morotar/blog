<template>
    <div class="output-pan" :class="{ 'active-pan': isActivePan }" @click="setActivePan('output')" :style="style">
        <div class="pan-head">
            Output
        </div>
        <div class="output-iframe" id="output-iframe">
            <div ref="output-iframe-holder"></div>
        </div>
    </div>
</template>

<script>
import Get from './utils/get-parent-attrs'
import createIframe from './utils/iframe'
import panPosition from './utils/pan-position'
import proxyConsoleFn from '!!raw-loader!./utils/proxy-console'

const sandboxAttributes = [
    'allow-modals',
    'allow-forms',
    'allow-pointer-lock',
    'allow-popups',
    'allow-same-origin',
    'allow-scripts'
]

const createElement = tag => (content = '', attrs = {}) => {
    attrs = Object.keys(attrs)
        .map(key => `${key}="${attrs[key]}"`)
        .join(' ')
    return `<${tag} ${attrs}>${content}</${tag}>`
}

export default {
    name: 'output-pan',
    data() {
        return {
            iframeID: null,
            proxyConsoleFn: null,
            style: {}
        }
    },
    computed: {
        isActivePan() {
            return Get(this).$store.activePan === 'output'
        }
    },
    mounted() {
        this.iframe = createIframe({
            el: this.$refs['output-iframe-holder'],
            sandboxAttributes
        })

        this.style = panPosition(Get(this).$store.visiblePans, 'output')
        Get(this).$store.$on('visiblePans-change', val => {
            this.style = panPosition(val, 'output')
        })
        Get(this).$store.$on('run', () => this.run())
        Get(this).$store.$on(`set-output-pan-style`, style => {
            this.style = {
                ...this.style,
                ...style
            }
        })
        this.iframeID = `iframe-${this._uid}-${String(Math.random()).slice(-6)}`
        this.proxyConsoleFn = proxyConsoleFn.replace(/\/\* FLAG-MESSAGE-ID \*\//g, `id: '${this.iframeID}',`)
        window.addEventListener('message', this.listenMessage)
    },
    beforeDestroy() {
        window.removeEventListener('message', this.listenMessage)
    },
    methods: {
        async listenMessage({ data = {} }) {
            // 保证同一页面多个事件兼听不冲突
            if (data.id === this.iframeID) {
                switch (data.type) {
                    case 'iframe-error':
                        Get(this).$store.logs.push({
                            type: 'error',
                            message: data.message
                        })
                        break
                    case 'console':
                        Get(this).$store.logs.push({
                            type: data.method,
                            message: data.args.map(x => (JSON.stringify ? JSON.stringify(x) : x)).join(' ')
                        })
                        break
                }
            }
        },
        async run() {
            const headStyle = createElement('style')(Get(this).$store.code.css.code)
            const proxyConsole = createElement('script')(this.proxyConsoleFn)
            const script = createElement('script')(Get(this).$store.code.js.code)
            const html = Get(this).$store.code.html.code

            Get(this).$store.logs.splice(0, Get(this).$store.logs.length)
            this.iframe.setHTML({
                head: headStyle + proxyConsole,
                body: html + script
            })
        },
        setActivePan(panName) {
            Get(this).$store.activePan = panName
        }
    }
}
</script>

<style lang="stylus" scoped>
.output-pan
  overflow: hidden

#output-iframe
  position: relative
  width: 100%
  height: calc(100% - 40px)
  overflow: hidden

  &.disable-mouse-events
    pointer-events: none
</style>
