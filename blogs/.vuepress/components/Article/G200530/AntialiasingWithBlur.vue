<template>
    <div ref="con" class="con">
        <Compare>
            <div slot="left" class="circle-con"></div>
            <div slot="right" class="circle-con antialiasing"></div>
        </Compare>
        <div class="deg">
            <div class="deg">Auto rotate: {{ deg.toFixed(1) }} Degree / Lock: {{ lock ? 'true' : 'false' }}</div>
            <input type="checkbox" v-model="lock" /> Lock /
            <span>Set degree to ...</span>
            <template v-for="degree in this.preset">
                <button @click="() => setDegreeAndLock(degree)">{{ degree }}</button>
            </template>
        </div>
        <Compare>
            <div slot="left" class="repeat-con"></div>
            <div slot="right" class="repeat-con antialiasing"></div>
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

<style lang="scss" scoped>
.con {
    --deg: 0;
    --light: rgba(228, 192, 96, 1);
    --dark: rgba(190, 81, 40, 1);

    .deg {
        margin: 1rem auto;
        text-align: center;
    }
    button {
        margin-left: 1em;
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
            filter: blur(0.7px);
        }
    }

    .circle-con {
        $c1: #cd3f4f;
        $c2: #e6a964;
        position: relative;
        height: 300px;
        background-image: repeating-radial-gradient(circle at 0% 50%, $c1 0, $c2 50px);

        &.antialiasing {
            filter: blur(0.7px);
        }
    }
}
</style>
