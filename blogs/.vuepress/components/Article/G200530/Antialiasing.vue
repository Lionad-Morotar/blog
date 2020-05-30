<template>
    <div ref="con" class="con">
        <div class="no-antialiasing-rect"></div>
        <div class="antialiasing-rect"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tick: null
        }
    },
    mounted() {
        // TODO window.requestAnimFrame
        let deg = 0
        const $ele = this.$refs.con
        const run = () => {
            this.tick = window.setInterval(() => {
                $ele.style.setProperty('--deg', (deg += 0.1) + 'deg')
            }, 1000 / 60)
        }

        $ele.addEventListener('mouseover', () => {
            window.clearInterval(this.tick)
        })
        $ele.addEventListener('mouseleave', run)

        run()
    },
    beforeDestroy() {
        window.clearInterval(this.tick)
    }
}
</script>

<style lang="scss" scoped>
.con {
    --deg: 0;

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
        --c1: rgba(228, 192, 96, 1);
        --c2: rgba(190, 81, 40, 1);
        position: relative;
        margin-top: 1rem;
        border-radius: 1px;
        background: linear-gradient(var(--deg), var(--c1) 50%, var(--c2) 50%);

        &:after {
            --offset: 0.4px;
            --o: 0.5;
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
                rgba(190, 81, 40, var(--o)) 50%,
                rgba(228, 192, 96, var(--o)) 50%,
                transparent calc(50% + var(--offset)),
                transparent
            );
        }
    }
}
</style>
