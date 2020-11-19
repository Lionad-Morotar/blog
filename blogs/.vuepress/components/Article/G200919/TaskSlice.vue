<template>
  <div class="task-slice-cmpt">
    <div class="circle-con">
      <div class="fps-container">
        <FPS @onFPS="updateFPS" />
      </div>
      <div v-for="item in list" class="circle" :style="{ transform: `rotate(${item}deg)` }">
        <calc :key="item" />
      </div>
    </div>
    <div class="btns-con">
      <button
        :class="updateMethod === 1 ? 'active' : ''"
        @click="() => useMethod(1)"
      >{{updateMethod === 1 ? 'Using: ' : ''}} 全量更新</button>
      <button
        :class="updateMethod === 2 ? 'active' : ''"
        @click="() => useMethod(2)"
        style="margin-left: 1em"
      >{{updateMethod === 2 ? 'Using: ' : ''}} 任务切片更新</button>
    </div>
  </div>
</template>

<script>
const LEN = 40 * 10

export default {
  name: 'task-slice-cmpt',
  components: {
    calc: {
      mounted() {
        const taskBase = 2000
        const numbers = [...Array(1 * taskBase)].map((e) => ~~(Math.random() * taskBase))
        const sortNumbers = (nums) => nums.slice().sort((a, b) => a - b)
        sortNumbers(numbers)
      },
      render(h) {
        return h('span')
      },
    },
  },
  data() {
    return {
      updateMethod: 2,
      fps: 0,
      list: Array.apply(null, { length: LEN }).map((_, i) => i),
      stopChangeBase: false,
      sliceBase: 10,
      sliceBaseProtect: 10,
      sliceUpdateRec: [],
    }
  },
  mounted() {
    const requestTime = 600
    const tick = window.setInterval(() => {
      const newList = Array.apply(null, { length: LEN }).map((_, i) => Math.floor(Math.random() * 360))
      this.updateList(newList)
    }, requestTime)
    this.$once('hook:beforeDestroy', () => {
      window.clearInterval(tick)
    })

    this.updateList(Array.apply(null, { length: LEN }).map((_, i) => Math.floor(Math.random() * 360)))
  },
  methods: {
    updateList(list) {
      switch (this.updateMethod) {
        case 1:
          console.time()
          this.list = list
          this.$nextTick(() => {
            console.timeEnd()
          })
          break
        case 2:
          this.sliceUpdate(list)
          break
      }
    },
    sliceUpdate(list) {
      const id = String(Math.random()).slice(-6)
      const task = {
        id,
        run: true,
      }
      if (this.sliceUpdateRec.length) {
        this.sliceUpdateRec[this.sliceUpdateRec.length - 1].run = false
      }
      this.sliceUpdateRec.push(task)

      this.sliceBase = 40
      this.sliceBaseProtect = 40
      const target = 15
      const step = () => {
        if (!this.stopChangeBase) {
          if (this.fps > target) {
            this.inc()
          } else {
            this.dec()
            // this.stopChangeBase = true
          }
        }
        const updateList = list.slice(0, this.sliceBase)
        list = list.slice(this.sliceBase)

        const index = LEN - list.length - updateList.length
        this.list.splice(index, updateList.length, ...updateList)

        list.length && task.run ? setTimeout(step, 1000 / 180) : console.timeEnd(id)
        // list.length && task.run ? this.$utils.requestAnimationFrame(step) : console.timeEnd(id)
      }
      console.time(id)
      step()
    },
    inc() {
      this.sliceBase *= 2
    },
    dec() {
      if (this.sliceBase > this.sliceBaseProtect) {
        this.sliceBase = Math.floor(this.sliceBase / 2)
      }
    },
    updateFPS(fps) {
      // console.log(fps)
      this.fps = fps
    },
    useMethod(idx) {
      if (this.updateMethod !== idx) {
        this.updateMethod = idx
      } else {
        this.updateMethod = null
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.task-slice-cmpt {
  will-change: auto;

  .circle-con {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 40em;
    max-width: 100%;

    .fps-container {
      position: absolute;
      top: -1.5em;
      right: 0;
      width: 3em;
      height: 30px;
    }

    .circle {
      width: 1em;
      height: 1em;
      background: #aaa;
      border-radius: 50%;
      // will-change: auto;

      &::before {
        content: '';
        position: absolute;
        display: block;
        left: calc(50% - 2px);
        width: 4px;
        height: 10px;
        background: #333;
        border-top-left-radius: 2px 10px;
        border-top-right-radius: 2px 10px;
      }
    }
  }

  .btns-con {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    button {
      width: 180px;
      height: 2.2rem;
      line-height: 2.2rem;
      font-size: 16px;
    }
  }
}
</style>
