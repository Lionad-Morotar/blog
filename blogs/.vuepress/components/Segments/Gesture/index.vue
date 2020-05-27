<template>
    <div ref="gesture">
        <slot />
    </div>
</template>
<script>
const listenName = {
    touchstart: 'onMouseDown',
    mousedown: 'onMouseDown',
    touchend: 'onMouseUp',
    mouseup: 'onMouseUp',
    touchmove: 'onMouseMove',
    mousemove: 'onMouseMove',
    touchcancel: 'onMouseUp',
    wheel: 'onMouseWheel',
    mousewheel: 'onMouseWheel'
}
const mouseWheelEventName = []
const gestures = [
    'tap',
    'longtap',
    'doubletap',
    'swipe',
    'swipeLeft',
    'swipeRight',
    'swipeUp',
    'swipeDown',
    'swipeTopLeft',
    'swipeTopRight',
    'swipeDownLeft',
    'swipeDownRight'
    // 'rotate'
]
export default {
    name: 'gesture-cmpt',
    props: {
        ...gestures.reduce((h, c) => ((h[c] = Function), h), {}),
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
        freezeTime: {
            type: [Number, String],
            default: 1000 / 30
        }
    },
    data() {
        return {
            touchstartTime: 0,
            touchendTime: 0,
            touchstartCoord: {},
            touchendCoord: {},
            wheelOffset: 0,
            // toucheds: [],
            lastTouchendTime: 0,
            lastTouchstartTime: 0,
            lastTouchstartCoord: {},
            lastTouchendCoord: {},
            lastWheelOffset: 0,
            shouldInit: null,
            isMobile: null,
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
        }
    },
    mounted() {
        this.isMobile = this.checkMobile()
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
        onMouseDown(e) {
            this.recordDown(e)
            // this.triggerMove()

            e.preventDefault()
            e.stopPropagation()
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
            this.recordMove(e)

            e.preventDefault()
            e.stopPropagation()
        },
        recordMove(e) {
            const touch = e
            this.lastTouchstartCoord = this.touchstartCoord
            this.touchstartCoord = {
                pageX: touch.pageX,
                pageY: touch.pageY
            }
        },

        onMouseWheel(e) {
            this.lastWheelOffset = this.wheelOffset

            const offset = e.wheelDelta && e.deltaY ? e.wheelDelta * -1 : event.deltaY
            this.wheelOffset = offset

            this.calcGestures()

            e.preventDefault()
            e.stopPropagation()
        },

        onMouseUp(e) {
            this.recordUp(e)
            this.calcGestures()
            // this.unTriggerMove()

            e.preventDefault()
            e.stopPropagation()
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
            this.touchstartTime = 0
            this.touchendTime = 0
            this.touchstartCoord = {}
            this.touchendCoord = {}
            this.wheelOffset = 0
            this.lastTouchendTime = 0
            this.lastTouchstartTime = 0
            this.lastTouchstartCoord = {}
            this.lastTouchendCoord = {}
            this.lastWheelOffset = 0
        },

        /** Once */

        // 计算需要监听的方法
        calcEventsName() {
            const listens = [
                ...(this.isMobile
                    ? ['touchstart', 'touchend', 'touchcancel']
                    : this.enableMouse
                    ? ['mousedown', 'mouseup']
                    : []),
                ...(this.enableMouseWheel ? ['onwheel' in document ? 'wheel' : 'mousewheel'] : [])
            ]
            const moves = [...(this.isMobile ? ['touchmove'] : []), ...(this.enableMouse ? ['mousemove'] : [])]
            this.events = {
                listens,
                moves
            }
            // console.log(this.events)
        },

        /** Utils */

        // 根据 UserAgent 判断是否是手机端
        checkMobile() {
            var mobileUAs = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod']
            return !!mobileUAs.find(mobileUA => navigator.userAgent.indexOf(mobileUA) !== -1)
        }
    }
}
</script>
