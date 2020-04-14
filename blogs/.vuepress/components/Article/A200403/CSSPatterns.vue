<template>
  <div class="container">
    <div class="card">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card">
      <div class="node" v-for="item in 100"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .card {
    margin: 0 10px 20px 0;
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .node {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: 20px;
      height: 20px;
      flex-basis: 20px;

      &::before,
      &::after {
        content: ' ';
        position: absolute;
        z-index: 1;
      }
    }
  }
}
@media screen and (max-width: 760px) {
  .container {
    flex-direction: column;

    .card {
      margin-right: 0;
    }
  }
}
/** Segment: CSS Pattern Start */
.card:nth-child(1) {
  .node {
    background: #A45963;
    border-radius: 90%;
    animation: card-4 .4s ease alternate infinite;

    &:nth-child(2n) {
      animation-delay: .2s;
    }
    &:nth-child(3n) {
      animation-delay: .3s;
    }
    &:nth-child(4n) {
      animation-delay: .3s;
    }

    @keyframes card-4 {
      from {
        height: 19px;
      }
      to {
        height: 8px;
      }
    }

    &:nth-child(2n)::before {
      border-bottom-color: #F5CB6C;
    }
    &:nth-child(3n)::before {
      border-bottom-color: #F5856C;
    }
    &:nth-child(4n)::before,
    &:nth-child(5n)::before,
    &:nth-child(6n)::before,
    &:nth-child(7n)::before,
    &:nth-child(8n)::before,
    &:nth-child(9n)::before,
    &:nth-child(10n)::before {
      border-bottom-color: #D2F3BF;
    }
    
    &::before {
      left: 0;
      top: -5px;
      border: solid 10px transparent;
      border-bottom-color: #D2F3BF;
      z-index: 2;
    }
    &::after {
      left: 1px;
      top: 1px;
      width: 19px;
      height: 18px;
      background: white;
    }
    &:nth-child(10n)::after {
      width: 18px;
    }
  }
}
.card:nth-child(3) {
  overflow: hidden;

  .node {
    background: #F5C1CB;
    filter: saturate(1.6);

    &:nth-child(10n)::before {
      transform: rotate(19deg);
    }
    &:nth-child(10n-1)::before {
      transform: rotate(18deg);
    }
    &:nth-child(10n-2)::before {
      transform: rotate(17deg);
    }
    &:nth-child(10n-3)::before {
      transform: rotate(16deg);
    }
    &:nth-child(10n-4)::before {
      transform: rotate(15deg);
    }
    &:nth-child(10n-5)::before {
      transform: rotate(14deg);
    }
    &:nth-child(10n-6)::before {
      transform: rotate(14deg);
    }
    &:nth-child(10n-7)::before {
      transform: rotate(13deg);
    }
    &:nth-child(10n-8)::before {
      transform: rotate(13deg);
    }
    &:nth-child(10n-9)::before {
      transform: rotate(12deg);
    }
    &::before {
      left: 0;
      top: -10px;
      border: solid 10px transparent;
      border-bottom-color: #D2F3BF;
      z-index: 1;
    }
    &::after {
      left: -5px;
      top: -5px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #FBF5C5;
      z-index: 0;
      box-shadow: 20px 0 #FBF5C5, 20px 20px #FBF5C5, 0 20px #FBF5C5;
    }
  }
}
.card:nth-child(2) {
  .node {
    background: #EE92A5;
    overflow: hidden;

    &::before {
      left: 8px;
      top: 8px;
      width: 2px;
      height: 2px;
      background: white;
      z-index: 0;
      box-shadow: 0 2px white, 2px 0 white, -2px 0 white, 0 -2px white;
    }
    &::after {
      left: -8px;
      top: -8px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #F8C798;
      z-index: 0;
      box-shadow: 20px 0 #F8C798, 20px 20px #F8C798, 0 20px #F8C798;
    }
    &:nth-child(2n)::after {
      background: #E03A5C;
    }
    &:nth-child(3n-1)::after,
    &:nth-child(3n)::after,
    &:nth-child(5n)::after,
    &:nth-child(6n)::after,
    &:nth-child(7n-3)::after {
      background: #F8C798
    }
  }
}
.card:nth-child(4) {
  .node {
    background: #71A2DB;
    outline: solid 1px white;

    &:nth-child(3n-1),
    &:nth-last-child(3n+1) {
      background: #C2D7F0;
    }

    &:nth-child(10n-9)::before,
    &:nth-child(10n)::after,
    &:nth-child(-n+10)::before,
    &:nth-last-child(-n+10)::after {
      display: none;
    }
    &::after {
      left: 75%;
      top: 75%;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: white;
      animation: card-1-normal 1s linear alternate infinite;
    }
    &:nth-child(2n)::after {
      animation: card-1-constract 1s linear alternate infinite;
      animation-delay: .3s;
    }
    @keyframes card-1-normal {
      from {
        left: 45%;
        top: 45%;
        opacity: 1;
        background: white;
      }
      to {
        left: 130%;
        top: 130%;
        opacity: 0;
        background: #F2C07D;
      }
    }
    @keyframes card-1-constract {
      from {
        left: 45%;
        top: 45%;
        opacity: 1;
        background: #F2C07D;
        z-index: 2;
      }
      to {
        left: 130%;
        top: 130%;
        opacity: 0;
        background: white;
      }
    }
  }
}
/** Segment: CSS Pattern End */
</style>
