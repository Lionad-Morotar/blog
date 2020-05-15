<template>
    <div ref="loading" class="loading">
        <div class="loading__loading-circle"></div>
        <div class="cogs">
            <div class="cog cog__top">
                <div class="cog-part top-part"></div>
                <div class="cog-part top-part"></div>
                <div class="cog-part top-part"></div>
                <div class="cog-hole top-hole"></div>
            </div>
            <div class="cog cog__left">
                <div class="cog-part left-part"></div>
                <div class="cog-part left-part"></div>
                <div class="cog-part left-part"></div>
                <div class="cog-hole left-hole"></div>
            </div>
            <div class="cog cog__bottom">
                <div class="cog-part bottom-part"></div>
                <div class="cog-part bottom-part"></div>
                <div class="cog-part bottom-part"></div>
                <div class="cog-hole bottom-hole"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        assets: Object
    },
    computed: {},
    created() {
        // TODO utils
        function loadAssets(assets, config) {
            config = Object.assign(
                {
                    delay: 0,
                    method: 'sync',
                    retryCount: 3
                },
                config
            )

            // 将资源按照 sort 字段排序
            const sortedAssets = Object.values(assets).sort((b, a) => (a.sort || 0) - (b.sort || 0))

            return new Promise((resolve, reject) => {
                Promise.all(
                    sortedAssets.map(raw => {
                        return new Promise((resolve, reject) => {
                            const { value, type, cb = () => {}, delay = 0 } = raw
                            const assetsType = type || 'image'
                            const cbWithDelay = (...args) => setTimeout(() => cb(...args), delay)

                            switch (assetsType) {
                                case 'image':
                                    function loadImage() {
                                        return new Promise((resolve, reject) => {
                                            const image = new Image()
                                            image.src = value
                                            image.onload = () => {
                                                resolve()
                                            }
                                            image.onerror = error => {
                                                reject(error)
                                            }
                                        })
                                    }
                                    // 如果加载图片失败则尝试重新加载
                                    function retryOnError(retryCount) {
                                        loadImage()
                                            .then(_ => {
                                                resolve(cbWithDelay())
                                            })
                                            .catch(error => {
                                                if (retryCount > 0) {
                                                    setTimeout(() => {
                                                        retryOnError(retryCount - 1)
                                                    }, 0)
                                                } else {
                                                    reject('Image Load Error')
                                                }
                                            })
                                    }
                                    retryOnError(config.retryCount)
                                    break
                                default:
                                    throw new Error('Unknown required data type' + raw)
                            }
                        })
                            .then(_ => resolve(_))
                            .catch(error => {
                                throw new Error(error)
                            })
                    })
                )
                    .then(_ => {
                        console.log('All tasks done')
                        resolve()
                    })
                    .catch(error => {
                        console.log('All tasks done with error : ', error)
                        reject()
                    })
            })
        }

        loadAssets(this.assets)
            .then(this.loadEnd)
            .catch(this.loadEnd)
    },
    methods: {
        loadEnd(event) {
            this.$emit('loadEnd')
        }
    }
}
</script>

<style lang="scss">
@import '../styles/animation.scss';
$color-yellow-main: #ebd2ae;
$color-red-main: #985851;

.loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 9999;
    pointer-events: none;
}

/**
 * box
 */
.loading__loading-circle {
    position: absolute;

    &::before,
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #2c291f;
        border-radius: 50%;
        transform: scale(0);
    }
    &::before {
        border: solid white;
        box-sizing: border-box;
        opacity: 0.1;
        z-index: -1;
    }
}
@include pc-layout {
    .loading__loading-circle {
        top: calc(50% - 325px);
        left: calc(50% - 325px);
        width: 650px;
        height: 650px;
    }
}
@include sp-layout {
    .loading__loading-circle {
        top: calc(50% - (50vw - 10px));
        left: 10px;
        width: calc(100vw - 20px);
        height: calc(100vw - 20px);
    }
}

/**
 * cogs
 */
$cogs-size: 250px;
$hole-size-base: 0.7;
@include sp-layout {
    .cogs {
        transform: scale(0.5);
    }
}
.cogs {
    z-index: -2;
    width: $cogs-size;
    height: $cogs-size;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    .cog {
        position: absolute;
        // TODO 如果加了 Filter，齿轮周围会有渲染错误
        // filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.1));
        transform: scale(0);

        .cog-part {
            width: $cogs-size;
            height: $cogs-size;
            border-radius: 8px;
            position: absolute;

            &:nth-of-type(1) {
                transform: rotate(30deg);
            }
            &:nth-of-type(2) {
                transform: rotate(60deg);
            }
            &:nth-of-type(3) {
                transform: rotate(90deg);
            }
        }
        .cog-hole {
            border-radius: 100%;
            background: white;
            position: absolute;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
    .cog__top {
        $base: 1;
        $size: $cogs-size * $base;
        width: $size;
        height: $size;
        transform-origin: $size/2 $size/2;
        top: -70%;
        .cog-part {
            width: $size;
            height: $size;
            background: #ce9d7e;
        }
        .cog-hole {
            width: $size * $hole-size-base;
            height: $size * $hole-size-base;
        }
    }
    .cog__left {
        $base: 0.9;
        $size: $cogs-size * $base;
        width: $size;
        height: $size;
        transform-origin: $size/2 $size/2;
        top: 63%;
        left: -48%;
        .cog-part {
            width: $size;
            height: $size;
            background: #985851;
        }
        .cog-hole {
            width: $size * $hole-size-base;
            height: $size * $hole-size-base;
        }
    }
    .cog__bottom {
        $base: 0.7;
        $size: $cogs-size * $base;
        width: $size;
        height: $size;
        transform-origin: $size/2 $size/2;
        top: 62%;
        right: -56%;
        .cog-part {
            width: $size;
            height: $size;
            background: #ebd2ae;
        }
        .cog-hole {
            width: $size * $hole-size-base;
            height: $size * $hole-size-base;
        }
    }
}

/**
 * view-box
 */
.loading__view-box {
    position: absolute;
}
@include pc-layout {
    .loading__view-box {
        top: calc(50% - 325px);
        left: calc(50% - 325px);
        width: 650px;
        height: 650px;
    }
}
@include sp-layout {
    .loading__view-box {
        top: calc(50% - (50vw - 10px));
        left: calc(50% - (50vw - 10px));
        width: calc(100vw - 20px);
        height: calc(100vw - 20px);
    }
}

/*************************************************************************************
 * SECTION animation
 *************************************************************************************/
$start-delay: 0s;
$triangle-in: 0.5s;
$loading-circle-in: 0.3s;
$loading-circle-1-turn: 1.8s;
$circle-dispear: $loading-circle-in + 0.23s;
$cog-in: $circle-dispear + 0.2s;
$loading-end: 9999s;

.loading {
    animation: fadeout 0.5s ease-out $loading-end forwards;

    .loading__loading-circle:before {
        animation: loading__scale-box 1s ease $start-delay forwards,
            loading__transparent 1s ease $circle-dispear forwards;
    }
    .loading__triangle {
        &::before,
        &::after {
            animation: fadein 1s ease $triangle-in forwards;
        }
    }
    .loading__loading-circle {
        animation: loading__turn-search-wrapper 1s ease $loading-circle-in;
    }
    .loading__loading-circle:after {
        animation: loading__scale-box 1s ease $loading-circle-in forwards, fadeout 1s ease $loading-circle-in forwards;
    }
    .loading__view-box {
        animation: destroy 0.1s ease $circle-dispear + ($loading-circle-1-turn / 10) forwards;
    }
    .loading__loading-text {
        &::before {
            animation: fadein 1s ease $loading-circle-in forwards,
                -turn1 $loading-circle-1-turn ease $loading-circle-in infinite, fadeout 1s ease $circle-dispear forwards;
        }
        div:after {
            animation: slide-right 0.4s ease $loading-circle-in + 0.2s forwards,
                slide-left 0.4s ease $loading-circle-in + 0.4s reverse forwards;
        }
        div:before {
            animation: fadein 0.05s ease $loading-circle-in + 0.35s forwards, fadeout 1s ease $circle-dispear forwards;
        }
    }
    .cogs {
        .cog__top {
            animation: cog-turn1 10s infinite linear $cog-in + 0.2s + 0.2s, scale0-1 0.2s ease $cog-in + 0.2s;
        }
        .cog__left {
            animation: -cog-turn1 8.8s infinite linear $cog-in + 0.4s + 0.3s, scale0-1 0.3s ease $cog-in + 0.4s;
        }
        .cog__bottom {
            animation: cog-turn1 7.3s infinite linear $cog-in + 0.6s + 0.4s, scale0-1 0.4s ease $cog-in + 0.6s;
        }
    }
}

/*************************************************************************************
 * SECTION keyframes
 *************************************************************************************/

@keyframes loading__turn-search-wrapper {
    0% {
        transform: rotate(0deg);
    }
    60% {
        transform: rotate(-370deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

@keyframes loading__scale-box {
    0% {
        transform: scale(0);
    }
    60% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes loading__transparent {
    from {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 0px 0 rgba(255, 255, 255, 0.6), 0px 0px 0 0px rgba(0, 0, 0, 0.8) inset;
    }
    to {
        top: 15%;
        left: 15%;
        width: 70%;
        height: 70%;
        box-shadow: 0px 0px 0px 100000px rgba(255, 255, 255, 1), 0px 0px 60px 0px rgba(0, 0, 0, 0.7) inset;
        background-color: transparent;
        opacity: 0.3;
    }
}

@keyframes cog-turn1 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(1turn);
    }
}
@keyframes -cog-turn1 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-1turn);
    }
}
</style>
