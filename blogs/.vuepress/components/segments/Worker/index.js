function create(work) {
    /** Defend */
    if (!(work instanceof Function)) {
        const error = new TypeError(`Only function supported.\nReceived: ${work}`)
        console.error(error)
        throw error
    }

    const worker = createWorker(work)

    const instance = new Promise((resolve, reject) => {
        worker.onmessage = ({ data }) => {
            resolve(data)
            worker.terminate()
        }
        worker.onerror = err => {
            console.error(`Error: Line ${err.lineno} in ${err.filename}: ${err.message}`)
            reject(err)
            worker.terminate()
        }
    })

    instance.pass = function(args) {
        receiveArgs.bind(worker)(args)
        return instance
    }

    return instance
}

/**
 * 根据 Fn 创造一个 Worker，Worker 接受参数时，给 Fn 传参并运行
 * @param {Fn} fn 函数应该是函数式的，且不与 Window Document 等对象有交互，同时需要注意 Worker 传参的基本原理（传值而非引用），举例可以是: nums => nums.sort()
 * @see 学习 Worker 相关知识可以参见：http://www.ruanyifeng.com/blog/2018/07/web-worker.html?20190318210447
 */
function createWorker(fn) {
    const blob = new Blob([
        `
        self.onmessage = ({ data }) => {
            const result = (${fn.toString()})(data)
            self.postMessage(result)
        }
        `
    ])
    const url = window.URL.createObjectURL(blob)
    const worker = new Worker(url)
    return worker
}

/** 把传递的参数转换为数组 */
function receiveArgs(args) {
    /** Defend */
    if (!(args instanceof Array)) {
        const error = new TypeError(`Only arrays supported.\nReceived: ${args}`)
        console.error(error)
        throw error
    }
    const pass = new Uint32Array(new ArrayBuffer(args.length * 4))

    for (let i = 0; i < pass.length; ++i) {
        pass[i] = args[i]
    }

    this.postMessage(pass)
}

/** Export */
export default {
    install(Vue, name = '$worker') {
        Object.defineProperty(Vue.prototype, name, { value: { create } })
    }
}
