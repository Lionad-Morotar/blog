<template>
    <WHRatio :h="this.height + 'px'">
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
        padding: 50,
        gap: 30,
        lineGap: 3,
        cols: 2,
        rows: 1,
        rectW: 200,
        offsets: []
    }),
    mounted() {
        this.width = document.querySelector('h1').offsetWidth
        this.height =
            this.padding * 2 +
            (this.rows - 1) * this.gap +
            this.rows * this.rectW
    },
    methods: {
        setup(ctx) {
            ctx.createCanvas(this.width, this.height)
            ctx.background(233)
            ctx.strokeWeight(0.3)

            /* draw rects outlines */
            Array(this.rows)
                .fill('')
                .map((row, ridx) => {
                    Array(this.cols)
                        .fill('')
                        .map((col, cidx) => {
                            const offsetX =
                                this.padding + cidx * (this.gap + this.rectW)
                            const offsetY =
                                this.padding + ridx * (this.gap + this.rectW)
                            ctx.rect(offsetX, offsetY, this.rectW)
                            this.offsets.push([offsetX, offsetY])
                        })
                })

            /* draw lines in rects */

            // rects 1
            this.drawLines(ctx, [
                [
                    this.offsets[0],
                    [this.offsets[0][0], this.offsets[0][1] + this.rectW]
                ],
                [
                    [
                        this.offsets[0][0] + this.rectW,
                        this.offsets[0][1] + this.rectW
                    ],
                    [this.offsets[0][0], this.offsets[0][1] + this.rectW]
                ]
            ])
            this.drawLines(ctx, [
                [
                    [this.offsets[0][0], this.offsets[0][1] + this.rectW],
                    [
                        this.offsets[0][0] + this.rectW,
                        this.offsets[0][1] + this.rectW
                    ]
                ],
                [
                    [this.offsets[0][0] + this.rectW, this.offsets[0][1]],
                    [
                        this.offsets[0][0] + this.rectW,
                        this.offsets[0][1] + this.rectW
                    ]
                ]
            ])
            this.drawLines(ctx, [
                [
                    this.offsets[0],
                    [this.offsets[0][0] + this.rectW, this.offsets[0][1]]
                ],
                [
                    [this.offsets[0][0], this.offsets[0][1] + this.rectW / 2],
                    [
                        this.offsets[0][0] + this.rectW,
                        this.offsets[0][1] + this.rectW / 2
                    ]
                ]
            ])
            this.drawLines(ctx, [
                [
                    [this.offsets[0][0], this.offsets[0][1] + this.rectW / 2],
                    [this.offsets[0][0], this.offsets[0][1] + this.rectW]
                ],
                [
                    [
                        this.offsets[0][0] + this.rectW,
                        this.offsets[0][1] + this.rectW / 2
                    ],
                    [
                        this.offsets[0][0] + this.rectW,
                        this.offsets[0][1] + this.rectW
                    ]
                ]
            ])

            // rects 2
            this.drawLines(ctx, [
                [
                    this.offsets[1],
                    [this.offsets[1][0], this.offsets[1][1] + this.rectW]
                ],
                [
                    this.offsets[1],
                    [this.offsets[1][0] + this.rectW, this.offsets[1][1]]
                ]
            ])
            this.drawLines(ctx, [
                [
                    [this.offsets[1][0] + this.rectW, this.offsets[1][1]],
                    this.offsets[1]
                ],
                [
                    [this.offsets[1][0] + this.rectW, this.offsets[1][1]],
                    [
                        this.offsets[1][0] + this.rectW,
                        this.offsets[1][1] + this.rectW
                    ]
                ]
            ])
            this.drawLines(ctx, [
                [
                    this.offsets[1],
                    [this.offsets[1][0] + this.rectW, this.offsets[1][1]]
                ],
                [
                    [this.offsets[1][0], this.offsets[1][1] + this.rectW / 2],
                    [
                        this.offsets[1][0] + this.rectW,
                        this.offsets[1][1] + this.rectW / 2
                    ]
                ]
            ])
            this.drawLines(ctx, [
                [
                    [this.offsets[1][0], this.offsets[1][1] + this.rectW / 2],
                    [this.offsets[1][0], this.offsets[1][1] + this.rectW]
                ],
                [
                    [
                        this.offsets[1][0] + this.rectW,
                        this.offsets[1][1] + this.rectW / 2
                    ],
                    [
                        this.offsets[1][0] + this.rectW,
                        this.offsets[1][1] + this.rectW
                    ]
                ]
            ])
        },
        drawLines(ctx, [dot1R, dot2R]) {
            let [dot1, dot1To] = dot1R
            let [dot2, dot2To] = dot2R
            dot1 = dot1.slice()
            dot2 = dot2.slice()
            const stepDot1 = this.lineGap
            const stepDot2 = this.lineGap
            let isDone = false
            let count = 0

            while (!isDone && count < 1000) {
                // console.log(...dot1, ...dot2, dot2To[0], dot2[0])

                ctx.line(...dot1, ...dot2)

                const dot1X = dot1To[0] - dot1[0]
                dot1X && (dot1[0] += stepDot1 * (dot1X > 0 ? 1 : -1))

                const dot1Y = dot1To[1] - dot1[1]
                dot1Y && (dot1[1] += stepDot1 * (dot1Y > 0 ? 1 : -1))

                const dot2X = dot2To[0] - dot2[0]
                dot2X && (dot2[0] += stepDot2 * (dot2X > 0 ? 1 : -1))

                const dot2Y = dot2To[1] - dot2[1]
                dot2Y && (dot2[1] += stepDot2 * (dot2Y > 0 ? 1 : -1))

                isDone =
                    Math.abs(dot1To[0] - dot1[0]) < this.lineGap / 2 &&
                    Math.abs(dot1To[1] - dot1[1]) < this.lineGap / 2 &&
                    Math.abs(dot2To[0] - dot2[0]) < this.lineGap / 2 &&
                    Math.abs(dot2To[1] - dot2[1]) < this.lineGap / 2

                count += 1
            }
        }
    }
}
</script>

