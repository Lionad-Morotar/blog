<template>
  <div class="rotate-image-cmpt in-article-block-cmpt">
    <div class="circle-con">
      <div class="circle" :style="{ transform: `rotate(${rotateDeg}deg)` }">{{ status || 'Rotate' }}</div>
    </div>
    <div class="btns-con">
      <button @click="sort">Sort</button>
      <button @click="sortWithWorker">Sort（Use Worker）</button>
    </div>
  </div>
</template>

<script>
const numbers = [...Array(10 * 100000)].map((e) => ~~(Math.random() * 1000000))
const sortNumbers = (nums) => nums.slice().sort((a, b) => a - b)

export default {
  name: 'rotate-image-cmpt',
  data() {
    return {
      rotateDeg: 0,
      status: null,
    }
  },
  mounted() {
    // TODO window.requestAnimFrame
    const tick = window.setInterval(() => {
      this.rotateDeg += 2
    }, 1000 / 30)
    this.$once('hook:beforeDestroy', () => {
      window.clearInterval(tick)
    })
  },
  methods: {
    sort() {
      this.status = null
      console.log(sortNumbers(numbers))
      this.status = 'Success'
    },
    sortWithWorker() {
      this.status = null
      this.$worker
        .create(sortNumbers)
        .pass(numbers)
        .then((val) => {
          console.log(val)
          this.status = 'Success'
        })
    },
  },
}
</script>

<style lang="stylus" scoped>
.rotate-image-cmpt {
  .circle-con,
  .btns-con {
    display: flex;
    justify-content: center;
    align-items: center;

    .circle {
      width: 250px;
      height: 250px;
      line-height: 250px;
      text-align: center;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      font-size: 3rem;
      font-family: sans-serif;
      font-weight: bold;
      user-select: none;

      &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 96%;
        border-radius: 50%;
        left: 2%;
        top: 0;
        background: white;
        z-index: -1;
      }
    }
  }

  .btns-con {
    margin-top: 2rem;

    button {
      width: 180px;
      height: 2.2rem;
      line-height: 2.2rem;
      font-size: 16px;

      &:nth-child(2) {
        margin-left: 1rem;
      }
    }
  }
}
</style>
