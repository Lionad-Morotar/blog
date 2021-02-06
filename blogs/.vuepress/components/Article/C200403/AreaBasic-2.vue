<template>
    <WHRatio :w="this.canvasWidth + 'px'" :h="this.canvasHeight + 'px'">
        <ClientOnly>
            <vue-p5 @setup="setup" />
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
        count: 15,
        container: [],
        color: '22, 65, 196'
    }),
    mounted() {
        this.canvasWidth = document.querySelector('h1').offsetWidth
        this.canvasHeight =
            this.canvasWidth < 400
                ? this.canvasWidth
                : this.padding * 2 + (this.count - 1) * 5 + this.count * 20
    },
    methods: {
        setup(ctx) {
            ctx.createCanvas(this.canvasWidth, this.canvasHeight)
            ctx.background(233)
            ctx.strokeWeight(0)

            this.container = Array(this.count)
                .fill('')
                .map(item =>
                    Array(this.count)
                        .fill('')
                        .map(item => 20)
                )

            ctx.fill(`blue`)
            Array(20)
                .fill('')
                .map((t, width) => {
                    Array(width)
                        .fill('')
                        .map((t, j) => {
                            const x = Math.floor(ctx.random(this.count))
                            const y = Math.floor(ctx.random(this.count))
                            this.container[x][y] = width
                        })
                })

            Array(this.count)
                .fill()
                .map((t, row) => {
                    Array(this.count)
                        .fill()
                        .map((t, col) => {
                            const width = this.container[row][col]
                            let opacity = width / 20
                            opacity = opacity < 0.3 ? 0.3 : opacity
                            const color = `rgba(${this.color}, ${opacity})`

                            const xOffset = (20 - width) / 2
                            const yOffset =
                                ctx.random((20 - width) / 4) *
                                (ctx.random(1) < 0.5 ? 1 : -1)

                            ctx.fill(color)
                            // ctx.rect(
                            //     this.padding +
                            //         (col - 1) * 5 +
                            //         col * 20 +
                            //         xOffset,
                            //     this.padding + (row - 1) * 5 + row * 20,
                            //     width,
                            //     20
                            // )
                            const x1 =
                                this.padding +
                                (col - 1) * 5 +
                                col * 20 +
                                xOffset
                            const y1 =
                                this.padding +
                                (row - 1) * 5 +
                                row * 20 +
                                yOffset
                            const x2 = x1 + width
                            const y2 = y1 - yOffset
                            const x3 = x2
                            const y3 = y2 + 20
                            const x4 = x1
                            const y4 = y1 + 20
                            ctx.quad(x1, y1, x2, y2, x3, y3, x4, y4)
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