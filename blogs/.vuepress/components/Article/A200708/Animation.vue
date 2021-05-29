<template>
    <div class="rotate-image-cmpt in-article-block-cmpt">
        <div class="circle-con">
            <div class="circle" :style="{ transform: `rotate(${rotateDeg}deg)` }">Rotate</div>
        </div>
        <div class="mt2em flex-sa">
            <template v-for="item in types">
                <button @click="() => changeType(item)">{{item}}</button>
            </template>
        </div>
    </div>
</template>

<script>
// FILE NO USE
import utils from '../../utils'

export default {
    name: 'rotate-image-cmpt',
    data() {
        return {
            types: ['Linear', 'EaseIn', 'EaseOut', 'EaseOutElastic'],
            type: '',
            rotateDeg: 0,
            animation: null
        }
    },
    mounted() {
        this.changeType('easeout')
    },
    methods: {
        rotate() {
            const type = this.type
            const from = 0
            const to = 720
            const run = utils.tween[type]
            const totalTime = 1200
            let curTime = 0
            let tick = +new Date()
            const safe = num => (num > to ? to : num)
            const step = () => {
                const newTick = +new Date()
                curTime += newTick - tick
                tick = newTick
                const targetDeg = run(curTime, from, to, totalTime)
                const continueStep = curTime < totalTime
                const nv = continueStep ? targetDeg : safe(targetDeg)
                this.rotateDeg = nv

                if (continueStep) {
                    this.animation = utils.requestAnimationFrame(step)
                } else {
                    this.animation = setTimeout(() => {
                        this.rotate()
                    }, 700)
                }
            }
            this.animation && (utils.cancelAnimationFrame(this.animation), clearTimeout(this.animation))
            this.animation = utils.requestAnimationFrame(step)
        },
        changeType(typeName) {
            this.type = typeName.toLowerCase()
            if (this.type) this.rotate()
        }
    }
}
</script>

<style lang="stylus">
.rotate-image-cmpt {
    .circle-con,
    .btns-con {
        display: flex;
        justify-content: center;
        align-items: center;

        .circle {
            width: 250px;
            height: 250px;
            line-height: 250px;
            text-align: center;
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            font-size: 3rem;
            font-family: sans-serif;
            font-weight: bold;
            user-select: none;

            &::before {
                content: '';
                position: absolute;
                height: 100%;
                width: 96%;
                border-radius: 50%;
                left: 2%;
                top: 0;
                background: white;
                z-index: -1;
            }
        }
    }
}
</style>
