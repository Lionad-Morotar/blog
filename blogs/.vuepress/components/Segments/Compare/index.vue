<template>
    <div ref="cmpt" class="compare-cmpt">
        <div ref="left" class="left">
            <slot name="left" />
        </div>
        <div ref="right" class="right">
            <slot name="right" />
        </div>
        <div ref="cursor" class="cursor" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            // direction: 'vertical',
            cursorWidth: 4,
            cursorPos: null,
            cordRec: {},
            offset: {},
            parentWH: {},
            posStore: null
        }
    },
    mounted() {
        this.reinit()
        this.$refs.cursor.addEventListener('mousedown', this.createDrag)
        this.$refs.cursor.addEventListener('touchstart', this.createDrag)
    },
    beforeDestroy() {
        this.$refs.cursor.removeEventListener('mousedown', this.createDrag)
        this.$refs.cursor.removeEventListener('touchstart', this.createDrag)
    },
    methods: {
        reinit() {
            !this.cursorPos && this.calcParentWH()
        },
        calcParentWH() {
            this.parentWH = {
                width: this.$refs.cmpt.offsetWidth - this.cursorWidth,
                height: this.$refs.cmpt.offsetHeight
            }
            this.cursorPos = this.parentWH.width / 2 || null
        },
        createDrag(e) {
            this.cursorPos <= 0 && this.calcParentWH()

            const touch = e.touches ? e.touches[0] : e
            this.cordRec = {
                pageX: touch.pageX,
                pageY: touch.pageY
            }
            document.addEventListener('mousemove', this.handleMove)
            document.addEventListener('touchmove', this.handleMove)
            document.addEventListener('mouseup', this.cancel)
            document.addEventListener('touchend', this.cancel)
            document.addEventListener('touchcancel', this.cancel)
        },
        handleMove(e) {
            const touch = e.touches ? e.touches[0] : e
            this.offset = {
                x: touch.pageX - this.cordRec.pageX,
                y: touch.pageY - this.cordRec.pageY
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

            this.cursorPos = this.posStore
        },
        calcOffset() {
            const offset = this.offset.x
            const pos = Math.max(0, Math.min(this.parentWH.width, this.cursorPos + offset))
            this.$refs.cursor.style.setProperty('--offset', pos + 'px')
            this.$refs.left.style.setProperty('--offset', pos + 'px')
            this.$refs.right.style.setProperty('--offset', pos + 'px')
            this.posStore = pos
        }
    }
}
</script>

<style lang="stylus" scoped>
.compare-cmpt {
  position: relative;
  user-select: none;

  img {
    pointer-events: none;
  }

  div.title {
    position: absolute;
    top: 0;
    display: inline-block;
    padding: 0 1em 3px 1em;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: white;
    text-shadow: 0 0 1px #eee;
  }

  .left, .right {
    --offset: 50%;
    width: 100%;
  }

  .right {
    position: absolute;
    top: 0;
    left: 0;

    .title {
      right: 0;
    }
  }

  .left {
    clip-path: polygon(0 0, var(--offset) 0, var(--offset) 100%, 0 100%);
  }

  .right {
    clip-path: polygon(var(--offset) 0, 100% 0, 100% 100%, var(--offset) 100%);
  }

  .cursor {
    --width: 4px;
    --offset: 50%;
    position: absolute;
    top: 0;
    left: var(--offset);
    height: 100%;
    width: var(--width);
    background: #eee;
    cursor: grabbing;
    user-select: none;
    z-index: 99;

    &::after {
      --size: 24px;
      position: absolute;
      content: '';
      top: calc(50% - var(--size) / 2);
      left: calc(-1 * (var(--size) / 2) + 2px);
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background-color: #eee;
      background-image: url('https://mgear-image.oss-cn-shanghai.aliyuncs.com/assets/resize-h.svg');
      background-size: 80%;
      background-position: center;
    }
  }
}
</style>
