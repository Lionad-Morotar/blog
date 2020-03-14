<template>
  <div class="loading">
    <div class="loading__triangle" />
    <div class="loading__loading-box"></div>
    <div class="loading__view-box">
      <div class="loading__loading">
        <div />
      </div>
    </div>
    <div class="loading__end">
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  mounted() {},
  destroyed() {},
  methods: {}
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
}

/**
 * frame
 */
.loading__triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 200%;
    height: 100%;
    background-color: #43445b;
    opacity: 0;
  }
  &::before {
    right: 0;
    bottom: 100%;
    transform-origin: right bottom;
  }
  &::after {
    left: 0;
    top: 100%;
    transform-origin: left top;
  }
}
@include pc-layout {
  .loading__triangle:before,
  .loading__triangle:after {
    transform: rotate(-2deg);
  }
}
@include sp-layout {
  .loading__triangle:before,
  .loading__triangle:after {
    transform: rotate(-6deg);
  }
}

/**
 * box
 */
.loading__loading-box {
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
    background-color: #43445b;
    border-radius: 50%;
    transform: scale(0);
  }
  &::before {
    opacity: 0.1;
  }
}
@include pc-layout {
  .loading__loading-box {
    top: calc(50% - 325px);
    left: calc(50% - 325px);
    width: 650px;
    height: 650px;
  }
}
@include sp-layout {
  .loading__loading-box {
    top: calc(50% - (50vw - 10px));
    left: 10px;
    width: calc(100vw - 20px);
    height: calc(100vw - 20px);
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

/*** loading ***/
.loading__loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    opacity: 0;
  }

  div {
    position: absolute;
    overflow: hidden;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
    }
    &::before {
      background-image: url(../../public/images/loading/loading.svg);
      background-size: auto 70%;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
    }
    &::after {
      background-color: #fff;
      transform: translateX(-100%);
    }
  }
}
@include pc-layout {
  .loading__loading div {
    top: calc(50% - 25px);
    left: calc(50% - 225px);
    width: 450px;
    height: 50px;
  }
  .loading__loading::before {
    top: 20px;
    left: 20px;
    border-top: solid 10px #fff;
    border-bottom: solid 10px #fff;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
  }
}
@include sp-layout {
  .loading__loading div {
    top: calc(50% - 20px);
    left: 20px;
    width: calc(100% - 40px);
    height: 40px;
  }
  .loading__loading::before {
    top: 10px;
    left: 10px;
    border-top: solid 5px #fff;
    border-bottom: solid 5px #fff;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }
}

/**
 * end
 */
.loading__end {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    width: 40px;
    height: 40px;
    background-color: $color-yellow-main;
  }

  div {
    position: absolute;
    top: calc(50% - 50vmax);
    left: calc(50% - 50vmax);
    width: 100vmax;
    height: 100vmax;
    transform: scale(0);
  }
  div:nth-child(1) {
    background-color: $color-yellow-main;
  }
  div:nth-child(2) {
    background-color: $color-red-main;
  }
  div:nth-child(3) {
    background-color: #fff;
  }
}

/*************************************************************************************
 * animation
 *************************************************************************************/
$start-delay: 0s;
$triangle-in: 0.5s;
$loading-start: 0.9s;
$loading-end: 4.6s;

.loading {
  .loading__loading-box:before {
    animation: loading__scale-box 1s ease $start-delay forwards;
  }
  .loading__triangle {
    &::before,
    &::after {
      animation: fadein 1s ease $triangle-in forwards;
    }
  }
  .loading__loading-box {
    animation: loading__turn-search-wrapper 1s ease $loading-start forwards;
  }
  .loading__loading-box:after {
    animation: loading__scale-box 1s ease $loading-start forwards;
  }
  .loading__loading {
    &::before {
      animation: fadein 1s ease $loading-start forwards,
        -turn1 7s ease $loading-start forwards;
    }
    div:after {
      animation: slide-right 0.4s ease $loading-start + 0.2s forwards,
        slide-left 0.4s ease $loading-start + 0.4s reverse forwards;
    }
    div:before {
      animation: fadein 0.05s ease $loading-start + 0.35s forwards;
    }
  }
  .loading__end {
    animation: slide-bottom 0.5s ease $loading-end forwards;
    &::before {
      animation: -turn1 1s linear $loading-end infinite;
    }

    div:nth-child(1) {
      animation: loading__end 0.5s ease $loading-end + 0.35s forwards;
    }
    div:nth-child(2) {
      animation: loading__end 0.5s ease $loading-end + 0.5s forwards;
    }
    div:nth-child(3) {
      animation: loading__end 0.5s ease $loading-end + 0.55s forwards;
    }
  }
}

@keyframes loading__bloom-flower {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes loading__show-search-btn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

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

@keyframes loading__input-word {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes loading__input-word__sp {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes loading__end {
  from {
    transform: scale(0) rotate(0deg);
  }
  to {
    transform: scale(1) rotate(-90deg);
  }
}
</style>
