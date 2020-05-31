<template>
    <div ref="con" class="con">
        <div ref="panel">
            <div class="no-antialiasing-rect"></div>
            <div class="deg">Auto rotate: {{ deg.toFixed(1) }} Degree / Lock: {{ lock ? 'true' : 'false' }}</div>
            <div class="antialiasing-rect"></div>
        </div>
        <div class="deg">
            <input type="checkbox" v-model="lock" /> Lock /
            <span>Set degree to ...</span>
            <template v-for="degree in this.preset">
                <button @click="() => setDegreeAndLock(degree)">{{ degree }}</button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            preset: [1, 42, 85, 135, 175, 266],
            $ele: null,
            tick: null,
            deg: 0,
            lock: false
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
            const run = () => {
                this.tick = window.setInterval(() => {
                    !this.lock && this.setDegree(((this.deg += 0.1), (this.deg %= 360)))
                }, 1000 / 60)
            }

            const $panel = this.$refs.panel
            $panel.addEventListener('mouseover', () => {
                window.clearInterval(this.tick)
            })
            $panel.addEventListener('mouseleave', run)
            run()
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

<style lang="scss" scoped>
.con {
    --deg: 0;

    .deg {
        margin: 1rem auto;
        text-align: center;
    }
    button {
        margin-left: 1em;
    }

    .no-antialiasing-rect,
    .antialiasing-rect {
        height: 400px;
        cursor: pointer;
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }

    .no-antialiasing-rect {
        border-radius: 1px;
        background: linear-gradient(var(--deg), #e4c060 50%, #be5128 50%);
    }
    .antialiasing-rect {
        --light: rgba(228, 192, 96, 1);
        --dark: rgba(190, 81, 40, 1);
        position: relative;
        border-radius: 1px;
        background: linear-gradient(var(--deg), var(--light) 50%, var(--dark) 50%);

        &:after {
            --offset: 0.7px;
            --o: 0.6;
            content: '';
            position: absolute;
            top: var(--offset);
            left: var(--offset);
            width: 100%;
            height: 100%;
            background: linear-gradient(
                var(--deg),
                transparent,
                transparent calc(50% - var(--offset)),
                rgba(190, 81, 40, 0.3) 50%,
                rgba(228, 192, 96, var(--o)) 50%,
                transparent calc(50% + var(--offset)),
                transparent
            );
        }
    }
}
</style>
