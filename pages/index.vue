<script setup lang="ts">
import type { AnyFn } from '@vueuse/core'

const { data: page } = await useAsyncData('index', () =>
  queryContent('/').findOne()
)

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})

const parallaxRef = ref()
const slides = ['brief', 'detail']
const slide = ref(slides[0])
const changeSlide = (function () {
  const lastTriggerTime = 0
  return function (e) {
    const dateNow = +Date.now()
    if (dateNow - lastTriggerTime < 500) return

    const idx = ['up', 'down'].findIndex((x) => x === e)
    slide.value = slides[idx]
    const toHeight = [0, scrollHeight.value][idx]

    parallaxRef.value.scrollTo
      ? parallaxRef.value.scrollTo(0, toHeight)
      : (parallaxRef.value.scrollTop = toHeight)
  }
})()

const scrollHeight = ref()
onMounted(() => {
  setTimeout(() => {
    const ele = document.querySelector('.parallax')
    scrollHeight.value = ele.scrollHeight - ele.clientHeight
  })
})

function stopMove(e) {
  if (e.type === 'touchmove' || e.type === 'mousemove') {
    e.preventDefault()
    e.stopPropagation()
  }
}

const assets: Record<string, {
  sort: number
  delay: number
  value: string
  done: boolean
  cb: AnyFn
}> = {
  parallax_0: {
    sort: 0,
    delay: 100 * 6,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_0.png',
    done: false,
    cb: () => (assets.parallax_0.done = true),
  },
  parallax_1: {
    sort: 1,
    delay: 100 * 5,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_1.png',
    done: false,
    cb: () => (assets.parallax_1.done = true),
  },
  parallax_2: {
    sort: 2,
    delay: 100 * 4,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_2.png',
    done: false,
    cb: () => (assets.parallax_2.done = true),
  },
  parallax_3: {
    sort: 3,
    delay: 100 * 3,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_3.png',
    done: false,
    cb: () => (assets.parallax_3.done = true),
  },
  parallax_4: {
    sort: 4,
    delay: 100 * 2,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_4.png',
    done: false,
    cb: () => (assets.parallax_4.done = true),
  },
  parallax_5: {
    sort: 5,
    delay: 100 * 1,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_5.png',
    done: false,
    cb: () => (assets.parallax_5.done = true),
  },
  parallax_6: {
    sort: 6,
    delay: 100 * 0,
    value:
      'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_6.png',
    done: false,
    cb: () => (assets.parallax_6.done = true),
  },
}
</script>

<template>
  <div :class="['home-page', slide]">
    <!-- FireWatch Mountain -->
    <div ref="parallaxRef" class="parallax">
      <div class="parallax__layer parallax__layer__0">
        <img :src="assets.parallax_0.value" alt="云朵背景图片" class="cloud animation" draggable="false">
      </div>
      <div class="parallax__layer parallax__layer__1">
        <img :src="assets.parallax_1.value" alt="山岳背景图片" draggable="false">
      </div>
      <div class="parallax__layer parallax__layer__2">
        <img :src="assets.parallax_2.value" alt="山岳背景图片" draggable="false">
      </div>
      <div class="parallax__layer parallax__layer__3">
        <img :src="assets.parallax_3.value" alt="山岳背景图片" draggable="false">
      </div>
      <div class="parallax__layer parallax__layer__4">
        <img :src="assets.parallax_4.value" alt="山岳背景图片" draggable="false">
      </div>
      <div class="parallax__layer parallax__layer__5">
        <img :src="assets.parallax_5.value" alt="山岳背景图片" draggable="false">
      </div>
      <div class="parallax__layer parallax__layer__6">
        <img :src="assets.parallax_6.value" alt="山岳背景图片" draggable="false">
      </div>
      <div class="parallax__cover" />
    </div>

    <!-- My Info -->
    <Gesture :swipe-up="() => changeSlide('up')" freeze-time="300" :event-invoke="stopMove">
      <div class="wrapper wrapper-detail">
        <div class="avatar">
          <img
            src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/avatar.gif" alt="Lionad's Avatar"
            draggable="false"
          >
        </div>
        <div class="card">
          <div class="bio">
            <div class="head">
              <span>{{ page.title }}</span>
            </div>
            <div class="info">
              <span>{{ page.info }}</span>
            </div>
            <div class="description">
              前端偏甜工程师 | 兴趣泛滥 | 逃离地球 | <del><a href="/flows/long-night-dream.html" style="color: inherit">午夜吉他恶魔</a></del>
            </div>
          </div>
          <div class="buttons">
            <div class="into-article">
              <a id="into-article" href="/articles">进入博客</a>
            </div>
          </div>
        </div>
      </div>
    </Gesture>

    <!-- Title -->
    <Gesture :swipe-down="() => changeSlide('down')" freeze-time="300" :event-invoke="stopMove">
      <div class="wrapper wrapper-brief">
        <div class="page-title-con">
          <div class="page-title">
            Lionad's Blog
          </div>
          <div class="page-side-title">
            Newest Posts
          </div>
          <div class="page-side-content">
            <template v-for="article in page.recommends" :key="article.to">
              <p class="article-list">
                <span class="article-list-label" v-text="article.category + '：'" />
                <span class="article-list-content">
                  <a :href="article.to" v-text="article.label" />
                </span>
              </p>
            </template>
          </div>
          <div class="page-tip">
            向下滑动
          </div>
        </div>
      </div>
    </Gesture>
  </div>
</template>

<style lang="scss">
#app-content[data-full-path=\/] {
  #app-header,
  #app-footer {
    display: none;
  }
}
</style>

<style lang="stylus" scoped>
.home-page {
    position: fixed;
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
    margin-left: -1475px;
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
        user-select: none;
        -webkit-user-drag: none;
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

parallax_layers = 6

for item,i in (1..parallax_layers)
    x = (parallax_layers - i) / 2
    .parallax__layer__{i}
        transform: translateZ(-100 * x * 1px) scale(x + 1);

/** SECTION  page-title */

.page-title-con {
    display: flex;
    flex-direction: column;
    cursor: default;
    max-width: 100%;
    color: #221521;

    &:hover {
        .page-tip {
            opacity: 0.4;
        }
    }
}
.page-tip {
    display: inline-block;
    margin: 3em auto;
    padding: 2px 1.5265rem;
    text-align: center;
    border: solid 1px rgb(197, 140, 116);
    border-radius: 1px;
    line-height: 2;
    font-size: 0.75rem;
    letter-spacing: 2px;
    opacity: 0;
    transition: opacity 1s;
}
.page-title {
    font-family: Edo, Dhenmark, fantasy;
    font-weight: lighter;
    text-align: center;
    text-shadow: 0 0.5rem 0.75rem rgba(34, 21, 34, 0.15);
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
@media screen and (min-width: 888px) {
    .page-title {
        font-size: 5.8em;
    }
}
@media screen and (max-width: 888px) {
    .page-title {
        font-size: 3em;
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
        width: 10rem;
        height: 10rem;

        img {
            display: block;
            width: 100%;
            height: auto;
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
            font-family: 'Goudy Old Style', garamond, serif;
            font-size: 3.4375rem;
            line-height: 1.5em;
        }
        .description {
            margin-top: 1.2em;
            padding: 0 1em;
        }

        .buttons {
            .into-article {
                margin: auto;
                margin-top: 4.375rem;
                width: 9.375rem;
                height: 2.5rem;
                line-height: 2.5rem;
                border: solid 1px #fbebe1;
                border-radius: 1px;
                transition: 0.3s;
                cursor: pointer;

                a {
                    display: block;
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
                border-radius: 1px;
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
}
.home-page.brief {
    .wrapper-brief {
        z-index: 1;
    }
    .wrapper-detail {
        opacity: 0;
    }
}
.home-page.detail {
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
@media screen and (min-width: 888px) {
    .home-page {
        .wrapper-detail {
            padding-top: 24vh;
        }
        .avatar {
            width: 12.5rem;
            height: 16.875rem;
        }
    }
}

@media screen and (max-width: 888px) {
    .parallax {
        margin-left: -1490px;
        perspective: 175px;
    }

    .page-side-title {
        font-size: 1rem;
    }
    .article-list {
        font-size: 0.875rem;
    }
    .wrapper {
        padding-top: 10vh;
        overflow: hidden;

        .avatar {
            height: 30vw;
            width: 30vw;
        }
        .card {
            .head {
                font-size: 2.375rem;
                line-height: 2.5em;
                white-space: nowrap;
            }
            .description {
                margin-top: -0.5em;
                font-size: 0.875rem;
                padding: 0 2em;
            }
            .buttons {
                .into-article {
                    margin-top: 4em;
                    width: 7.8125rem;
                    height: 2.1875rem;
                    line-height: 2.1875rem;
                    border: solid 1px #fbebe1;
                    border-radius: 1px;
                    font-size: 0.875rem;
                }
            }
        }
        .footer > * {
            display: block;
        }
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
