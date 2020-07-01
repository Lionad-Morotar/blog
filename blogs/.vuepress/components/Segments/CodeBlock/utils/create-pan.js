import PanResizer from '../PanResizer.vue'
import createEditor from './create-editor'
import panPosition from './pan-position'
import Get from './get-parent-attrs'

import utils from '../../../utils'

async function loadCodeMirror() {
    await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/lib/codemirror.min.js')
    await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5.54.0/addon/selection/active-line.min.js')
    // ! 出现了 indent 报错，暂时去掉语言 mode
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/mode/jsx/jsx.min.js')
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/mode/css/css.min.js')
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/mode/htmlmixed/htmlmixed.min.js')
}

export default ({ name, editor, components } = {}) => {
    return {
        name: `${name}-pan`,
        data() {
            return {
                style: {}
            }
        },
        computed: {
            enableResizer() {
                return true
            },
            isActivePan() {
                return Get(this).$store.activePan === name
            },
            code() {
                return Get(this).$store.code[name]
            }
        },
        watch: {
            isVisible() {
                this.editor.refresh()
            }
        },
        async mounted() {
            await loadCodeMirror()

            this.editor = createEditor(this.$refs.editor, {
                ...editor
            })
            this.editor.on('change', e => {
                Get(this).$store.code[name].code = e.getValue()
            })
            this.editor.on('focus', () => {
                if (this.activePan !== name && Get(this).$store.visiblePans.indexOf(name) > -1) {
                    this.setActivePan()
                }
            })
            this.style = panPosition(Get(this).$store.visiblePans, name)
            Get(this).$store.$on('visiblePans-change', val => {
                this.style = panPosition(val, name)
            })
            Get(this).$store.$on('focus-editor', () => {
                this.editor.focus()
            })
            Get(this).$store.$on([`refresh-${name}-editor`, 'refresh-all'], () => {
                this.editor.setValue(Get(this).$store.code[name].code)
                this.editor.refresh()
            })
            Get(this).$store.$on(`set-${name}-pan-style`, style => {
                this.style = {
                    ...this.style,
                    ...style
                }
            })
        },
        methods: {
            setActivePan() {
                Get(this).$store.activePan = name
            }
        },
        components: {
            PanResizer,
            ...components
        }
    }
}
