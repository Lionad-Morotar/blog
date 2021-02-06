<template>
    <WHRatio h=".62">
        <ClientOnly>
            <vue-p5 @setup="setup" @draw="draw" />
        </ClientOnly>
    </WHRatio>
</template>

<script>
function getCopy(vals) {
    return vals instanceof Array ? vals.map(val => getCopy(val)) : vals
}

export default {
    data: () => ({
        canvasWidth: 0,
        canvasHeight: 0,
        padding: 30,
        count: 30,
        container: [],
        color: '100, 100, 100',
        xoff: 0
    }),
    mounted() {
        this.canvasWidth = document.querySelector('h1').offsetWidth
        this.canvasHeight = this.canvasWidth * 0.62
    },
    methods: {
        setup(ctx) {
            ctx.createCanvas(this.canvasWidth, this.canvasHeight)

            Array(this.count)
                .fill('')
                .map((t, i) => {
                    const x = Math.floor(
                        ctx.random(this.canvasWidth - this.padding) +
                            this.padding
                    )
                    const y = Math.floor(
                        ctx.random(this.canvasHeight - this.padding) +
                            this.padding
                    )
                    this.container.push([x, y])
                })
        },
        draw(ctx) {
            ctx.clear()
            ctx.background(233)

            const shouldOffset = this.container

            this.container.map((dot, i) => {
                // if (shouldOffset.includes(i)) {
                this.xoff += 0.005
                const rand = ctx.noise(5, 5, this.xoff)
                const offset = 0
                // const directionX = ctx.noise(1, 1, this.xoff) < 0.5 ? 1 : -1
                // const directionY = ctx.noise(1, 1, this.xoff) < 0.5 ? 1 : -1
                // dot[0] += offset * directionX
                // dot[1] += offset * directionY
                dot[0] += offset
                dot[1] += offset
                // }
            })

            this.container.map(dot => {
                this.container.map(dotTo => {
                    let opacity =
                        Math.sqrt(
                            Math.pow(dot[0] - dotTo[0], 2),
                            Math.pow(dot[1] - dotTo[1], 2)
                        ) / this.canvasWidth
                    opacity = 1 - opacity * opacity
                    const color = `rgba(${this.color}, ${opacity})`

                    ctx.stroke(color)
                    ctx.strokeWeight(opacity * 0.2)
                    ctx.line(...dot, ...dotTo)
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