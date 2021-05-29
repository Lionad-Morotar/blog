<template>
    <div class="image-render-cmpt">
        <template v-for="method in calcMethods">
            <div class="container" :style="{ imageRendering: method.name }">
                <div class="title">{{ method.name }}{{ method.support ? '' : ' : Not Support' }}</div>
                <img loading="lazy" :src="src" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200319/2020-03-19-09-31-44.png',
            methods: []
        }
    },
    computed: {
        calcMethods() {
            if (this.methods.length === 0) return []
            const $ele = document.createElement('div')
            return this.methods.map(x => {
                $ele.style.setProperty(`image-rendering`, x)
                const support = $ele.style.imageRendering === x
                return {
                    name: x,
                    support
                }
            })
        }
    },
    mounted() {
        this.methods = ['auto', 'pixelated', 'smooth', 'high-quality', 'crisp-edges']
    }
}
</script>

<style lang="stylus" scoped>
.image-render-cmpt {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.container {
  margin: 1rem;
  width: 200px;
  height: 200px;
  border: solid 2px;
  cursor: pointer;
  overflow: hidden;
  text-align: center;

  // transform: rotate(-5deg) translateZ(0);
  .title {
    position: absolute;
    padding: 3px 1em;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: #fafafa;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  img {
    width: 200px;
    height: 213px;
    transform: scale(1) translateZ(0);
    filter: grayscale(1);
    transition: 0.5s;

    &:hover {
      transform: scale(8) translateZ(0);
      transform-origin: center;
    }
  }
}
</style>
