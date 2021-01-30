# 【绘画系列】书封展示

[TOC]

## 演示

<div class="book-ppt-con">
  <label>Open fullscreen: </label>
  <input class="book-ppt-fs-select" type="checkbox" />
  <WHRatio h="68%">
    <div class="book-ppt">
      <div class="paper" />
      <div class="book">
        <div class="cover">
          <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s2709063811.jpg" />
        </div>
        <img class="corner" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s2709063811.jpg" />
      </div>
    </div>
    <svg width="0" height="0">
      <filter id="book-ppt-paper-1">
        <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
        <feDiffuseLighting in='noise' lighting-color='#004F85' surfaceScale='.8' result="grind">
          <feDistantLight azimuth='500' elevation='50' />
        </feDiffuseLighting>
        <feGaussianBlur in="grind" stdDeviation=".5"/>
      </filter>
    </svg>
  </WHRatio>
  <label>Open fullscreen: </label>
  <input class="book-ppt-fs-select" type="checkbox" />
  <WHRatio h="68%">
    <div class="book-ppt">
      <div class="paper" />
      <div class="book">
        <div class="cover">
          <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s2830217111.jpg" />
        </div>
        <img class="corner" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s2830217111.jpg" />
      </div>
    </div>
    <svg width="0" height="0">
      <filter id="book-ppt-paper-2">
        <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
        <feDiffuseLighting in='noise' lighting-color='#ddd' surfaceScale='.8' result="grind">
          <feDistantLight azimuth='500' elevation='50' />
        </feDiffuseLighting>
        <feGaussianBlur in="grind" stdDeviation=".5"/>
      </filter>
    </svg>
  </WHRatio>
  <label>Open fullscreen: </label>
  <input class="book-ppt-fs-select" type="checkbox" />
  <WHRatio h="68%">
    <div class="book-ppt">
      <div class="paper" />
      <div class="book">
        <div class="cover">
          <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s3360190011.jpg" />
        </div>
        <img class="corner" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s3360190011.jpg" />
      </div>
    </div>
    <svg width="0" height="0">
      <filter id="book-ppt-paper-3">
        <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
        <feDiffuseLighting in='noise' lighting-color='#7F191D' surfaceScale='.8' result="grind">
          <feDistantLight azimuth='500' elevation='50' />
        </feDiffuseLighting>
        <feGaussianBlur in="grind" stdDeviation=".5"/>
      </filter>
    </svg>
  </WHRatio>
</div>

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
  .book-ppt-fs-select:checked + .wh-container .book {
    min-width: 300px;
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
  }
  .book-ppt .paper::before,
  .book-ppt .paper::after,
  .book-ppt .cover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .book-ppt-con .wh-container:nth-child(3) .paper::before {
    filter: url(#book-ppt-paper-1);
  }
  .book-ppt-con .wh-container:nth-child(6) .paper::before {
    filter: url(#book-ppt-paper-2);
  }
  .book-ppt-con .wh-container:nth-child(9) .paper::before {
    filter: url(#book-ppt-paper-3);
  }
  /* 纸的高光 */
  .book-ppt .paper::after {
    background: radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.25), rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.15) 70%, rgba(0,0,0,.1));
  }
  /* 书封面高光 */
  .book-ppt .cover::after {
    background: radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0.13) 30%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,.1));
  }
  /* 书籍的阴影 */
  .book-ppt .book {
    position: relative;
    margin-top: -1vh;
    margin-right: -1vh;
    width: 32%;
    max-width: 600px;
    font-size: 0;
    box-shadow: 
      -55px 40px 30px 0 rgb(0 0 0 / 10%), 
      -27px 25px 35px -5px rgb(0 0 0 / 20%),
      -10px 10px 15px 5px rgb(0 0 0 / 10%), 
      -12px 12px 10px 0 rgb(0 0 0 / 20%),
      -7px 7px 8px 0 rgb(0 0 0 / 10%),
      -5px 5px 5px 0 rgb(0 0 0 / 20%),
      -2px 2px 3px 0 rgb(0 0 0 / 30%);
    filter: drop-shadow(-20px 20px 15px rgba(0 0 0 / 65%));
  }
  .book-ppt .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .book-ppt .cover img { 
    border-radius: 2px;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
  }
  .book-ppt .corner {
    filter: blur(1px);
  }
  /* 书的褶皱 */
  .book-ppt .book::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-repeat: no-repeat;
    background-image: 
      linear-gradient(to right, rgba(0,0,0,0.2) 0, rgba(255,255,255,0.18) 1%, transparent 1%),
      linear-gradient(to right, rgba(0,0,0,0.1) 0.2%, rgba(255,255,255,0.35) 1%, transparent 1.3%);
    background-size: 50% 100%, 50% 100%;
    background-position: 0% top, 9% top;
  }
</style>

## 解析

* 背景的磨砂质感使用 SVG 绘制。
* 在磨砂背景上叠加了一层来自右上角的 radial-gradient 渐变仿制点光源。
* 书的褶皱使用 linear-gradient 渐变绘制。
* 书的边缘进行了模糊处理。
* 阴影使用了多重阴影。

## 代码

磨砂滤镜代码示例：

```html
<svg width="0" height="0">
  <filter id="book-ppt-paper-1">
    <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
    <feDiffuseLighting in='noise' lighting-color='#004F85' surfaceScale='.8' result="grind">
      <feDistantLight azimuth='500' elevation='50' />
    </feDiffuseLighting>
    <feGaussianBlur in="grind" stdDeviation=".5"/>
  </filter>
</svg>
```