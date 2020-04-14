<template>
  <div class="container">
    <div class="card 1">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card 2">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card 3">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card 4">
      <div class="node" v-for="item in 100"></div>
    </div>
    <div class="card 5">
      <div class="node"></div>
    </div>
    <div class="card 6">
      <div class="card-content">
        <div class="node" v-for="item in 6"></div>
      </div>
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
  &:hover {
    .node {
      &:nth-child(2n)::before {
        border-bottom-color: #D2F3BF;
      }
      &:nth-child(3n)::before {
        border-bottom-color: #F5CB6C;
      }
      &:nth-child(4n)::before,
      &:nth-child(5n)::before,
      &:nth-child(6n)::before,
      &:nth-child(7n)::before,
      &:nth-child(8n)::before,
      &:nth-child(9n)::before {
        border-bottom-color: #F5856C;
      }
    }
  }

  .node {
    background: #A45963;
    border-radius: 90%;
    animation: card-1 .4s ease alternate infinite;

    &:nth-child(2n) {
      animation-delay: .2s;
    }
    &:nth-child(3n) {
      animation-delay: .3s;
    }
    &:nth-child(4n) {
      animation-delay: .3s;
    }

    @keyframes card-1 {
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

  &:hover {
    .node {
      &:nth-child(10n)::before {
        transform: rotate(10deg);
      }
      &:nth-child(10n-1)::before {
        transform: rotate(11deg);
      }
      &:nth-child(10n-2)::before {
        transform: rotate(12deg);
      }
      &:nth-child(10n-3)::before {
        transform: rotate(13deg);
      }
      &:nth-child(10n-4)::before {
        transform: rotate(14deg);
      }
      &:nth-child(10n-5)::before {
        transform: rotate(15deg);
      }
      &:nth-child(10n-6)::before {
        transform: rotate(16deg);
      }
      &:nth-child(10n-7)::before {
        transform: rotate(17deg);
      }
      &:nth-child(10n-8)::before {
        transform: rotate(18deg);
      }
      &:nth-child(10n-9)::before {
        transform: rotate(19deg);
      }
    }
  }

  .node {
    background: #F5C1CB;
    filter: saturate(1.6);

    &:nth-child(10n)::before {
      transform: rotate(-19deg);
    }
    &:nth-child(10n-1)::before {
      transform: rotate(-18deg);
    }
    &:nth-child(10n-2)::before {
      transform: rotate(-17deg);
    }
    &:nth-child(10n-3)::before {
      transform: rotate(-16deg);
    }
    &:nth-child(10n-4)::before {
      transform: rotate(-15deg);
    }
    &:nth-child(10n-5)::before {
      transform: rotate(-14deg);
    }
    &:nth-child(10n-6)::before {
      transform: rotate(-13deg);
    }
    &:nth-child(10n-7)::before {
      transform: rotate(-12deg);
    }
    &:nth-child(10n-8)::before {
      transform: rotate(-11deg);
    }
    &:nth-child(10n-9)::before {
      transform: rotate(-10deg);
    }
    &::before {
      left: 0;
      top: -8px;
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
    transition: .3s;

    &:hover {
      transform: scale(1.4);
    }

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
  &:hover {
    .node {
      &:nth-child(2n)::after {
        visibility: unset;
      }
    }
  }

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
      animation: card-4-normal 1s linear alternate infinite;
    }
    &:nth-child(2n)::after {
      animation: card-4-constract 1s linear alternate infinite;
      animation-delay: .3s;
      visibility: hidden;
    }
    @keyframes card-4-normal {
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
    @keyframes card-4-constract {
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
.card:nth-child(5) {
  background: linear-gradient(45deg, #F5CB6C 0%,#F5CB6C 20%,#F5856C 20%, #F5856C 45%,#F5CB6C 45%,#F5CB6C 70%,#F5856C 70%, #F5856C 95%,#F5CB6C 95%,#F5CB6C 100%);
  background-size:30px 30px;
  background-position:0 0;
  animation: card-5 1s infinite linear;

  &:hover {
    animation-play-state: paused;
    // animation-direction: alternate;
  }

  .node {
    &::before {
      content: "Lionad";
      left: -1.5em;
      top: -.7em;
      font-size: 50px;
      font-family: didot;
      font-weight: bolder;
      color: transparent;
      background: linear-gradient(180deg, #F5CB6C, #F5856C);
      background-size: 1px 2px;
      background-clip: text;
      -webkit-background-clip: text;
      // animation: card-5 1s infinite linear;
      z-index: 2;
    }
    &::after {
      content: "Lionad";
      left: -1.5em;
      top: -.7em;
      font-size: 50px;
      font-family: didot;
      font-weight: bolder;
      color: transparent;
      text-shadow: 4px 4px 0px #F5856C;
      box-shadow: 0 5px 0px #F5CB6C, 0 12px 0px #F5856C;
    }
  }
  @keyframes card-5 {
    0%{
      background-position: 0 0;
    }
    100%{
      background-position: 30px 0;
    }
  }
}
.card:nth-child(6) {
  border: solid 1px #888;
  background: white;
  -webkit-filter: contrast(10);

  .card-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    clip-path: polygon(50% 30%, 100% 45%, 100% 55%, 50% 70%, 0% 50%);

    &:hover {
      .node {
        animation-play-state: paused;
      }
    }
  }

  .node {
    flex-basis: 30px;
    margin-right: -15px;
    width: 30px;
    height: 50px;
    filter: blur(5px);

    &:nth-child(1) {
      animation: card-6 .7s ease-in .1s alternate infinite, card-6-margin .7s ease-in alternate infinite;
      background: #F5E66C;
    }
    &:nth-child(2) {
      animation: card-6 .7s ease-in .2s alternate infinite, card-6-margin .7s ease-in alternate infinite;
      background: #F5866C;
    }
    &:nth-child(3) {
      animation: card-6 .7s ease-in .3s alternate infinite, card-6-margin .7s ease-in alternate infinite;
      background: #F5866C;
    }
    &:nth-child(4) {
      animation: card-6 .7s ease-in .4s alternate infinite, card-6-margin .7s ease-in alternate infinite;
      background: #E7667E;
    }
    &:nth-child(5) {
      animation: card-6 .7s ease-in .5s alternate infinite, card-6-margin .7s ease-in alternate infinite;
      background: #E7667E;
    }
    &:nth-child(6) {
      animation: card-6 .7s ease-in .6s alternate infinite, card-6-margin .7s ease-in alternate infinite;
      background: #DA60D2;
    }
  }
  @keyframes card-6 {
    from {
      height: 30px;
      border-radius: 50%;
    }
    to {
      height: 60px;
      border-radius: 0;
    }
  }
  @keyframes card-6-margin {
    from {
      margin-right: -15px;
    }
    to {
      margin-right: -10px;
    }
  }
}
/** Segment: CSS Pattern End */
</style>
