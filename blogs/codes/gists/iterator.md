# iterator

迭代器模式应该是简单到不像是'设计模式'的设计模式了, 因为几乎所有语言都内置了循环的使用, 以下为 `mgear` 项目中计算窗口样式的一段代码

```js
// ...
computed: {
  bodyStyles: {
    get () {
      const stylesToMatch = {
        minimized: () => {
          return this.win.minimized ? {} : false
        },
        fullScreenInBody: () => {
          return this.win.fullScreenInBody ? {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
          } : false
        },
        default: () => {
          return {
            width: utils.toPX(this.win.width),
            height: utils.toPX(this.win.height),
            top: utils.toPX(this.win.top),
            left: utils.toPX(this.win.left)
          }
        }
      }

      const pattern = Object.keys(stylesToMatch)
      let result = null
      let matched = null

      while (!result) {
        result = stylesToMatch[matched = pattern.pop()]()
      }
      console.assert(!pattern.includes(matched), '获取窗口样式出错', matched)
      return result
    }
  }
}
// ...
```