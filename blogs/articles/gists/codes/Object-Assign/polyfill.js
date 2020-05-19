function ObjectAssignPolyfill(target, ...args) {
    if (!target) {
        throw TypeError('Target should be an object')
    }
    let i = 0
    while (i++ < args.length) {
        if (args[i]) {
            for (let key in args[i]) {
                target[key] = args[i][key]
            }
        }
    }
    return target
}

console.log(
    ObjectAssignPolyfill(
        {},
        null,
        undefined,
        '123',
        true,
        false,
        { a: 'a' }
    )
)
