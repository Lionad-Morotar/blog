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
function stepTo({ ctx, dots, cb, step = 1, safeCount = 5000 }) {
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
                dotXOffset && (dot[0] += step * (dotXOffset > 0 ? 1 : -1))
                const dotYOffset = dotTo[1] - dot[1]
                dotYOffset && (dot[1] += step * (dotYOffset > 0 ? 1 : -1))
            } else {
                const dotOffset = dotTo - dot
                dotOffset &&
                    (dotsStore[idx][0] += step * (dotOffset > 0 ? 1 : -1))
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
        },
        draw(ctx) {
            ctx.clear()
            ctx.background(233)

            let amountLines = 500
            const r = ctx.min(this.canvasWidth, this.canvasHeight) * 0.45
            const dots = []

            for (let i = 0; i < amountLines; i++) {
                let angle = (i / amountLines) * ctx.TWO_PI
                const x = ctx.cos(angle) * r + this.canvasWidth / 2
                const y = ctx.sin(angle) * r + this.canvasHeight / 2
                dots.push(ctx.createVector(x, y))
            }

            this.xoff += 0.001
            const rand = ctx.noise(this.xoff)

            ctx.stroke(0, 60)
            ctx.strokeWeight(1)
            dots.forEach((dot, i) => {
                let dotEnd
                dotEnd =
                    dots[
                        ctx.floor(i * 1.5 + amountLines * 1 * rand) %
                            amountLines
                    ]
                ctx.line(dot.x, dot.y, dotEnd.x, dotEnd.y)
            })
        }
    }
}
</script>