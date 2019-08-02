# Object.create

## usage

```js
const student = {
  name: null,
  class: null
}

const me = Object.create(student, { ide: { value: 'VSCode' } })

me.ide = 'change ide' // 不能修改, 因为省略了 `writable:true`
me.name = 'Lionad'
me.class = 'javascript engineer'

/** me
 * {
 *   name: 'Lionad',
 *   class: 'javascript engineer',
 *   ide: 'VSCode',
 *   [[prototype]]: { name: null, class: null }
 * }
 */
```

## polyfill

```js
if (!('create' in Object)) {
  Object.create = function (proto, props) {
    const F = new Function()
    const obj = new F()

    F.prototype = proto
    for (key in (props || {})) {
      Object.defineProperties(obj, props)
    }

    return obj
  }
}
```

<Comments />

