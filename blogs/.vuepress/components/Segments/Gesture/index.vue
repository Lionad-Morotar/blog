<template>
    <div ref="gesture">
        <slot />
    </div>
</template>
<script>
const utils = require('../../utils')

const listenName = {
    touchstart: 'onMouseDown',
    mousedown: 'onMouseDown',
    touchend: 'onMouseUp',
    mouseup: 'onMouseUp',
    touchmove: 'onMouseMove',
    mousemove: 'onMouseMove',
    touchcancel: 'onMouseUp',
    wheel: 'onMouseWheel',
    mousewheel: 'onMouseWheel',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave'
}
const mouseWheelEventName = []
const gestures = [
    'hover',
    'hoverOut',
    'tap',
    // 'longtap',
    // 'doubletap',
    // 'swipe',
    // 'swipeLeft',
    // 'swipeRight',
    'swipeUp',
    'swipeDown'
    // 'swipeTopLeft',
    // 'swipeTopRight',
    // 'swipeDownLeft',
    // 'swipeDownRight'
    // 'rotate'
]
export default {
    name: 'gesture-cmpt',
    props: {
        ...gestures.reduce((h, c) => ((h[c] = Function), h), {}),
        hoverTime: {
            type: [Number, String],
            default: 100
        },
        enableMouse: {
            type: Boolean,
            default: true
        },
        enableMouseWheel: {
            type: Boolean,
            default: true
        },
        judgeConfig: {
            type: Object,
            default: () => ({
                // ms
                tapTimeInterval: 300,
                // px
                tapOffsetThresholdSquared: 25,
                swipeOffsetThreshold: 80
            })
        },
        // debounce time interval
        freezeTime: {
            type: [Number, String],
            default: 1000 / 30
        },
        // pass events to outside then do e.preventDefault or e.stopPropagation
        eventInvoke: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            touchstartTime: 0,
            touchendTime: 0,
            touchstartCoord: {},
            touchendCoord: {},
            wheelOffset: 0,
            mouseEnterTime: null,
            mouseLeaveTime: null,
            hoverTick: null,
            // toucheds: [],
            lastTouchendTime: 0,
            lastTouchstartTime: 0,
            lastTouchstartCoord: {},
            lastTouchendCoord: {},
            lastWheelOffset: 0,
            shouldInit: null,
            ele: null,
            events: {
                listens: []
            }
        }
    },
    computed: {
        timeInterval() {
            return this.touchendTime - this.touchstartTime
        },
        pageXOffset() {
            return this.touchendCoord.pageX - this.touchstartCoord.pageX
        },
        pageXOffsetAbs() {
            return Math.abs(this.pageXOffset)
        },
        pageYOffset() {
            return this.touchendCoord.pageY - this.touchstartCoord.pageY
        },
        pageYOffsetAbs() {
            return Math.abs(this.pageYOffset)
        },
        lastTimeInterval() {
            return this.lastTouchendTime - this.lastTouchstartTime
        },
        lastPageXOffset() {
            return this.touchendCoord.pageX - this.touchstartCoord.pageX
        },
        lastPageYOffset() {
            return this.touchendCoord.pageY - this.touchstartCoord.pageY
        },
        deltaTime() {
            return this.touchendTime - this.lastTouchstartTim
        },
        mouseHoverTime() {
            return this.mouseLeaveTime - this.mouseEnterTime
        }
    },
    mounted() {
        this.shouldInit = Object.keys(this.$props).find(x => gestures.includes(x) && this[x])
        if (!this.shouldInit) return

        this.calcEventsName()
        this.ele = this.$refs.gesture

        this.events.listens.map(x => {
            this.ele.addEventListener(x, this[listenName[x]])
        })
    },
    beforeDestroy() {
        if (!this.shouldInit) return

        this.events.listens.map(x => {
            this.ele.removeEventListener(x, this[listenName[x]])
        })
    },
    methods: {
        onMouseEnter(e) {
            if (!this.mouseEnterTime && !this.mouseLeaveTime) {
                this.recordEnter(e)
            }
            this.eventInvoke(e)
        },
        recordEnter(e) {
            this.mouseEnterTime = e.timeStamp
            // 如果 Hover 时间到了，那么直接触发 Hover 事件，不需要再监听 MouseLeave
            this.hoverTick = setTimeout(() => {
                this.recordLeave({
                    timeStamp: +new Date() + Infinity
                })
            }, this.hoverTime)
        },
        onMouseLeave(e) {
            this.recordLeave(e)
        },
        recordLeave(e) {
            if (this.mouseEnterTime && !this.mouseLeaveTime) {
                this.mouseLeaveTime = e.timeStamp
            }
            this.calcGestures()
            this.hoverTick && clearTimeout(this.hoverTick)
        },

        onMouseDown(e) {
            this.onRecordMove(e)
            this.eventInvoke(e)
        },
        onRecordMove(e) {
            this.recordDown(e)
            this.triggerMove()
        },
        recordDown(e) {
            this.lastTouchstartTime = this.touchstartTime
            this.touchstartTime = e.timeStamp
            const touch = e.touches ? e.touches[0] : e
            this.lastTouchstartCoord = this.touchstartCoord
            this.touchstartCoord = {
                pageX: touch.pageX,
                pageY: touch.pageY
            }
        },
        triggerMove() {
            this.events.moves.map(x => {
                this.ele.addEventListener(x, this[listenName[x]])
            })
        },

        onMouseMove(e) {
            this.eventInvoke(e)
        },

        onMouseWheel(e) {
            this.lastWheelOffset = this.wheelOffset

            const offset = e.wheelDelta && e.deltaY ? e.wheelDelta * -1 : event.deltaY
            this.wheelOffset = offset

            this.calcGestures()
            this.eventInvoke(e)
        },

        onMouseUp(e) {
            this.recordUp(e)
            this.calcGestures()
            this.unTriggerMove()
            this.eventInvoke(e)
        },
        recordUp(e) {
            this.lastTouchendTime = this.touchendTime
            this.touchendTime = e.timeStamp
            const touch = e.changedTouches ? e.changedTouches[0] : e
            this.lastTouchendCoord = this.touchendCoord
            this.touchendCoord = {
                pageX: touch.pageX,
                pageY: touch.pageY
            }
        },
        unTriggerMove() {
            this.events.moves.map(x => {
                this.ele.removeEventListener(x, this[listenName[x]])
            })
        },

        // 判断需要触发的函数，已节流
        calcGestures: (function() {
            let lastTriggerTime = 0

            return function() {
                const dateNow = +Date.now()
                if (dateNow - lastTriggerTime < +this.freezeTime) return

                lastTriggerTime = dateNow

                const { tapTimeInterval, tapOffsetThresholdSquared, swipeOffsetThreshold } = this.judgeConfig
                const judgement = {
                    hover: () => this.mouseHoverTime >= +this.hoverTime,
                    hoverOut: () => true,
                    tap: () => this.timeInterval < tapTimeInterval && this.pageXOffset ** 2 < tapOffsetThresholdSquared,
                    swipeUp: () => {
                        const calcMouse =
                            this.timeInterval < tapTimeInterval &&
                            this.pageYOffsetAbs > this.pageXOffsetAbs &&
                            this.pageYOffset > swipeOffsetThreshold
                        const calcMouseWheel = this.enableMouse && this.wheelOffset < 0
                        return calcMouse || calcMouseWheel
                    },
                    swipeDown: () => {
                        const calcMouse =
                            this.timeInterval < tapTimeInterval &&
                            this.pageYOffsetAbs > this.pageXOffsetAbs &&
                            this.pageYOffset < swipeOffsetThreshold
                        const calcMouseWheel = this.enableMouse && this.wheelOffset > 0
                        return calcMouse || calcMouseWheel
                    }
                }
                const runTask = gestures.find(x => {
                    const canRelease = this[x] && judgement[x] && judgement[x]()
                    const release = () => this[x]()

                    return canRelease && release
                })
                runTask && this[runTask]()

                this.reset()
            }
        })(),

        reset() {
            this.touchstartTime = null
            this.touchendTime = null
            this.touchstartCoord = {}
            this.touchendCoord = {}
            this.wheelOffset = 0
            this.mouseEnterTime = null
            this.mouseLeaveTime = null
            this.lastTouchendTime = null
            this.lastTouchstartTime = null
            this.lastTouchstartCoord = {}
            this.lastTouchendCoord = {}
            this.lastWheelOffset = 0
        },

        /** Once */

        // 计算需要监听的方法
        calcEventsName() {
            const listens = [
                ...(utils.isMobile
                    ? ['touchstart', 'touchend', 'touchcancel']
                    : this.enableMouse
                    ? ['mousedown', 'mouseup', 'mouseenter', 'mouseleave']
                    : []),
                ...(this.enableMouseWheel ? ['onwheel' in document ? 'wheel' : 'mousewheel'] : [])
            ]
            const moves = [...(utils.isMobile ? ['touchmove'] : []), ...(this.enableMouse ? ['mousemove'] : [])]
            this.events = {
                // 直接监听类事件
                listens,
                // 特殊监听事件会触发监听鼠标移动事件（如 MouseDown 时，会开始记录鼠标位移）
                moves
            }
        }
    }
}
</script>
