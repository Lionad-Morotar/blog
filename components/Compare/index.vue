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

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'

const cmpt = ref(null)
const left = ref(null)
const right = ref(null)
const cursor = ref(null)

const state = reactive({
    cursorWidth: 4,
    cursorPos: null,
    cordRec: {},
    offset: {},
    parentWH: {},
    posStore: null
})

onMounted(() => {
  reinit()
  cursor.value.addEventListener('mousedown', createDrag)
  cursor.value.addEventListener('touchstart', createDrag)
})

onBeforeUnmount(() => {
  cursor.value.removeEventListener('mousedown', createDrag)
  cursor.value.removeEventListener('touchstart', createDrag)
})

function reinit() {
  if (!state.cursorPos) calcParentWH()
}

function calcParentWH() {
  state.parentWH = {
    width: cmpt.value.offsetWidth - state.cursorWidth,
    height: cmpt.value.offsetHeight
  }
  state.cursorPos = state.parentWH.width / 2 || null
}

function createDrag(e) {
  if (state.cursorPos <= 0) calcParentWH()

  const touch = e.touches ? e.touches[0] : e
  state.cordRec = {
    pageX: touch.pageX,
    pageY: touch.pageY
  }
  document.addEventListener('mousemove', handleMove)
  document.addEventListener('touchmove', handleMove)
  document.addEventListener('mouseup', cancelDrag)
  document.addEventListener('touchend', cancelDrag)
  document.addEventListener('touchcancel', cancelDrag)
}

function handleMove(e) {
  const touch = e.touches ? e.touches[0] : e
  state.offset = {
    x: touch.pageX - state.cordRec.pageX,
    y: touch.pageY - state.cordRec.pageY
  }
  calcOffset()
  if (e.preventDefault) e.preventDefault()
}

function cancelDrag() {
  document.removeEventListener('mousemove', handleMove)
  document.removeEventListener('touchmove', handleMove)
  document.removeEventListener('mouseup', cancelDrag)
  document.removeEventListener('touchend', cancelDrag)
  document.removeEventListener('touchcancel', cancelDrag)

  state.cursorPos = state.posStore
}

function calcOffset() {
  const offset = state.offset.x
  const pos = Math.max(0, Math.min(state.parentWH.width, state.cursorPos + offset))
  cursor.value.style.setProperty('--offset', pos + 'px')
  left.value.style.setProperty('--offset', pos + 'px')
  right.value.style.setProperty('--offset', pos + 'px')
  state.posStore = pos
}
</script>

<style lang="scss">
.compare-cmpt {
  --offset: 0px; /* Add initial CSS variable for offset */
}
.left, .right, .cursor {
  transition: var(--transition-time); /* Example transition time */
  /* Your existing CSS properties */
}
.compare-cmpt {
  position: relative;
  user-select: none;

  img {
    pointer-events: none;
    margin: 0 !important;
  }
}
</style>


<style lang="stylus" scoped>
.compare-cmpt {
  position: relative;
  user-select: none;

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
