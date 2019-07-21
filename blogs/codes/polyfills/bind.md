# Function.prototype.bind

## usage

```js
function example() {
  console.log(this)
}
const boundExample = bind(example, { a: true })
boundExample.call({ b: true }) // logs { a: true }
```

## polyfill

```js
if (!('bind' in Function)) {
  Function.prototype.bind = (fn, context) => (...args) => fn.apply(context, args)
}
```

<Comments />

