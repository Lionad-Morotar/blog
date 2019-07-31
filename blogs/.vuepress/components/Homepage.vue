<template>
  <div class="home">

    <!-- background images -->
    <css-doodle class="fixed" @click="generateShape">
      :doodle {
        @grid: 18 / 100vmax;
        opacity: .1;
      }
      --hue: calc(180 + 1.5 * @row() * @col());
      background: hsl(var(--hue), 45%, 65%);
      margin: -.5px;
      transition: @r(.5s) ease;
      clip-path: polygon(@pick(
        '0 0, 100% 0, 100% 100%',
        '0 0, 100% 0, 0 100%',
        '0 0, 100% 100%, 0 100%',
        '100% 0, 100% 100%, 0 100%'
      ));
    </css-doodle>

    <!-- card -->
    <div class="wrapper">
      <div class="avatar">
        <img :src="$withBase(data.avatar)" alt>
      </div>
      <div class="card">
        <div class="bio">
          <div class="head">
            <span>{{data.head}}</span>
          </div>
          <div class="info">
            <span>{{data.info}}</span>
          </div>
          <div class="description">
            <Content/>
          </div>
        </div>
        <div class="interests">
          <span>{{data.interests}}</span>
        </div>
        <div class="my-socials">
          <div v-for="item in data.socials">
            <a :href="item.link" target="_blank">
              <img class="link-svgs" :src="item.icon || '/icons/'+item.title+'.svg'" :alt="item.title" :title="item.title">
            </a>
          </div>
        </div>
        <div class="actions">
          <div v-for="item in data.actions">
            <a
              :href="item.link"
              class="button"
              :target="item.link.startsWith('/')?'':'_blank'"
            >{{item.text}}</a>
          </div>
        </div>
      </div>

      <div class="footer" v-if="data.footer">{{ data.footer }}</div>
    </div>
    
  </div>
</template>

<script>

let curBGType = 1
const bgType = [
  `
    :doodle {
      @grid: 18 / 100vmax;
      opacity: .1;
    }
    --hue: calc(180 + 1.5 * @row() * @col());
    background: hsl(var(--hue), 45%, 65%);
    margin: -.5px;
    transition: @r(.5s) ease;
    clip-path: polygon(@pick(
      '0 0, 100% 0, 100% 100%',
      '0 0, 100% 0, 0 100%',
      '0 0, 100% 100%, 0 100%',
      '100% 0, 100% 100%, 0 100%'
    ));
  `,
  `
    :doodle {
      @grid: 18 / 100vmax;
      opacity: .1;
    }
    --hue: calc(180 + 1.5 * @row() * @col());
    background: hsl(var(--hue), 45%, 65%);
    margin: -.5px;
    transition: @r(.8s) ease;
    clip-path: polygon(
      @rand(100%) 0, 100% @rand(100%), 0 @rand(100%)
    );
  `,
  `
    :doodle {
      @grid: 7 / 100vmax;
      background: #fcfcfc;
      opacity: .1;
    }
    @shape: clover 5;
    background: hsla(
      calc(360 - @i() * 4), 70%, 68%, @r(.8)
    );
    transform:
      scale(@r(.2, 1.5))
      translate(@m2(@r(-50%, 50%)));
  `
]

export default {
  computed: {
    data() {
      return {
        ...this.$page.frontmatter,
        cssDoodle: null,
        bgUpdateTick: null,
      }
    }
  },
  mounted () {
    this.initDoodle()
    this.setBGUpdateInterval()
  },
  destroyed () {
    this.clearBGUpdateInterval()
  },
  methods: {
    initDoodle () {
      const isExist = customElements && customElements.get('css-doodle')

      if (!isExist) {
        const cssDoodleNode = document.createElement('script')
          cssDoodleNode.type = 'text/javascript'
          cssDoodleNode.src = '/js/css-doodle.min.js'
  
        window.document.getElementById('app').appendChild(cssDoodleNode)
      }
    },
    setBGUpdateInterval () {
      this.bgUpdateTick = setInterval(() => {
        this.generate()
      }, 2500)
    },
    clearBGUpdateInterval () {
      clearInterval(this.bgUpdateTick)
    },
    generate (content) {
      const doodle = this.cssDoodle || (this.cssDoodle = window.document.querySelector('css-doodle'), this.cssDoodle)

      doodle && doodle.update && doodle.update(content)
    },
    generateShape () {
      this.clearBGUpdateInterval()
      this.setBGUpdateInterval()
      this.generate(bgType[(curBGType ++) % bgType.length])
    }
  },
}
</script>

<style lang="stylus">
@import './styles/config.styl';

body {
  user-select: none;

  .fixed {
    position: fixed;
    top: 0;
    left: 0;
  }
  .home {
    max-width 100%;
    min-height: calc(100vh - 6rem);
    display: flex;
    padding: 2.4rem 2rem 0;
  }

  @media (max-width: $MQMobileNarrow) {
    .home {
      padding-left: 0;
      padding-right: 0;
      padding: 1rem 0.5rem;
    }
  }
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center
  align-items: center;

  .avatar {
    position: relative;
    width: 156px;
    height: 156px;
    z-index: 1;

    img {
      display: block;
      width: 100%;
      height: auto;
      max-width: 150px;
      border: solid 3px white;
      border-radius: 500rem;
    }
  }

  .card {
    max-width: 600px;
    width: 100%;
    position: relative;
    top: -75px;
    padding-top: 75px;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    text-align: center;

    .bio {
      padding: 1em;

      .head {
        margin: 10px 0px;
        font-weight: 700;
        font-size: 2.3em;
        background-image: -webkit-linear-gradient(left, #111, #999 25%, #444 60%, #c1c1c1 75%, #333)
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-background-size: 200% 100%;
        background-size: 200% 100%;
        -webkit-animation: masked-animation 1.3s infinite linear .3s alternate;
        animation: masked-animation 1.3s infinite linear .3s alternate;
      }

      .info {
        padding-top: 0.5rem;
        font-size: 1em;
        color: rgba(0, 0, 0, 0.4);
      }

      .description {
        text-align: justify;

        p {
          padding: 0.8em 0.5em 0;
          line-height: normal;
          -webkit-margin-before: 0em;
          -webkit-margin-after: 0em;

          a {
            font-weight: normal;
          }
        }
      }
    }

    .interests {
      padding: 1.45em 1.5em;
      border-top: 1px solid rgba(34, 36, 38, 0.1);
    }

    .my-socials {
      border-top: 1px solid rgba(34, 36, 38, 0.1);
      display: flex;
      flex-direction: row;
      // align-items: center
      justify-content: center;
      flex-wrap: wrap;

      .link-svgs, img {
        width: 32px;
        margin: 1em;
        border-radius: 3px;
        cursor: pointer;
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
        background-color: $btnBgColor;
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
          background-color: $btnHvColor;
        }
      }
    }
  }

  .footer {
    margin-top: auto;
    padding: 1rem;
    border: none;
    font-size: 1rem;
    text-align: center;
    color: #111;
  }
}

@keyframes masked-animation {
  from {
    background-position: 0 0
  }
  to {
    background-position: -100% 0
  }
}
</style>
