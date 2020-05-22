<template>
    <div class="console-pan" :class="{ 'active-pan': isActivePan }" @click="setActivePan('console')" :style="style">
        <div class="pan-head">
            Console
        </div>
        <div class="console-logs" ref="console">
            <div
                class="console-log"
                v-for="(log, idx) in logs"
                :key="idx + log.message"
                :class="log.type"
                v-html="log.message"
            ></div>
        </div>
        <PanResizer pan="console" :enable="enableResizer" />
    </div>
</template>

<script>
import panPosition from './utils/pan-position'
import PanResizer from './PanResizer.vue'
import Get from './utils/get-parent-attrs'

export default {
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
            return Get(this).$store.activePan === 'console'
        },
        logs() {
            return Get(this).$store.logs
        }
    },
    mounted() {
        Get(this).$store.$on('visiblePans-change', val => {
            this.style = panPosition(val, 'console')
        })
        this.style = panPosition(Get(this).$store.visiblePans, 'console')
        Get(this).$store.$on(`set-console-pan-style`, style => {
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
        PanResizer
    }
}
</script>

<style lang="stylus" scoped>
.console-logs
  height: calc(100% - 40px)
  overflow: auto

.console-log
  white-space: pre
  font-size: 13px
  padding: 10px
  border-bottom: 1px solid #eee
  background: #fefefe

  &:first-child
    border-top: 1px solid #eee

  &.warn
    background: #FEFED4
  &.error
    background: #FED4D4

.console-log-error
  color: red
</style>
