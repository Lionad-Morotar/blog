/** walkChains
 * 解析对象的链式调用语法
 * @arg {string} chainStr 传入的链式语法，如：'a.b.c'
 * @arg {object} obj 对饮的对象
 * @arg {function} fn 每次解析都要执行的副作用
 */
function walkChains(chainStr = '', obj = {}, fn) {
    const keys = chainStr.split('.')
    let deepObj = obj

    while (deepObj && keys.length) {
        const key = keys.shift()
        deepObj = deepObj[key]

        // console.log(key, deepObj)

        fn && fn(key, deepObj, keys)
    }

    return deepObj
}

/**
 * 将对象转为合法的 query 字符串
 * @param {object} obj
 */
function serializeQuery(obj = {}) {
    // console.log('serializeQuery : ', obj)
    const res = []

    Object.keys(obj).map(key => {
        const value = obj[key]

        if (value instanceof Object) {
            if (value instanceof Array) {
                value.length ? value.map(x => res.push(`${key}=${x}`)) : res.push(key)
            } else {
                res.push(`${key}=${encodeURIComponent(JSON.stringify(value))}`)
            }
        } else {
            res.push(`${key}=${value}`)
        }
    })

    return '?' + res.join('&')
}

/**
 * 获取地址字符串中某个 query 的值
 * @param {string} name query name
 * @param {url} url 默认为当前页面地址
 */
function getQuery(name, url = window.location.href) {
    const match = url.match(new RegExp(`[?|&]${name}=([^&$]+)`))
    return match ? decodeURI(match[1]) : null
}

/** add
 * document.createElement 的替代品，除了创建节点，
 * 同时可以设置节点的 Attributes
 * @param {string} tagName 有效的 HTML 标签名或者是普通字符串，见下 validTagNames 定义
 * @param {object} options 将其键值设置到 DOM Attributes 上
 * @param {object, string} inner 子节点或是普通字符串
 * @return 返回生成的 DOM 节点
 */
const validTagNames = ['img', 'li', 'p', 'div', 'span']
function add(tagName, options, inner) {
    const handle = validTagNames.includes(tagName) ? document.createElement(tagName) : add('span', options, tagName)

    if (options) {
        Object.keys(options).map(key => handle.setAttribute(key, options[key]))
    }

    if (inner) {
        if (inner instanceof Array) {
            inner.map(item => handle.appendChild(item))
            return handle
        }
        inner instanceof Object ? handle.appendChild(inner) : (handle.innerText = inner)
    }

    return handle
}

export default {
    add,
    serializeQuery,
    getQuery,
    walkChains
}
