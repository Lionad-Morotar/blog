<template>
    <client-only placeholder="Loading...">
        <div class="editor" :style="style">
            <Header />
            <div class="pans">
                <HTMLPan class="pan" v-show="isVisible('html')" />
                <CSSPan class="pan" v-show="isVisible('css')" />
                <JSPan class="pan" v-show="isVisible('js')" />
                <ConsolePan class="pan" v-show="isVisible('console')" />
                <OutputPan class="pan" v-show="isVisible('output')" />
            </div>
        </div>
    </client-only>
</template>

<script>
import Header from './Header.vue'
import HTMLPan from './HTMLPan.vue'
import CSSPan from './CSSPan.vue'
import JSPan from './JSPan.vue'
import OutputPan from './OutputPan.vue'
import ConsolePan from './ConsolePan.vue'

import Data from './utils/data'
import { isInIframe } from './utils'
import Get from './utils/get-parent-attrs'
import { COMPONENT_NAME } from './utils/get-parent-attrs'

export default {
    name: COMPONENT_NAME,
    components: {
        Header,
        HTMLPan,
        CSSPan,
        JSPan,
        OutputPan,
        ConsolePan
    },
    props: {
        border: {
            default: false
        },
        visiblePans: Array,
        html: String,
        css: String,
        js: String,
        height: {
            default: '100%'
        }
    },
    beforeCreate() {
        this.$store = Data.create()
    },
    data() {
        return {
            style: {
                height: this.height
            }
        }
    },
    mounted() {
        if (isInIframe() || this.border) {
            this.$set(this.style, 'border', this.style.border || 'solid 1px #eee')
            this.$set(this.style, 'border-radius', this.style['border-radius'] || '1px')
        }

        Get(this).$store.visiblePans = this.visiblePans || Get(this).$store.visiblePans
        this.$nextTick(() => {
            Get(this).$store.code.html.code = this.html || ''
            Get(this).$store.code.css.code = this.css || ''
            Get(this).$store.code.js.code = this.js || ''
            Get(this).$store.$emit('refresh-all')
        })
    },
    methods: {
        isVisible(panName) {
            return Get(this).$store.visiblePans.indexOf(panName) !== -1
        }
    }
}
</script>

<style src="./css/codemirror.min.css"></style>

<style lang="stylus">
.editor {
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .editor {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .CodeMirror {
    font-family: 'consolas';
  }
}
</style>

<style lang="stylus" scoped>
.pans {
  height: calc(100% - 40px);
  display: flex;
  position: relative;
}

.pan {
  background-color: var(--light-gray);
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: auto;

  &.active-pan {
    background-color: white;
  }
}
</style>

<style lang="stylus">
.CodeMirror {
  height: calc(100% - 40px);
  background-color: transparent;
}

.CodeMirror-gutters {
  background-color: transparent;
  border-right: none;
}

.pan-head {
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg.svg-icon {
    margin-left: 5px;
    cursor: pointer;
    width: 14px;
    height: @width;
    color: #666;
    outline: none;

    &:hover {
      color: #000;
    }
  }
}

.pans.resizing {
  cursor: ew-resize;

  .pan-resizer {
    cursor: ew-resize;
  }
}

.editor.readonly {
  .CodeMirror-cursor {
    display: none !important;
  }
}

.cf-wrapper {
  height: 40px;
  line-height: 40px !important;
  z-index: 9 !important;
  padding: 0 10px !important;
}

.sponsor {
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 0 10px;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
