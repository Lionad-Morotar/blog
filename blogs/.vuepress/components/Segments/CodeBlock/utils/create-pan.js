import PanResizer from '../PanResizer.vue'
import createEditor from './create-editor'
import panPosition from './pan-position'
import Get from './get-parent-attrs'

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
        mounted() {
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
