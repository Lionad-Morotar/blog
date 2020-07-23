![Blog](https://img.shields.io/badge/Lionad--Guirotar-Blog-blueviolet)
![MIT](https://img.shields.io/badge/License-MIT-blue)

# Lionad's Blog

My personal websites，build with VuePress, you can visit at here: [http://www.lionad.art](http://www.lionad.art)

* [RSS Address](http://lionad.art/rss.xml)

## Homepage

<img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/assets/home.png" alt="Homepage" style="border: 1px solid" />

## Readpage

<img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/assets/browser_AglRWSCUjO.png" alt="main page" style="border: 1px solid" />

## Components

### Gestures

Catch mouse events, mousewheel events and mobile events.

* Usage

```HTML
<Gesture :swipeDown="() => {}" :swipeTopLeft="() => {}" freezeTime="300">
    <Children />
</Gesture>
```

* Props

```js
// gestures
{
    'tap',
    // 'longtap',
    // 'doubletap',
    // 'swipe',
    // 'swipeLeft',
    // 'swipeRight',
    'swipeUp',
    'swipeDown',
    // 'swipeTopLeft',
    // 'swipeTopRight',
    // 'swipeDownLeft',
    // 'swipeDownRight'
    // 'rotate'
}
// props
{
    freezeTime, // debounce time interval
    eventInvoke, // pass events to outside then do e.preventDefault or e.stopPropagation
}
```

### Sparkles

Create bling-bling-stars.

![Homepage](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/assets/bling.gif)

* Usage

```HTML
<Spark>
    <Children />
</Spark>
```

* Props

```js
{
    color, // 星星的颜色，默认为黄色，可以传入颜色值或者 colors 对象内的键名，也支持直接传入数组
    minDelay, // 最小生成延迟
    maxDelay, // 最大生成延迟
}
```

### Mathjax

![Homepage](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/assets/2020-07-23-17-07-37.png)

* usage

```md
<details>
  <summary>一句话解释为什么 <Math>$0.1 + 0.2 != 0.3$</Math></summary>
  <p><Math>$a(\approx 0.1) + b(\approx 0.2) \approx 0.3$</Math></p>
</details>
```
