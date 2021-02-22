<template>
    <WHRatio>
        <ClientOnly>
            <vue-p5 @setup="setup" />
        </ClientOnly>
    </WHRatio>
</template>

<script>
export default {
    data: () => ({
        width: 0,
        height: 0,
        step: 30,
        w: 10,
        colors: [
            '#264875',
            '#2E222E',
            '#953924',
            '#BB6125',
            '#C6B503',
            '#386A2D'
        ]
    }),
    mounted() {
        this.width = document.querySelector('h1').offsetWidth
        this.height = this.width
    },
    methods: {
        setup(ctx) {
            ctx.createCanvas(this.width, this.height)
            ctx.background(233)
            ctx.strokeWeight(0)

            const drawCross = (x, y) => {
                ctx.rect(x, y, this.w)
                ctx.rect(x, y + this.w, this.w)
                ctx.rect(x, y + this.w * 2, this.w)
                ctx.rect(x - this.w, y + this.w, this.w)
                ctx.rect(x + this.w, y + this.w, this.w)
            }

            const w = this.width
            const ow = this.width * Math.sqrt(2)
            this.stepTo({
                ctx,
                step: 10,
                dots: [
                    [
                        [-1 * ow, 0.5 * w],
                        [0.5 * w, -1 * ow]
                    ],
                    [
                        [0.5 * w, w + 1 * ow],
                        [w + 1 * ow, 0.5 * w]
                    ]
                ],
                cb: (dots, idx) => {
                    if (1 || idx === 1) {
                        // console.log(...dots[0], ...dots[1], [
                        //     dots[0][0],
                        //     dots[1][0]
                        // ])
                        const offset = (idx % this.colors.length) * 20
                        this.stepTo({
                            ctx,
                            dots: [
                                [
                                    [dots[0][0][0] + offset, dots[0][0][1]],
                                    [dots[1][0][0] + offset, dots[1][0][1]]
                                ]
                            ],
                            step: 10,
                            cb: (dotsInner, idxInner) => {
                                const [x, y] = dotsInner[0][0]
                                ctx.fill(
                                    this.colors[
                                        (idxInner + idx * 3) %
                                            this.colors.length
                                    ]
                                )
                                drawCross(x + idxInner * this.w, y)
                            }
                        })
                    }
                }
            })
        },
        stepTo({ ctx, dots, cb, step = this.step }) {
            // console.log('dots : ', dots)
            const dotsStore = []
            dots.map(([dot, dotTo]) => {
                // console.log(dot, dotTo)
                dotsStore.push([dot.slice(), dotTo.slice()])
            })
            let isDone = false
            let count = 0

            while (!isDone && count < 500) {
                // callback
                cb(
                    dotsStore.map(items => items.map(item => item.slice())),
                    count
                )

                // step add
                dotsStore.map(([dot, dotTo]) => {
                    // console.log('// step add : ', dot, dotTo)

                    const dotXOffset = dotTo[0] - dot[0]
                    dotXOffset && (dot[0] += step * (dotXOffset > 0 ? 1 : -1))

                    const dotYOffset = dotTo[1] - dot[1]
                    dotYOffset && (dot[1] += step * (dotYOffset > 0 ? 1 : -1))
                })

                // should stop while or not
                isDone =
                    dotsStore.filter(([dot, dotTo]) => {
                        return (
                            Math.abs(dotTo[0] - dot[0]) < step / 2 &&
                            Math.abs(dotTo[1] - dot[1]) < step / 2
                        )
                    }).length === dotsStore.length

                // iteration safe counts
                count += 1
            }
        }
    }
}
</script>