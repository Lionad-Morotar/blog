<template>
    <Gesture :hover="() => this.startBackground()" hoverTime="1500" :eventInvoke="requestOnHover">
        <div class="slot-con">
            <slot />
        </div>
        <div class="full-background-cmpt" :class="animClass">
            <div :ref="componentID + '-grid' " class="grid">
                <template v-if="this.request">
                  <div v-for="image in displayImages" class="grid__item" :key="image.src">
                      <div
                          class="grid__item-img"
                          :style="{ 'background-image': `url(\'${encodeURI(image.src)}\')` }"
                      >
                          <div class="name">{{ image.name }}</div>
                      </div>
                  </div>
                </template>
                <div class="info">Favourite 100th</div>
                <div class="info-shadow">Favourite 100th</div>
            </div>
            <div class="close-btn" @click="() => this.stopBackground()"></div>
        </div>
    </Gesture>
</template>

<script>
import Gesture from '../Segments/Gesture'
import utils from '../utils'

const componentID = 'ID-' + String(Math.random()).slice(-6)
const random = (min, max) => ~~(Math.random() * (max - min)) + min

const startUpTime = 500

export default {
    components: {
        Gesture
    },
    props: {
      images: Array,
      handleURL: Function,
    },
    data() {
        return {
            componentID,
            scrollTop: null,
            firstTime: true,
            request: false,
            visible: false,
            $eles: [],
            displayImages: [],
            cordRec: null,
            offset: { x: 0, y: 0 }
        }
    },
    computed: {
        animClass() {
            const classname = [this.visible ? 'in' : 'out']
            if (!this.visible && this.firstTime) {
                this.firstTime = false
                classname.pop()
            }
            return classname
        }
    },
    watch: {
        visible(isVisible) {
            if (isVisible) {
                this.$nextTick(() => {
                    this.cardIn()
                })
            }
        }
    },
    mounted() {
        const con = []
        while (con.length < 10) {
            const num = random(0, this.images.length)
            const pick = this.images[num]
            if (!con.includes(pick) && pick) {
                con.push(pick)
            }
        }
        this.displayImages = con.map(x => ({
            name: x.replace && x.replace('.jpg', '') || x.title || x.name,
            src: this.handleURL(x.imageURL || x)
        }))
        this.$nextTick(() => {
            this.$eles = [...this.$refs[componentID + '-grid'].querySelectorAll('.grid__item')]
        })
    },
    beforeDestroy() {
        this.cancel()
    },
    methods: {
        cardIn() {
            this.$eles
                .map(x => random(0, startUpTime))
                .map((x, i) => {
                    setTimeout(() => {
                        this.$eles[i].classList.add('in')
                    }, x)
                })
        },
        startBackground() {
            this.scrollTop = document.querySelector('html').scrollTop
            this.visible = true
            this.listenOffset()
            setTimeout(() => {
                this.$root.$el.classList.add('no-move')
            }, 300)
        },
        stopBackground() {
            this.cordRec = null
            this.visible = false
            this.cancel()
            this.$root.$el.classList.remove('no-move')
            document.querySelector('html').scrollTop = this.scrollTop
            this.scrollTop = null
            setTimeout(() => {
                this.$refs[componentID + '-grid'].style.setProperty('--offset-x', 0)
                this.$refs[componentID + '-grid'].style.setProperty('--offset-y', 0)
            }, 1000)
        },
        listenOffset() {
            document.addEventListener('mousemove', this.handleMove)
            document.addEventListener('touchmove', this.handleMove)
            document.addEventListener('mouseup', this.cancel)
            document.addEventListener('touchend', this.cancel)
            document.addEventListener('touchcancel', this.cancel)
        },
        handleMove(e) {
            const touch = e.touches ? e.touches[0] : e
            if (!this.cordRec) {
                this.cordRec = {
                    x: touch.pageX,
                    y: touch.pageY
                }
            }
            this.offset = {
                x: touch.pageX - this.cordRec.x,
                y: touch.pageY - this.cordRec.y
            }
            this.calcOffset()
            e.preventDefault && e.preventDefault()
        },
        cancel() {
            document.removeEventListener('mousemove', this.handleMove)
            document.removeEventListener('touchmove', this.handleMove)
            document.removeEventListener('mouseup', this.cancel)
            document.removeEventListener('touchend', this.cancel)
            document.removeEventListener('touchcancel', this.cancel)
        },
        calcOffset() {
            const { x, y } = this.offset
            utils.requestAnimationFrame(() => {
                this.$refs[componentID + '-grid'].style.setProperty('--offset-x', x + 'px')
                this.$refs[componentID + '-grid'].style.setProperty('--offset-y', y + 'px')
            })
        },
        requestOnHover(e) {
          if (e && e.type === "mouseenter") {
            this.request = true
          }
        }
    }
}
</script>

<style lang="stylus">
.full-background-cmpt {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--dark-black);
    z-index: 999;
    clip-path: circle(0%);
    &.in {
        animation: showup 0.62s ease both;
        @keyframes showup {
            from {
                clip-path: circle(0%);
                pointer-events: none;
            }
            to {
                clip-path: circle(100%);
                pointer-events: auto;
            }
        }
    }
    &.out {
        animation: showup-reverse 0.62s ease both;
        @keyframes showup-reverse {
            from {
                clip-path: circle(100%);
                pointer-events: auto;
            }
            to {
                clip-path: circle(0%);
                pointer-events: none;
            }
        }
    }
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    border: solid 4px #fff;
    background-image: url("data:image/svg+xml,%3Csvg t='1591890040631' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1268' width='200' height='200'%3E%3Cpath d='M905.75 197.5625L826.4375 118.25 512 432.6875 197.5625 118.25 118.25 197.5625 432.6875 512 118.25 826.4375 197.5625 905.75 512 591.3125 826.4375 905.75 905.75 826.4375 591.3125 512z' fill='%23ffffff' p-id='1269'%3E%3C/path%3E%3C/svg%3E");
    background-size: 100%;
    cursor: pointer;
}

.grid {
    --base: 0.004;
    --offset-x: 0;
    --offset-y: 0;
    position: absolute;
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;
    display: grid;
    grid-template-columns: repeat(50, 2%);
    grid-template-rows: repeat(50, 2%);
    grid-gap: 0;

    .info {
        color: #845d53;
        grid-area: 9/18/36/17;
        font-size: 10rem;
        font-weight: bolder;
        font-family: fantacy, var(--font-sidebar);
        text-transform: uppercase;
        writing-mode: vertical-rl;
        text-shadow: 1px 1px 1px #845d53;
        z-index: 1;
        user-select: none;
    }
    .info-shadow {
        color: rgba(139, 93, 82, 0.1);
        grid-area: 1/47/50/30;
        font-size: 20rem;
        font-weight: bolder;
        font-family: fantacy, var(--font-sidebar);
        text-transform: uppercase;
        writing-mode: vertical-rl;
        user-select: none;
    }

    .grid__item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.6;
        overflow: hidden;

        .grid__item-img {
            pointer-events: auto;
            width: calc(100% + 120px);
            height: calc(100% + 120px);
            background-color: var(--dark-black);
            background-size: cover;
            background-position: 50% 50%;
            // cursor: pointer;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0.2;
                background-image: url(https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/icons/dot.gif);
                background-size: 2px 2px;
                image-rendering: pixelated;
            }
        }

        &:nth-child(1) {
            --velocity: 8;
            grid-area: 10 / 1 / 26 / 7;
        }
        &:nth-child(2) {
            --velocity: 11;
            grid-area: 1 / 18 / 9 / 30;
        }
        &:nth-child(3) {
            --velocity: 6;
            grid-area: 1 / 36 / 14 / 42;
        }
        &:nth-child(4) {
            --velocity: 13;
            grid-area: 13 / 16 / 34 / 28;
        }
        &:nth-child(5) {
            --velocity: 5;
            grid-area: 17 / 32 / 32 / 38;
        }
        &:nth-child(6) {
            --velocity: 7;
            grid-area: 19 / 45 / 29 / 51;
        }
        &:nth-child(7) {
            --velocity: 7;
            grid-area: 43 / 1 / 51 / 10;
        }
        &:nth-child(8) {
            --velocity: 6;
            grid-area: 38 / 14 / 46 / 22;
        }
        &:nth-child(9) {
            --velocity: 4;
            grid-area: 40 / 26 / 51 / 32;
        }
        &:nth-child(10) {
            --velocity: 7;
            grid-area: 37 / 39 / 48 / 47;
        }

        & {
            transform: translate3d(
                calc(var(--velocity) * var(--offset-x) * var(--base)),
                calc(var(--velocity) * var(--offset-y) * var(--base)),
                0px
            );

            .grid__item-img {
                transform: translate3d(
                    calc(var(--velocity) * var(--offset-x) * var(--base) * 0.7),
                    calc(var(--velocity) * var(--offset-y) * var(--base) * 0.7),
                    0px
                );
            }
        }
    }
}
</style>
