var a, b

// example-1
a = { a: 1 }
b = { a: 2, b: 2 }
console.log('1: ', Object.assign(a, b))

// example-2
a = { a: 1 }
b = { b: 2 }
Object.defineProperties(b, {
    c: {
        value: 'hello',
        enumerable: false
    }
})
console.log('2: ', Object.assign(a, b))

// example-3
a = { a: 1 }
console.log('3: ', Object.assign(a, null))

// example-4
a = {}
b = { a: 2 }
Object.defineProperties(a, {
    a: {
        value: 'hello',
        writable: false,
        enumerable: true
    }
})
console.log('4: ', Object.assign(a, b))
