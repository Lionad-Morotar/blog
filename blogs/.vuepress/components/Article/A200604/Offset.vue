<template>
    <div ref="con" class="con">
        <Compare>
            <div slot="left" class="circle-con">
                <div class="title">No AA</div>
            </div>
            <div slot="right" class="circle-con antialiasing">
                <div class="title">Pixel-Offset AA</div>
            </div>
        </Compare>
        <div class="deg">
            <div
                class="deg"
            >Auto rotate: {{ deg.toFixed(1) }} Degree / Lock: {{ lock ? 'true' : 'false' }}</div>
            <input type="checkbox" v-model="lock" /> Lock /
            <span>Set degree to ...</span>
            <template v-for="degree in this.preset">
                <button @click="() => setDegreeAndLock(degree)">{{ degree }}</button>
            </template>
        </div>
        <Compare>
            <div slot="left" class="repeat-con">
                <div class="title">No AA</div>
            </div>
            <div slot="right" class="repeat-con antialiasing">
                <div class="title">Pixel-Offset AA</div>
            </div>
        </Compare>
        <br />
        <Compare>
            <div slot="left" class="no-antialiasing-rect">
                <div class="title">No AA</div>
            </div>
            <div slot="right" class="antialiasing-rect">
                <div class="title">Pixel-Offset AA</div>
            </div>
        </Compare>
    </div>
</template>

<script>
export default {
    data() {
        return {
            preset: [1, 42, 85, 175, 266],
            $ele: null,
            tick: null,
            deg: 85,
            lock: true
        }
    },
    mounted() {
        this.listen()
    },
    beforeDestroy() {
        window.clearInterval(this.tick)
    },
    methods: {
        listen() {
            this.$ele = this.$refs.con
            this.tick = window.setInterval(() => {
                !this.lock && this.setDegree(((this.deg += 0.1), (this.deg %= 360)))
            }, 1000 / 60)
        },
        setDegree(deg) {
            this.$ele.style.setProperty('--deg', deg + 'deg')
        },
        setDegreeAndLock(deg) {
            this.lock = true
            this.setDegree(deg)
        }
    }
}
</script>

<style lang="stylus" scoped>
.con {
    --deg: 85deg;
    --light: rgba(228, 192, 96, 1);
    --dark: rgba(190, 81, 40, 1);

    .deg {
        margin: 1rem auto;
        text-align: center;
    }
    button {
        margin-left: 1em;
    }

    .no-antialiasing-rect,
    .antialiasing-rect {
        height: 300px;
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }

    .no-antialiasing-rect {
        border-radius: 1px;
        background: linear-gradient(var(--deg), var(--light) 50%, var(--dark) 50%);
    }
    .antialiasing-rect {
        position: relative;
        border-radius: 1px;
        background: linear-gradient(var(--deg), var(--light) 50%, var(--dark) 50%);
        // filter: blur(0.5px);

        &::after {
            --offsetX: 0.4px;
            --offsetY: -0.1px;
            --dark-opacity: 0.3;
            --light-opacity: 0.6;
            --line-width: 0.6px;
            content: '';
            position: absolute;
            top: var(--offsetY);
            left: var(--offsetX);
            width: 100%;
            height: 100%;
            background: linear-gradient(
                var(--deg),
                transparent,
                'transparent calc(50% - %s)' % var(--line-width),
                'rgba(190, 81, 40, %s) 50%' % var(--dark-opacity),
                'rgba(228, 192, 96, %s) 50%' % var(--light-opacity),
                'transparent calc(50% + %s)' % var(--line-width),
                transparent
            );
        }
    }

    .repeat-con {
        --c1: #cd3f4f;
        --c2: #e6a964;
        --c3: #5996cc;
        position: relative;
        height: 300px;
        background-image: repeating-linear-gradient(
            var(--deg),
            var(--c1),
            var(--c1) 10px,
            var(--c2) 10px,
            var(--c2) 40px,
            var(--c1) 40px,
            var(--c1) 50px,
            var(--c3) 50px,
            var(--c3) 80px
        );

        &.antialiasing {
            // filter: blur(0.5px);
            &::after {
                --offsetX: 0.4px;
                --offsetY: -0.1px;
                --dark-opacity: 0.3;
                --light-opacity: 0.6;
                --line-width: 0.6px;
                content: '';
                position: absolute;
                top: var(--offsetY);
                left: var(--offsetX);
                width: 100%;
                height: 100%;
                opacity: 0.5;
                background-image: repeating-linear-gradient(
                    var(--deg),
                    var(--c3),
                    transparent calc(0px + var(--line-width)),
                    transparent calc(10px - var(--line-width)),
                    var(--c2) 10px,
                    var(--c1) 10px,
                    transparent calc(10px + var(--line-width)),
                    transparent calc(40px - var(--line-width)),
                    var(--c1) 40px,
                    var(--c2) 40px,
                    transparent calc(40px + var(--line-width)),
                    transparent calc(50px - var(--line-width)),
                    var(--c3) 50px,
                    var(--c1) 50px,
                    transparent calc(50px + var(--line-width)),
                    transparent calc(80px - var(--line-width)),
                    var(--c1) 80px
                );
            }
        }
    }

    .circle-con {
        c1 = #cd3f4f;
        c2 = #e6a964;
        position: relative;
        height: 300px;
        background-image: repeating-radial-gradient(circle at 0% 50%, c1 0, c2 50px);

        &.antialiasing {
            // filter: blur(0.5px);
            &::after {
                --offsetX: 0.4px;
                --offsetY: -0.1px;
                dark-opacity = 0.3;
                light-opacity = 0.6;
                --line-width: 0.6px;
                content: '';
                position: absolute;
                top: var(--offsetY);
                left: var(--offsetX);
                width: 100%;
                height: 100%;
                background-image: repeating-radial-gradient(
                    circle at 0% 50%,
                    rgba(c2, light-opacity) 0,
                    'transparent calc(%s)' % var(--line-width),
                    'transparent calc(50px - %s)' % var(--line-width),
                    rgba(c1, dark-opacity) 50px
                );
            }
        }
    }
}
</style>
