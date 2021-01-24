# 【绘画系列】书封展示

## 实例

<label>Open fullscreen: </label>
<input class="book-ppt-fs-select" type="checkbox" />
<WHRatio h="68%">
  <div class="book-ppt">
    <div class="paper" />
    <div class="book">
      <div class="cover">
        <img src="https://mgear-blog-image.obs.cn-east-3.myhuaweicloud.com/douban/s29779230.jpg" />
      </div>
      <img class="corner" src="https://mgear-blog-image.obs.cn-east-3.myhuaweicloud.com/douban/s29779230.jpg" />
    </div>
  </div>
  <svg width="0" height="0">
    <filter id="paper">
      <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
      <feDiffuseLighting in='noise' lighting-color='white' surfaceScale='1' result="grind">
        <feDistantLight azimuth='500' elevation='50' />
      </feDiffuseLighting>
      <feGaussianBlur in="grind" stdDeviation=".7"/>
    </filter>
  </svg>
</WHRatio>

<style>
  .book-ppt-fs-select:checked {
    position: fixed;
    top: 1em;
    left: 0;
    width: 100%;
    line-height: 3em;
    font-size: 1em;
    color: rgba(0,0,0,0.7);
    text-align: center;
    z-index: 99999;
  }
  .book-ppt-fs-select:checked:before {
    content: 'Close fullscreen';
  }
  .book-ppt-fs-select:checked + .wh-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99998;
  }
  .book-ppt {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .book-ppt .paper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(ellipse at 100% 0%, #7f96cd, #5d7db5);
  }
  .book-ppt .paper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: url(#paper);
    background-blend-mode: lighten;
  }
  .book-ppt .book {
    position: relative;
    margin-top: -1vh;
    width: 32%;
    font-size: 0;
    box-shadow: -55px 40px 30px 0 rgba(0,0,0,0.1), -27px 25px 35px -5px rgba(0,0,0,0.68);
  }
  .book-ppt .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .book-ppt .corner {
    filter: blur(1px);
    z-index: 1;
  }
  .book-ppt .book::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-repeat: no-repeat;
    background-image: linear-gradient(to right, rgba(0,0,0,0.15) 0.4%, rgba(255,255,255,0.15) 1.2%, transparent 1.2%);
    background-size: 50% 100%;
    background-position: 9% top;
  }
</style>