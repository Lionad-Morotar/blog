# 【CSS】名片展示

[TOC]

## 效果演示

<!-- Structure of visiting-card -->
<WHRatio h="68%">
<div class="css-visiting-card-con">
  <div class="css-visiting-card">
    <div class="cover bottom-cover" style="background: red;">
      <!-- <div class="paper" />
      <div class="brand-name">Picks & Peaks</div>
      <div class="brand-info">www.lionad.art - @baxing</div>
      <div class="owner-name">Leo Morotar</div> -->
    </div>
    <div class="cover top-cover">
      <div class="paper" />
      <div class="brand-name">Picks & Peaks</div>
      <div class="brand-info">www.lionad.art - @baxing</div>
      <div class="owner-name">Leo Morotar</div>
    </div>
  </div>
</div>
</WHRatio>

<!-- SVG resources -->
<svg width="0" height="0">
  <filter id="paper">
    <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
    <feDiffuseLighting in='noise' lighting-color='#ddd' surfaceScale='.8' result="grind">
      <feDistantLight azimuth='500' elevation='50' />
    </feDiffuseLighting>
    <feGaussianBlur in="grind" stdDeviation=".5"/>
  </filter>
</svg>
<svg width="0" height="0">
  <filter id="paper-top">
    <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
    <feDiffuseLighting in='noise' lighting-color='#b52e31' surfaceScale='.8' result="grind">
      <feDistantLight azimuth='500' elevation='50' />
    </feDiffuseLighting>
    <feGaussianBlur in="grind" stdDeviation=".5"/>
  </filter>
</svg>

<!-- Style resources -->
<style>
.css-visiting-card-con {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  background: rgb(12, 12, 12);
  overflow: hidden;
  user-select: none;
}
.css-visiting-card {
  position: relative;
  width: 480px;
  height: 300px;
  perspective: 60em;
  will-change: auto;
}
.css-visiting-card .bottom-cover,
.css-visiting-card .top-cover {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.5em;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transition: transform .7s ease;
  transform-style: preserve-3d;
}
.css-visiting-card .bottom-cover {
  transform: rotateY(0deg) translateZ(1px);
}
.css-visiting-card .top-cover {
  transform: rotateY(0deg) translateZ(-1px);
}
.css-visiting-card .paper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.css-visiting-card .paper::before,
.css-visiting-card .paper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* 纸面纹理 */
.css-visiting-card .top-cover .paper::before {
  filter: url(#paper-top);
}
.css-visiting-card .bottom-cover .paper::before {
  filter: url(#paper);
}
/* 纸面高光 */
.css-visiting-card .paper::after {
  background: radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.2), rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,.1));
}
/* 浮雕文字 */
.css-visiting-card .brand-name,
.css-visiting-card .brand-info,
.css-visiting-card .owner-name {
  position: relative;
  width: 100%;
  font: 80px garamond;
  color: transparent;
  text-align: center;
  letter-spacing: 0;
  text-shadow: 0 1px 2px rgb(255 255 255 / 25%), 0 -1px 2px rgb(0 0 0 / 9%);
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
.css-visiting-card .top-cover .brand-name,
.css-visiting-card .top-cover .brand-info,
.css-visiting-card .top-cover .owner-name {
  transform: matrix(1, 0, 0, 1, 0, 0);
}
.css-visiting-card .brand-info {
  font: bold 12px san-serif;
  color: #666;
  letter-spacing: 2px;
  text-shadow: unset;
  text-transform: uppercase;
  transform: unset;
  -webkit-font-smoothing: subpixel-antialiased;
}
.css-visiting-card .top-cover .brand-info {
  opacity: 0;
}
.css-visiting-card .owner-name {
  font-size: 52px;
}
/* 卡片翻转 */
.css-visiting-card-con:hover .css-visiting-card .bottom-cover {
  transform: rotateY(180deg) translateZ(-1px);
}
.css-visiting-card-con:hover .css-visiting-card .top-cover {
  transform: rotateY(180deg) translateZ(1px);
}
</style>

## 灵感来源

* [Grind and Glaze on Behance](https://www.behance.net/gallery/76169197/Grind-and-Glaze?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A%20behance%2Fvorr%20%28Behance%20Network%20Featured%20Projects%29)