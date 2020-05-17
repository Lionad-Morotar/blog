<template>
    <div :class="['home', slide]">
        <!-- FireWatch Mountain -->
        <div class="parallax">
            <a rel="nofollow" href="#page-top" id="page-top" />
            <div class="parallax__layer parallax__layer__0">
                <img
                    v-if="assetInitDone || assets.parallax_0.done"
                    :src="assets.parallax_0.value"
                    alt="云朵背景图片"
                    class="cloud"
                />
            </div>
            <div class="parallax__layer parallax__layer__1">
                <img v-if="assetInitDone || assets.parallax_1.done" :src="assets.parallax_1.value" alt="山岳背景图片" />
            </div>
            <div class="parallax__layer parallax__layer__2">
                <img v-if="assetInitDone || assets.parallax_2.done" :src="assets.parallax_2.value" alt="山岳背景图片" />
            </div>
            <div class="parallax__layer parallax__layer__3">
                <img v-if="assetInitDone || assets.parallax_3.done" :src="assets.parallax_3.value" alt="山岳背景图片" />
            </div>
            <div class="parallax__layer parallax__layer__4">
                <img v-if="assetInitDone || assets.parallax_4.done" :src="assets.parallax_4.value" alt="山岳背景图片" />
            </div>
            <div class="parallax__layer parallax__layer__5">
                <img v-if="assetInitDone || assets.parallax_5.done" :src="assets.parallax_5.value" alt="山岳背景图片" />
            </div>
            <div class="parallax__layer parallax__layer__6">
                <img v-if="assetInitDone || assets.parallax_6.done" :src="assets.parallax_6.value" alt="山岳背景图片" />
            </div>
            <div class="parallax__cover">
                <a rel="nofollow" href="#page-bottom" id="page-bottom" />
            </div>
        </div>

        <!-- My Info -->
        <div class="wrapper wrapper-detail">
            <div class="avatar">
                <img src="http://image.lionad.art/mgear/image/avatar.gif" alt="Lionad's Avatar" draggable="false" />
            </div>
            <div class="card">
                <div class="bio">
                    <div class="head">
                        <span>{{ data.head }}</span>
                    </div>
                    <div class="info">
                        <span>{{ data.info }}</span>
                    </div>
                    <div class="description">
                        <Content />
                    </div>
                </div>
                <div class="buttons">
                    <div class="into-article">
                        <a rel="nofollow" href="/articles/index.html">进入博客</a>
                    </div>
                </div>
            </div>

            <div class="footer" v-if="data.footer">
                <span> {{ data.footer }} / </span>
                <a rel="nofollow" href="/friends" target="_blank">与我联络 & 友情链接(Links)</a>
            </div>
        </div>

        <!-- Title -->
        <div class="wrapper wrapper-brief">
            <div class="page-title-con">
                <div class="page-title">Lionad's Blogs</div>
                <div class="page-side-title">Newest Posts</div>
                <div class="page-side-content">
                    <template v-for="section in articles" v-if="section.label">
                        <p class="article-list">
                            <span class="article-list-label" v-text="section.label + '：'"></span>
                            <span class="article-list-content">
                                <a :href="`/articles/${section.children[0]}.html`" v-text="section.childrenRaw[0]"></a>
                            </span>
                        </p>
                    </template>
                </div>
                <div class="page-tip">向下滑动</div>
            </div>
        </div>

        <!-- Loading Animation -->
        <transition name="fade">
            <PageLoading v-if="loading" @loadEnd="loadEnd" :assets="assets" />
        </transition>
    </div>
</template>

<script>
const sidebar = require('../sidebar')
import PageLoading from './Animation/PageLoading'
import SwipeIndicator from './utils/swipe-indicator'

const SLIDES = ['brief', 'detail']

export default {
    components: {
        PageLoading
    },
    computed: {
        data() {
            return {
                ...this.$page.frontmatter
            }
        }
    },
    mounted() {
        /* Loading */
        this.loading = window.localStorage.getItem('is-homepage-loading-done') ? false : true
        // this.loading = true
        this.assetInitDone = !this.loading
        if (!this.assetInitDone) {
            this.loadingMinTimeTick = (() => {
                const startTime = +new Date()
                return function calc() {
                    const endTime = +new Date()
                    return endTime - startTime
                }
            })()
        }

        /* 劫持鼠标滚轮 */
        new SwipeIndicator({
            elem: document.querySelector('.wrapper-detail'),
            callback: e => this.changeSlide(e)
        })
        new SwipeIndicator({
            elem: document.querySelector('.wrapper-brief'),
            callback: e => this.changeSlide(e)
        })
    },
    data() {
        return {
            sidebar,
            articles: sidebar.getSidebar('articles'),
            loading: false,
            slide: SLIDES[0],
            loadingMinTimeTick: null,
            assetInitDone: false,
            assets: {
                parallax_0: {
                    sort: 0,
                    delay: 100 * 6,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_0.png',
                    cb: () => this.$set(this.assets.parallax_0, 'done', true)
                },
                parallax_1: {
                    sort: 1,
                    delay: 100 * 5,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_1.png',
                    cb: () => this.$set(this.assets.parallax_1, 'done', true)
                },
                parallax_2: {
                    sort: 2,
                    delay: 100 * 4,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_2.png',
                    cb: () => this.$set(this.assets.parallax_2, 'done', true)
                },
                parallax_3: {
                    sort: 3,
                    delay: 100 * 3,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_3.png',
                    cb: () => this.$set(this.assets.parallax_3, 'done', true)
                },
                parallax_4: {
                    sort: 4,
                    delay: 100 * 2,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_4.png',
                    cb: () => this.$set(this.assets.parallax_4, 'done', true)
                },
                parallax_5: {
                    sort: 5,
                    delay: 100 * 1,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_5.png',
                    cb: () => this.$set(this.assets.parallax_5, 'done', true)
                },
                parallax_6: {
                    sort: 6,
                    delay: 100 * 0,
                    value: 'http://image.lionad.art/mgear/image/homepage/layer_6.png',
                    cb: () => this.$set(this.assets.parallax_6, 'done', true)
                }
            }
        }
    },
    methods: {
        // 页面加载完成后
        loadEnd() {
            const loadCosumeTime = this.loadingMinTimeTick()
            const minLoadTime = 4000
            const remainTime = minLoadTime > loadCosumeTime ? minLoadTime - loadCosumeTime : 0

            this.assetInitDone = true
            setTimeout(() => {
                this.loading = false
                localStorage.setItem('is-homepage-loading-done', '1')
            }, remainTime)
        },
        // 滚动页面
        changeSlide(e) {
            const slideSideEffect = {
                up() {
                    document.querySelector('#page-top').click()
                    setTimeout(() => {
                        document.querySelector('#page-top').click()
                    }, 50)
                },
                down() {
                    document.querySelector('#page-bottom').click()
                    setTimeout(() => {
                        document.querySelector('#page-bottom').click()
                    }, 50)
                }
            }
            const idx = ['up', 'down'].findIndex(x => x === e.direction)
            this.slide = SLIDES[idx]
            slideSideEffect[e.direction]()
        }
    }
}
</script>

<style lang="scss">
@import './styles/animation.scss';

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    background-color: #fedcc8;

    ::-webkit-scrollbar {
        width: 0;
    }
}

/** SECTION  Mountain */

.parallax {
    perspective: 100px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 50%;
    right: 0;
    bottom: 0;
    margin-left: -1500px;
    filter: saturate(0.45);
    scroll-behavior: smooth;
}

.parallax__layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    img {
        display: block;
        position: absolute;
        bottom: 0;
    }
    img.cloud {
        opacity: 0.5;
        animation: cloud-move 20s ease alternate infinite;
    }
    @keyframes cloud-move {
        from {
            left: -5%;
        }
        to {
            left: 5%;
        }
    }
}

.parallax__cover {
    background: #2d122b;
    display: block;
    position: absolute;
    top: 100%;
    top: calc(100% - 1px);
    left: 0;
    right: 0;
    height: 70vh;
    z-index: 2;
}
.page-top {
    position: absolute;
    top: 0;
}
.page-bottom {
    position: absolute;
    bottom: 0;
}

$parallax__layers: 6;

@for $i from 0 through $parallax__layers {
    $x: ($parallax__layers - $i) / 2;
    .parallax__layer__#{$i} {
        transform: translateZ(-100 * $x * 1px) scale($x + 1);
    }
}

/** SECTION  page-title */

.page-title-con {
    display: flex;
    flex-direction: column;
    cursor: default;
    max-width: 100%;

    &:hover {
        .page-tip {
            opacity: 0.4;
        }
    }
}
.page-tip {
    display: inline-block;
    margin: 3em auto;
    padding: 2px 25px;
    text-align: center;
    border: solid 1px rgb(197, 140, 116);
    border-radius: 5px;
    line-height: 2;
    font-size: 12px;
    letter-spacing: 2px;
    opacity: 0;
    transition: opacity 1s;
}
.page-title {
    font-family: Edo, Dhenmark, Gabriola;
    font-weight: lighter;
    text-align: center;
    text-shadow: 0 8px 12px rgba(34, 21, 34, 0.15);
    letter-spacing: 2px;
    color: #300c22;
    animation: fadein 1s;

    &::after {
        content: ' .';
        animation: page-title-dot-blink 1.6s ease-in infinite;
    }
}
.page-side-title {
    margin-top: 2em;
    margin-bottom: 0.7em;
    text-align: center;
    font-family: garamond, serif;
    font-size: 1.5em;
    font-weight: bold;
    font-variant: small-caps;
}
.page-side-content {
    text-align: center;

    .article-list {
        margin-top: 0.4em;
    }
    .article-list-content {
        &::before {
            content: '《';
        }
        &::after {
            content: '》';
        }
    }
}
@include pc-layout {
    .page-title {
        font-size: 5.8em;
    }
}
@include sp-layout {
    .page-title {
        font-size: 3.6em;
        text-align: center;

        &::after {
            display: none;
        }
    }
}
@keyframes page-title-dot-blink {
    from {
        opacity: 1;
    }
    to {
        opacity: 0.4;
    }
}

/** SECTION  wrapper */

.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 19vh;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateZ(0);
    transition: 0.5s;
    user-select: none;

    .avatar {
        position: relative;
        width: 160px;
        height: 160px;

        img {
            display: block;
            width: 100%;
            height: auto;
            min-width: 160px;
            min-height: 160px;
            border: solid 5px white;
            border-radius: 50%;
        }
    }

    .card {
        position: relative;
        text-align: center;
        color: #fbebe1;

        .head {
            font-weight: bolder;
            font-family: 'Goudy Old Style', garamond;
            font-size: 55px;
            line-height: 1.5em;
        }
        .description {
            margin-top: 1.2em;
            padding: 0 1em;
        }

        .buttons {
            .into-article {
                margin: auto;
                margin-top: 70px;
                width: 150px;
                height: 40px;
                line-height: 40px;
                border: solid 1px #fbebe1;
                border-radius: 3px;
                transition: 0.3s;
                cursor: pointer;

                a {
                    color: #fbebe1;
                }

                &:hover {
                    background: #595059;
                }

                &:active {
                    background: #918a90;
                }
            }
        }

        .actions {
            border-top: 1px solid rgba(34, 36, 38, 0.1);
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;

            // padding 1em
            .button {
                background-color: white;
                border: none;
                border-radius: 0.3em;
                color: white;
                padding: 0.5em 1em;
                margin: 1em 0.5em;
                font-size: 1rem;
                font-family: inherit;
                font-weight: 400;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                cursor: pointer;

                &:hover {
                    background-color: white;
                }
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 1rem;
        width: 100%;
        color: #e3e3e3;
        text-align: center;
        font-size: 12px;
        letter-spacing: 0.5px;
        border: none;

        a {
            color: #e3e3e3;
        }
    }
}
.home.brief {
    .wrapper-brief {
        z-index: 1;
    }
    .wrapper-detail {
        opacity: 0;
    }
}
.home.detail {
    .wrapper-detail {
        z-index: 1;
    }
    .wrapper-brief {
        opacity: 0;
        .page-tip {
            display: none;
        }
    }
}
@include pc-layout {
    .home {
        .wrapper-detail {
            padding-top: 13vh;
        }
        .avatar {
            width: 200px;
            height: 270px;
        }
    }
}
@include sp-layout {
    .card .head {
        font-size: 40px;
        line-height: 2.5em;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
