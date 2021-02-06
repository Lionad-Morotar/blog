<template>
    <WHRatio h="400px">
        <ClientOnly>
            <vue-p5 @setup="setup" />
        </ClientOnly>
    </WHRatio>
</template>

<script>
function getCopy(vals) {
    return vals instanceof Array ? vals.map(val => getCopy(val)) : vals
}
function sleep(time = 17) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve()
        }, time)
    )
}

export default {
    data: () => ({
        canvasWidth: 0,
        canvasHeight: 0,
        halfW: 50,
        height: 40,
        container: []
    }),
    mounted() {
        this.canvasWidth = document.querySelector('h1').offsetWidth
        this.canvasHeight = 400
    },
    methods: {
        setup(ctx) {
            ctx.createCanvas(this.canvasWidth, this.canvasHeight)
            ctx.background(233)
            ctx.strokeWeight(0)

            // calc white
            this.stepTo({
                ctx,
                dots: [[0, this.halfW]],
                cb: (dots, idx) => {
                    const lines = Array(this.height).fill(1)
                    const whiteCount = ctx.random((idx + 1) / 1.3)
                    Array(Math.floor(whiteCount))
                        .fill('')
                        .map(item => {
                            const whiteIdx = Math.floor(ctx.random(this.height))
                            lines[whiteIdx] = 0
                        })
                    this.container.push(lines)
                }
            })
            this.stepTo({
                ctx,
                dots: [[0, this.halfW]],
                cb: (dots, idx) => {
                    const lines = Array(this.height).fill(1)
                    const whiteCount = ctx.random((this.halfW - idx + 1) / 1.3)
                    Array(Math.floor(whiteCount))
                        .fill('')
                        .map(item => {
                            const whiteIdx = Math.floor(ctx.random(this.height))
                            lines[whiteIdx] = 0
                        })
                    this.container.push(lines)
                }
            })

            Array(this.height)
                .fill('')
                .map((row, ridx) => {
                    Array(this.halfW * 2)
                        .fill('')
                        .map((col, cidx) => {
                            ctx.fill(
                                this.container[cidx][ridx] ? 'black' : 'white'
                            )
                            ctx.rect(cidx * 10, ridx * 10, 10)
                        })
                })
        },
        stepTo({ ctx, dots, cb, step = this.step || 1, safeCount = 5000 }) {
            // console.log('dots : ', dots)
            const dotsStore = []
            dots.map(([dot, dotTo]) => {
                const dotCopy = getCopy(dot)
                const dotToCopy = getCopy(dotTo)
                dotsStore.push([dotCopy, dotToCopy])
            })
            let isDone = false
            let idx = 0

            while (!isDone && idx < safeCount) {
                // callback
                cb(getCopy(dotsStore), idx)

                // step add
                dotsStore.map(([dot, dotTo], idx) => {
                    // console.log('// step add : ', dot, dotTo)

                    if (dot instanceof Array) {
                        const dotXOffset = dotTo[0] - dot[0]
                        dotXOffset &&
                            (dot[0] += step * (dotXOffset > 0 ? 1 : -1))
                        const dotYOffset = dotTo[1] - dot[1]
                        dotYOffset &&
                            (dot[1] += step * (dotYOffset > 0 ? 1 : -1))
                    } else {
                        const dotOffset = dotTo - dot
                        dotOffset &&
                            (dotsStore[idx][0] +=
                                step * (dotOffset > 0 ? 1 : -1))
                    }
                })

                // should stop while or not
                isDone =
                    dotsStore.filter(([dot, dotTo]) => {
                        return dot instanceof Array
                            ? Math.abs(dotTo[0] - dot[0]) <= step / 2 &&
                                  Math.abs(dotTo[1] - dot[1]) <= step / 2
                            : Math.abs(dot - dotTo) <= step / 2
                    }).length === dotsStore.length

                // iteration safe idxs
                idx += 1
            }
        }
    }
}
</script>