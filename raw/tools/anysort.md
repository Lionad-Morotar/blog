# 🌐 AnySort

> 符合直觉、类型完备的多属性排序方法


  ![undefined](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/LOGO.jpg)


  **Anysort：符合直觉、类型完备的多属性排序方法**


  ![undefined](https://img.shields.io/badge/Coverage-98%25-83A603.svg?prefix=$coverage$)
  <span>



</span>


  [
    ![MIT License](https://img.shields.io/github/license/Lionad-Morotar/anysort)
  ](https://github.com/Lionad-Morotar/anysort/blob/main/LICENSE)

## Why Anysort

A picture is worth a thousand words.


  ![undefined](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/simple-usage.png)

project moved from [Lionad-Morotar/anysort-old](https://github.com/Lionad-Morotar/any-sort-old)

## Install

```sh [Terminal]
npm install --save anysort-typed
```

## Why Anysort

- Anysort can sort with multi-attributes

```js
// select articles which has 'it' tag, put ahead,
// then move articles which status is 'editing' at the beginning
anysort(articles)
  .tag.has('it')
  .status.is('editing')
  .map(print)
```

- Intuitive

```js
// Array.prototype.sort: what hell the result is!
[].sort.apply([0, '0', 1, 'd', '1', '0', 0, ''])
// ['', 0, '0', '0', 0, 1, '1', 'd']

// Anysort：the result is intuitive
anysort([0, '0', 1, undefined, 'd', '1', '0', null, 0, '', undefined])
// [0, 0, 1, '', '0', '0', '1', 'd']
```

- Flexible API

```js
// proxy chain api
anysort(articles).created.date.reverse()

// or
anysort(articles, 'created.date-reverse()')
```

- Full typed, even in call-with-string-mode, **AMAZING**!

```js
// @ts-expect-error
anysort(articles).tag.hass('it')
// @ts-expect-error
anysort(articles, 'created.date-unknownPlugin()')
// OK!
anysort(articles).created.date.reverse()
// OK!
anysort(articles, 'created.date-reverse()')
// @ts-expect-error
anysort(articles).created.date.reverse(123)
// @ts-expect-error
anysort(articles, 'created.date-reverse(123)')
```

- Zero dependencies（minified + gzip ≈ 3KB）
- Well tested, logic and type
- ~~WIP: Full API document~~, help wanted
- ~~WIP: Benchmark~~, help wanted

## Usage

Short instruction。

```js
const posts = getPosts()
const print = (x) => console.log(JSON.stringify(x))

// select articles being edited with IT tags,
// sorted by date in reverse order and time in positive order
anysort(posts, [
  'status-is(editing)',
  'tag-has(it)',
  'created.date-reverse()',
  'created.hour'
]).map(print)

// {"tag":["it"],"status":"editing","created":{"date":"2021-01-02T00:00:00.000Z","hour":23}}
// {"tag":["it"],"status":"editing","created":{"date":"2021-01-01T00:00:00.000Z","hour":16}}
// {"tag":["game","it"],"status":"editing","created":{"date":"2021-01-01T00:00:00.000Z","hour":23}}
// {"tag":["mp3"],"status":"","created":{"date":"2019-08-01T00:00:00.000Z","hour":23}}

// sick of using string manipulation?
// try this!
anysort(getPosts())
  .created.hour.result()
  .created.date.reverse()
  .tag.has('it')
  .status.is('editing')
  .map(print)

// {"tag":["it"],"status":"editing","created":{"date":"2021-01-02T00:00:00.000Z","hour":23}}
// {"tag":["it"],"status":"editing","created":{"date":"2021-01-01T00:00:00.000Z","hour":16}}
// {"tag":["game","it"],"status":"editing","created":{"date":"2021-01-01T00:00:00.000Z","hour":23}}
// {"tag":["mp3"],"status":"","created":{"date":"2019-08-01T00:00:00.000Z","hour":23}}

function getPosts () {
  return [
    {
      tag: ['mp3'],
      status: '',
      created: {
        date: new Date('2019-08-01'),
        hour: 23
      }
    },
    {
      tag: ['game', 'it'],
      status: 'editing',
      created: {
        date: new Date('2021-01-01'),
        hour: 23
      }
    },
    {
      tag: ['it'],
      status: 'editing',
      created: {
        date: new Date('2021-01-01'),
        hour: 16
      }
    },
    {
      tag: ['it'],
      status: 'editing',
      created: {
        date: new Date('2021-01-02'),
        hour: 23
      }
    }
  ]
}
```

## Full API Doc

TODO

## Change Log

See [ChangeLog.md](https://github.com/Lionad-Morotar/Anysort/blob/main/CHANGELOG.md)

## Dev & Test

```sh
# run test when files change in directory build
npm run watch:test

# modify source code then build
npm run build
```

## How this work

[《🌐 Anysort：灵活、优雅的多属性排序》](https://www.lionad.art/articles/anysort-2th)

## Pull & Request

See [TODO.MD](https://github.com/Lionad-Morotar/Anysort/blob/main/TODO.md)，help wanted!

## Related Projects

- [sort-by](https://github.com/kvnneff/sort-by)
- [array-sort](https://github.com/jonschlinkert/array-sort)
- [sort-on](https://github.com/sindresorhus/sort-on)
- [...](https://github.com/search?q=property+sort&type=Repositories)

## License

Copyright © 2021, [Lionad-Morotar](https://github.com/Lionad-Morotar).
Released under the MIT License.

<style>

html pre.shiki code .sbgvK, html code.shiki .sbgvK{--shiki-light:#E2931D;--shiki-default:#6F42C1;--shiki-dark:#B392F0}html pre.shiki code .s_sjI, html code.shiki .s_sjI{--shiki-light:#91B859;--shiki-default:#032F62;--shiki-dark:#9ECBFF}html pre.shiki code .stzsN, html code.shiki .stzsN{--shiki-light:#91B859;--shiki-default:#005CC5;--shiki-dark:#79B8FF}html .light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html.light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html.dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html pre.shiki code .sutJx, html code.shiki .sutJx{--shiki-light:#90A4AE;--shiki-light-font-style:italic;--shiki-default:#6A737D;--shiki-default-font-style:inherit;--shiki-dark:#6A737D;--shiki-dark-font-style:inherit}html pre.shiki code .sGLFI, html code.shiki .sGLFI{--shiki-light:#6182B8;--shiki-default:#6F42C1;--shiki-dark:#B392F0}html pre.shiki code .su5hD, html code.shiki .su5hD{--shiki-light:#90A4AE;--shiki-default:#24292E;--shiki-dark:#E1E4E8}html pre.shiki code .sP7_E, html code.shiki .sP7_E{--shiki-light:#39ADB5;--shiki-default:#24292E;--shiki-dark:#E1E4E8}html pre.shiki code .sjJ54, html code.shiki .sjJ54{--shiki-light:#39ADB5;--shiki-default:#032F62;--shiki-dark:#9ECBFF}html pre.shiki code .srdBf, html code.shiki .srdBf{--shiki-light:#F76D47;--shiki-default:#005CC5;--shiki-dark:#79B8FF}html pre.shiki code .s39Yj, html code.shiki .s39Yj{--shiki-light:#39ADB5;--shiki-default:#005CC5;--shiki-dark:#79B8FF}html pre.shiki code .sbsja, html code.shiki .sbsja{--shiki-light:#9C3EDA;--shiki-default:#D73A49;--shiki-dark:#F97583}html pre.shiki code .s_hVV, html code.shiki .s_hVV{--shiki-light:#90A4AE;--shiki-default:#005CC5;--shiki-dark:#79B8FF}html pre.shiki code .smGrS, html code.shiki .smGrS{--shiki-light:#39ADB5;--shiki-default:#D73A49;--shiki-dark:#F97583}html pre.shiki code .sfCm-, html code.shiki .sfCm-{--shiki-light:#90A4AE;--shiki-default:#6F42C1;--shiki-dark:#B392F0}html pre.shiki code .s99_P, html code.shiki .s99_P{--shiki-light:#90A4AE;--shiki-light-font-style:italic;--shiki-default:#E36209;--shiki-default-font-style:inherit;--shiki-dark:#FFAB70;--shiki-dark-font-style:inherit}html pre.shiki code .sVHd0, html code.shiki .sVHd0{--shiki-light:#39ADB5;--shiki-light-font-style:italic;--shiki-default:#D73A49;--shiki-default-font-style:inherit;--shiki-dark:#F97583;--shiki-dark-font-style:inherit}html pre.shiki code .skxfh, html code.shiki .skxfh{--shiki-light:#E53935;--shiki-default:#24292E;--shiki-dark:#E1E4E8}

</style>

---

- [AnySort](https://github.com/Lionad-Morotar/Anysort)
