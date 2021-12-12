<template>
    <span class="spark-cmpt" :class="classname || ''">
        <SparkInstance
            v-for="sparkle in sparkles"
            :key="sparkle.id"
            :color="sparkle.color"
            :size="sparkle.size"
            :styles="sparkle.style"
        />
        <span class="children-wrapper">
            <slot />
        </span>
    </span>
</template>

<script>
import SparkInstance from './sparkInstance'

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

// 颜色配置
const colors = {
    default: '#FFE55D',
    multy: [
        '#FFE55D',
        '#F5FC5C',
        '#AFEC56',
        '#51DF72',
        '#51B2DF',
        '#517BDF',
        '#517CDF',
        '#7651DF',
        '#C651DF',
        '#EA5595',
        '#FF695D',
        '#FFA45D',
        '#FFC45D'
    ]
}

// 随机生成 Sparkle 实例信息
const genSparkle = (color = colors.default) => {
    return {
        id: String(random(10000, 99999)) + '-' + +Date.now(),
        color: color instanceof Array ? color[random(0, color.length)] : color,
        size: random(10, 25),
        style: {
            top: random(0, 100) + '%',
            left: random(0, 100) + '%',
            zIndex: 2
        }
    }
}

export default {
    name: 'spark-cmpt',
    props: {
        // 星星的颜色，默认为黄色，可以传入颜色值或者 colors 对象内的键名，也支持直接传入数组
        color: {
            type: [String, Array],
            default: 'default'
        },
        // 最小生成延迟（当最小生成延迟===最大生成延迟时，星星会一个接一个的生成，相当于 setTimeout）
        minDelay: {
            type: [Number, String],
            default: 60
        },
        // 最大生成延迟
        maxDelay: {
            type: [Number, String],
            default: 600
        },
        // // 持续闪烁多久，默认
        last: {
            type: [Number, String],
            default: Infinity
        },
        // // 触发方式
        type: {
            type: [String, Function],
            default: 'default'
        },
        // 自定义 Class 名称
        classname: String
    },
    components: {
        SparkInstance
    },
    data() {
        return {
            sparkles: [],
            task: null
        }
    },
    mounted() {
        this.task = this.triggerSpark()
    },
    beforeDestroy() {
        this.task && this.task.stop()
    },
    methods: {
        triggerSpark(minDelay = +this.minDelay, maxDelay = +this.maxDelay) {
            stop = false
            const task = {
                stop: () => (stop = true),
                run: () => {
                    window.setTimeout(() => {
                        const newSpark = genSparkle(
                            this.color instanceof Array ? this.color : colors[this.color] || this.color
                        )
                        this.sparkles.push(newSpark)
                        window.setTimeout(() => {
                            this.sparkles.splice(
                                this.sparkles.find(x => x === newSpark),
                                1
                            )
                        }, 1000)
                        task.run()
                    }, random(minDelay, maxDelay))
                }
            }
            task.run()
            return task
        }
    }
}
</script>

<style lang="stylus" scoped>
.children-wrapper {
    position: relative;
    z-index: 1;
    font-weight: bold;
}
.spark-cmpt {
    position: relative;
    &.callout {
        display: block;
        margin-top: 1em;
        margin-bottom: 1em;
        text-align: center;
        font-size: 2em;
        font-weight: bold;
    }
}
</style>
