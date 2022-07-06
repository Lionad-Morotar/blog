# NodeJS Require

[TOC]

相关源码对应：

* [CommonJS Loader](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js)
* [CommonJS Helpers](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/helpers.js)

官方文档见：

* [Node Resolution Algorithm](https://nodejs.org/api/modules.html#modules_all_together)

## 功能简介

NodeJS 导入模块时有主要两个地方要注意：如何解析模块地址以及如何改善 IO 操作消耗大量的性能。

* **地址解析**：在 require 时，我们可以传入 fs、path、a/index.js、webpack 等各种参数，解析分两种情况：如果传入核心部件名或是相对路径名称，则直接导入模块；不然则从本目录开始寻找 node_modules 目录，没找到时递归回退直到系统根目录。
* **性能消耗**：所有加载过的模块都用 WeakMap 缓存下来，再次加载时，直接返回已经加载好的内容。

## 代码解析

### 模块初始化

模块实例上保存有 id、path、filename、loaded、children、exports 等信息，各有用处。

```js
function Module(id = '') {
    this.id = id
    this.path = path.dirname(id)
    this.exports = {}
    this.filename = null
    this.loaded = false
    this.children = []
}
```

#### 模块包装

模块引入本质上是调用 Require 函数去加载一段代码，并引入 exports 的结果。模块并不能直接引入，在初始化的时候，会通过 Wrapper 进行包装，也就是：

```js
// 传入了 exports、require、module、__filename、__dirname 这几个参数
(function(exports, require, module, __filename, __dirname) {
    /* 模块源码 */
})
```

源码中，使用数组 wrapper 定义了包装相关的代码，使用 wrap 函数定义了包裹动作，也就是给 xxx.js 简单的加上头部尾部。最后，通过一个 proxy 保护源对象，将可能的修改记录到 patched 变量。

```js
let patched = false
let wrap = function(script) {
    return Module.wrapper[0] + script + Module.wrapper[1]
}
const wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ', 
    '\n});'
]
// 修改 wrapper 时（set 或 Object.defineProperty），会被 patched 记录
let wrapperProxy = new Proxy(wrapper, {
    set(target, property, value, receiver) {
        patched = true
        return ReflectSet(target, property, value, receiver)
    },
    defineProperty(target, property, descriptor) {
        patched = true
        return ObjectDefineProperty(target, property, descriptor)
    }
})
ObjectDefineProperty(Module, 'wrap', {
    get() {
        return wrap
    },
    set(value) {
        patched = true
        wrap = value
    }
})
ObjectDefineProperty(Module, 'wrapper', {
    get() {
        return wrapperProxy
    },
    set(value) {
        patched = true
        wrapperProxy = value
    }
})
```

TODO 修改 wrapper 导致 patched 变动带来的影响

#### 数据缓存

##### module.parent

module.parent 属性用来表示第一次引入某模块的模块。比如，当 parent 为 null 时，就说明此模块不被其它模块引入，所以是执行程序的入口。我们来看看它的实现。

```js
// 首先定义了一个缓存 Map::moduleParentCache，用作缓存
const moduleParentCache = new SafeWeakMap()

function Module(id = '', parent) {
    // 实例化 Module 时，会将 this 的 parent 存到缓存中
    moduleParentCache.set(this, parent)
}

// 定义了取 parent 属性对应的方法
function getModuleParent() {
    return moduleParentCache.get(this)
}
ObjectDefineProperty(Module.prototype, 'parent', {
    get: pendingDeprecation
        ? deprecate(
              getModuleParent,
              'module.parent is deprecated due to accuracy issues. Please use ' +
                  'require.main to find program entry point instead.',
              'DEP0144'
          )
        : getModuleParent
})
```

##### 内置对象

内置对象即 http、path 等模块。

```json
[
  "assert",        "async_hooks",    "buffer",
  "child_process", "cluster",        "console",
  "constants",     "crypto",         "dgram",
  "dns",           "domain",         "events",
  "fs",            "http",           "http2",
  "https",         "inspector",      "module",
  "net",           "os",             "path",
  "perf_hooks",    "process",        "punycode",
  "querystring",   "readline",       "repl",
  "stream",        "string_decoder", "timers",
  "tls",           "trace_events",   "tty",
  "url",           "util",           "v8",
  "vm",            "worker_threads", "zlib"
]
```

```js
const builtinModules = []
for (const [id, mod] of NativeModule.map) {
    if (mod.canBeRequiredByUsers) {
        builtinModules.push(id)
    }
}

ObjectFreeze(builtinModules)
Module.builtinModules = builtinModules
```

### 模块导入

#### 自动后缀补全

导入一个模块时，如果模块名不带后缀，则会自动匹配其后缀。比如，require('a')，会自动匹配 'a'，'a.xxx'，'a/index.xxx'。

读取目录（'a'）听起来有些奇怪。其实主要逻辑一说就清楚了：如果目录下定义了 package.json 并在其中指定了 main 属性，便直接加载 main 指向的文件。

```js
// 获取 package.json 的 main 属性
function readPackageMain(requestPath) {
    const pkg = readPackage(requestPath)
    return pkg ? pkg.main : undefined
}

// 用作缓存已经加载过的 packageJSON
const packageJsonCache = new SafeMap()

// 读取 packageJSON
function readPackage(requestPath) {
    const jsonPath = path.resolve(requestPath, 'package.json')

    // 缓存中有，就从缓存中取
    const existing = packageJsonCache.get(jsonPath)
    if (existing !== undefined) return existing

    // 读取 packageJSON
    // path.toNamespacedPath 可不用理会，他相关 Windows 系统下的路径名前缀，和 Loader 本身无关系
    const result = packageJsonReader.read(path.toNamespacedPath(jsonPath))
    const json = result.containsKeys === false ? '{}' : result.string
    if (json === undefined) {
        packageJsonCache.set(jsonPath, false)
        return false
    }

    // 解析 json 并添加至缓存
    try {
        const parsed = JSONParse(json)
        const filtered = {
            name: parsed.name,
            main: parsed.main,
            exports: parsed.exports,
            imports: parsed.imports,
            type: parsed.type
        }
        packageJsonCache.set(jsonPath, filtered)
        return filtered
    } catch (e) {
        e.path = jsonPath
        e.message = 'Error parsing ' + jsonPath + ': ' + e.message
        throw e
    }
}

```

尝试依次读取 'a'，'a.xxx'，'a/index.xxx'：

```js
function tryPackage(requestPath, exts, isMain, originalPath) {
    const pkg = readPackageMain(requestPath)

    // 目录下不包含 package.json 则读取 index.xxx 文件
    if (!pkg) {
        return tryExtensions(path.resolve(requestPath, 'index'), exts, isMain)
    }

    const filename = path.resolve(requestPath, pkg)
    // 依次读取 'a'，'a.xxx'，'a/index.xxx'
    let actual =
        tryFile(filename, isMain) ||
        tryExtensions(filename, exts, isMain) ||
        tryExtensions(path.resolve(filename, 'index'), exts, isMain)

    // 如果上述逻辑读取失败了（比如 main 指向一个错误文件），回退为读取源目录下的 index.xxx 文件
    if (actual === false) {
        actual = tryExtensions(path.resolve(requestPath, 'index'), exts, isMain)

        // 报错：未找到 xxx 模块
        if (!actual) {
            const err = new Error(
                `Cannot find module '${filename}'. ` + 'Please verify that the package.json has a valid "main" entry'
            )
            err.code = 'MODULE_NOT_FOUND'
            err.path = path.resolve(requestPath, 'package.json')
            err.requestPath = originalPath
            throw err
        } else if (pendingDeprecation) {
            const jsonPath = path.resolve(requestPath, 'package.json')
            process.emitWarning(
                `Invalid 'main' field in '${jsonPath}' of '${pkg}'. ` +
                    'Please either fix that or report it to the module author',
                'DeprecationWarning',
                'DEP0128'
            )
        }
    }

    // 没有报错则正常返回，表示 tryPackage 成功
    return actual
}
```

#### 文件预判

在读取某个模块并处理之前，我们得先确定该文件的存在，并读取该文件。就像 tryPackage 函数中的 tryFile、tryExtensions 等函数，就是读取某个目录（下的某文件）。

```js
// 默认依次尝试 xxx.js，xxx.json，xxx.node 三种后缀
function tryExtensions(p, exts, isMain) {
    for (let i = 0; i < exts.length; i++) {
        const filename = tryFile(p + exts[i], isMain)
        if (filename) {
            return filename
        }
    }
    return false
}

// 判断文件是否存在
function tryFile(requestPath, isMain) {
    // 首先尝试从缓存中读取
    const rc = stat(requestPath)
    if (rc !== 0) return

    // 根据是否开启保留符号链接选项，返回不同地址的解析。
    if (preserveSymlinks && !isMain) {
        return path.resolve(requestPath)
    }
    return toRealPath(requestPath)
}

// 通过 stat 函数来缓存判断文件是否存在。
function stat(filename) {
    filename = path.toNamespacedPath(filename)
    if (statCache !== null) {
        const result = statCache.get(filename)
        if (result !== undefined) return result
    }
    const result = internalModuleStat(filename)
    if (statCache !== null) statCache.set(filename, result)
    return result
}
```

TODO realpathCache

```js
// IO 操作消耗巨多性能，所以所有路径读取操作都会使用一个对象作缓存
const realpathCache = new Map()
```

### 模块载入

模块载入的缓存判定大致如下：

1. 如果已经载入模块，直接返回模块的导出内容
2. 读取文件，创造一个新的 module 实例保存到缓存，然后载入文件内容并返回导出结果。

模块载入需要调用原始模块的 require 方法，而实际上 module.require 方法也提供了一种载入的方法，和 require 类似。

```js
// 用来维护依赖层级
let requireDepth = 0

Module.prototype.require = function(id) {
    validateString(id, 'id')
    if (id === '') {
        throw new ERR_INVALID_ARG_VALUE('id', id, 'must be a non-empty string')
    }
    requireDepth++
    try {
        return Module._load(id, this, /* isMain */ false)
    } finally {
        requireDepth--
    }
}
```

从前面几个小节可以看到，代码的各个细节都充满了缓存对象。module.require 也不例外，不仅缓存了模块和文件名的对应关系，还缓存了模块与载入模块间相对路径的对应关系。

```js
// 模块的相对路径关系的缓存
const relativeResolveCache = ObjectCreate(null)

Module._load = function(request, parent, isMain) {    
    let relResolveCacheIdentifier
    // 带 parent 的模块走特殊的缓存处理
    if (parent) {
        // 缓存的属性名为 parent 路径 + \x00 + 请求路径
        relResolveCacheIdentifier = `${parent.path}\x00${request}`
        const filename = relativeResolveCache[relResolveCacheIdentifier]
        if (filename !== undefined) {
            const cachedModule = Module._cache[filename]
            if (cachedModule !== undefined) {
                // 将模块添加到 parent.children
                updateChildren(parent, cachedModule, true)
                // 如果模块仍未载入，需要处理循环引用的情况（如 a.js 引用 b.js，b.js 又引用 a.js）
                if (!cachedModule.loaded) return getExportsForCircularRequire(cachedModule)
                // 否则直接返回 exports 内容
                return cachedModule.exports
            }
            // TODO 删除缓存？
            delete relativeResolveCache[relResolveCacheIdentifier]
        }
    }

    // TODO Module._resolveFilename
    const filename = Module._resolveFilename(request, parent, isMain)

    // 命中缓存
    const cachedModule = Module._cache[filename]
    if (cachedModule !== undefined) {
        updateChildren(parent, cachedModule, true)
        if (!cachedModule.loaded) return getExportsForCircularRequire(cachedModule)
        return cachedModule.exports
    }

    // 若载入内部对象（如 a = require('http')）
    const mod = loadNativeModule(filename, request)
    if (mod && mod.canBeRequiredByUsers) return mod.exports

    // 创造新的 module 实例
    const module = new Module(filename, parent)

    // 主入口文件相关逻辑
    if (isMain) {
        process.mainModule = module
        module.id = '.'
    }

    // 缓存文件名与模块的关系以及模块的相对路径关系
    Module._cache[filename] = module
    if (parent !== undefined) {
        relativeResolveCache[relResolveCacheIdentifier] = filename
    }

    let threw = true
    try {
        // 若开启了 getSourceMapsEnabled，那么错误实例会取代模块实例被缓存下来
        if (getSourceMapsEnabled()) {
            try {
                module.load(filename)
            } catch (err) {
                rekeySourceMap(Module._cache[filename], err)
                throw err /* node-do-not-add-exception-line */
            }
        } else {
            module.load(filename)
        }
        threw = false
    } finally {
        // 若模块载入出错
        if (threw) {
            // 释放模块实例的缓存
            delete Module._cache[filename]
            // 同时清空模块的 children
            if (parent !== undefined) {
                delete relativeResolveCache[relResolveCacheIdentifier]
                const children = parent && parent.children
                if (ArrayIsArray(children)) {
                    const index = children.indexOf(module)
                    if (index !== -1) {
                        children.splice(index, 1)
                    }
                }
            }
        } 
        // 当模块载入成功，则设置 module.exports 的 __proto__
        else if (
            module.exports &&
            // proxy 对象是没有 prototype 的内置对象，需要特殊处理
            !isProxy(module.exports) &&
            ObjectGetPrototypeOf(module.exports) === CircularRequirePrototypeWarningProxy
        ) {
            ObjectSetPrototypeOf(module.exports, PublicObjectPrototype)
        }
    }

    return module.exports
}
```

不同后缀文件，对应不同的载入逻辑。

```js
Module._extensions['.js'] = function(module, filename) {
    if (filename.endsWith('.js')) {
        const pkg = readPackageScope(filename)
        // 如果是 ES Module，则报错
        if (pkg && pkg.data && pkg.data.type === 'module') {
            const parent = moduleParentCache.get(module)
            const parentPath = parent && parent.filename
            const packageJsonPath = path.resolve(pkg.path, 'package.json')
            throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath)
        }
    }

    // 读取文件内容
    const content = fs.readFileSync(filename, 'utf8')
    // 模块编译
    module._compile(content, filename)
}

Module._extensions['.json'] = function(module, filename) {
    const content = fs.readFileSync(filename, 'utf8')
    try {
        // BOM 即 字节序，在 UTF-8 的文件中并不需要这么一个玩意儿，所以解析字符串前先把他去掉
        // JSON 文件直接通过 JSONParse 函数解析
        module.exports = JSONParse(stripBOM(content))
    } catch (err) {
        err.message = filename + ': ' + err.message
        throw err
    }
}
```

### 模块编译

模块编译，即向模块注入 exports、__filename 等变量，并在指定上下文中运行模块的代码。可以发现，之前小节提到的模块包装是其中一个步骤。

```js
Module.prototype._compile = function(content, filename) {
    let moduleURL
    let redirects

    // 包装当前模块内容
    const compiledWrapper = wrapSafe(filename, content, this)

    let inspectorWrapper = null
    if (getOptionValue('--inspect-brk') && process._eval == null) {
        if (!resolvedArgv) {
            // We enter the repl if we're not given a filename argument.
            if (process.argv[1]) {
                try {
                    resolvedArgv = Module._resolveFilename(process.argv[1], null, false)
                } catch {
                    // We only expect this codepath to be reached in the case of a
                    // preloaded module (it will fail earlier with the main entry)
                    assert(ArrayIsArray(getOptionValue('--require')))
                }
            } else {
                resolvedArgv = 'repl'
            }
        }

        // Set breakpoint on module start
        if (resolvedArgv && !hasPausedEntry && filename === resolvedArgv) {
            hasPausedEntry = true
            inspectorWrapper = internalBinding('inspector').callAndPauseOnStart
        }
    }

    // 模块所在文件夹
    const dirname = path.dirname(filename)
    const require = makeRequireFunction(this, redirects)
    let result
    const exports = this.exports
    const thisValue = exports
    const module = this

    // 缓存，用来保存模块内部的模块引用关系
    if (requireDepth === 0) statCache = new Map()

    if (inspectorWrapper) {
        result = inspectorWrapper(compiledWrapper, thisValue, exports, require, module, filename, dirname)
    } else {
        result = compiledWrapper.call(thisValue, exports, require, module, filename, dirname)
    }

    // 一个全局标记，用来标记是否加载过用户 CommonJS 模块
    hasLoadedAnyUserCJSModule = true

    if (requireDepth === 0) statCache = null
    return result
}
```

### 相关命令行参数

#### pendingDeprecation

用来判断是否打开命令行参数：--pending-deprecation。打开时，使用部分待弃用的 API 会报警告。

```js
const pendingDeprecation = getOptionValue('--pending-deprecation')
```

#### preserveSymlinks

用来判断是否打开命令行参数：--preserve-symlinks。用来标志当解析路径时，是否需要将符号链接替换为真实路径。

```js
const preserveSymlinks = getOptionValue('--preserve-symlinks')
```