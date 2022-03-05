<template>
    <fragment>
        <template v-if="!type">
            <a :id="slotContent" :href="to" rel="noopener noreferrer" target="_blank" @click.prevent.stop="showpage"><slot/></a>
        </template>
        <template v-if="type==='blockquote'">
            <blockquote>
                <p>
                    <a :id="slotContent" :href="to" rel="noopener noreferrer" target="_blank" @click.prevent.stop="showpage"><slot/></a>
                </p>
            </blockquote>
        </template>
        <template v-if="type==='h5'">
            <h5 style="display: content">
                <a :id="slotContent" :href="to" rel="noopener noreferrer" target="_blank" @click.prevent.stop="showpage"><slot/></a>
            </h5>
        </template>
    </fragment>
</template>

<script>

// 获取文件大小
const getOSSFilesize = async url => {
    // const url = `https://mgear-file.oss-cn-shanghai.aliyuncs.com/Image%20Scrubber.html`
    const filename = url.match(/[^\\\/]*$/)[0]
    const filesize = await fetch(`http://faas.lionad.art/getmeta?name=${filename}`)
        .then(res => res.text())
        .then(res => +res)
    return filesize
}

// 获取HTML源码
const getHTML = async url => {

    // HTML 源码清洗，仅保留 HTML 和 CSS
    const secureHTML = html => html
        .replace(/<!--[^-]*-->/gim, '')
        .replace(/<script[^>]*>/gim, ' <!-- ')
        .replace(/<\/script[\s]*>/gim, ' --> ')
        .replace(/<!--[^-]*-->/gim, '')
        .replace(/(<a\s+[^>]*)href=/gim, '$1')

    return await fetch(url)
        .then(res => res.text())
        .then(res => secureHTML(res))
}

// MAIN
const frameClassname = 'linkpage fullscreen'
const frameClassnameWithDot = '.linkpage'
export default {
    name: 'Link',
    props: {
        type: {
            type: String,
            default: ''
        },
        to: {
            type: String,
            default: ''
        },
        source: {
            type: String,
            default: ''
        }
    },
    // TODO GZIP to reduce filesize
    // TODO auto sourceURL
    data () {
        return {
            loading: false,
            slotContent: ''
        }
    },
    created () {
        const nameNode = this.$slots.default && this.$slots.default[0]
        const safe = text => text.toLowerCase().replace(/\s+/g, '-')
        if (nameNode) {
            this.slotContent = safe(nameNode.text || '')
        }
    },
    methods: {
        async showpage () {
            if (this.to) {
                this.loading = true
                try {
                    const threshold = 100 * 1000
                    const filesize = await getOSSFilesize(this.to)
                    if (filesize < threshold) {
                        await this.display()
                    } else if (this.source) {
                        window.open(this.source)
                    } else {
                        alert('资源体积过大，暂时不予展示，敬请谅解')
                    }
                } finally {
                    this.loading = false
                }
            } else {
                window.open(this.source)
            }
        },
        async display () {
            const html = await getHTML(this.to)
            const $iframe = document.createElement('iframe')
            $iframe.setAttribute('frameborder', '0')
            $iframe.setAttribute('class', frameClassname)
            $iframe.setAttribute('srcdoc', html)
            $iframe.setAttribute('style', 'width: 100vw; height: 100vh; z-index: 999')

            document.body.append($iframe)
            const container = document.querySelector(frameClassnameWithDot)
            const innerDoc = container.shadowRoot || container.document || container

            const listener = ({ keyCode }) => {
                if (keyCode === 27) {
                    $iframe && $iframe.remove()
                }
            }
            document.addEventListener('keydown', listener)
            innerDoc && innerDoc.addEventListener('keydown', listener)

            const clean = () => {
                $iframe && $iframe.remove()
                listener && (
                    document.removeEventListener('keydown', listener),
                    innerDoc && innerDoc.addEventListener('keydown', listener)
                )
            }
            this.$nextTick(() => this.disableInnerLink)
            this.$once('hook:beforeDestroy', clean)
        },
        disableInnerLink () {
            try {
                const container = document.querySelector(frameClassnameWithDot)
                const innerDoc = container.shadowRoot || container.document || container
                const alinks = innerDoc ? [...innerDoc.querySelectorAll('a')] : []
                alinks.map(a => a.removeAttribute('href'))
            } catch (e) {
                throw e
            }
        }
    },
}
</script>
