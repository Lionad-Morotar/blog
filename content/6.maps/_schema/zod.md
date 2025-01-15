---
title: Zod
description: Zod 是一个 TypeScript-first 的验证库。
---

#### 简介

Zod 使用 Schema 来描述数据结构，其核心理念是 “parse, don't validate”（解析，而不是验证），这意味着数据要么被解析为正确的类型，要么解析失败抛出错误，这很适合接口层的数据校验。也难怪其生态包含了许多 API 增强的类库，如 zod-endpoints, zod-sockets。此外，Zod 还提供了链式 API，支持 NodeJS 和主流浏览器。

Zod 生态分为：API Libs、Form Integration、Transformers（如 [zod-to-json-schema](https://github.com/StefanTerdell/zod-to-json-schema)）、Utils（如 [zod-validation-error](https://github.com/causaly/zod-validation-error)）、Made with Zod

目前需要 TypeScript 4.5+，可能和模版字符类型及递归优化有关。但实际上代码仓库已经要求 TS 5+。

```ts
z.string().startsWith('a') // => right!
```

最简单的使用案例：

```ts
import { z } from 'zod'

const User = z.object({
  username: z.string(),
})
const user = User.parse({ username: 'jane' }) // => { username: 'jane' }
```

可以根据 Schema 来推断 TypeScript 类型：

```ts
type User = z.infer<typeof User>
// => { username: string }
```

#### 为什么说是 TS-First？

为什么说 Zod 是 TypeScript-first 呢？请看他的基础类型，和 TypeScript 一一对应：

```ts
// primitive values
z.string()
z.number()
z.bigint()
z.boolean()
z.date()
z.symbol()

// empty types
z.undefined()
z.null()
z.void() // accepts undefined

// catch-all types
// allows any value
z.any()
z.unknown()

// never type
// allows no values
z.never()

// default value
z.string().default('hello')
z.string().catch('hello').parse(12) // => 'hello'
```

除了基本类型，TS 支持的其他 API 如 optional，都能在 Zod 找到对应：

```ts
// optional value
z.string().optional()
z.object({}).partial()

// access a property
z.object({
  name: z.string(),
}).shape.name

// keyof
z.object({ x: 1, y: 2 }).keyof()

// extends
z.object({ x: 1, y: 2 }).extend({ z: 3 })

// pick omit
z.object({ x: 1, y: 2 }).pick({ x: true })

// array access
z.array(z.string()).element

// promise parse
z.promise(z.string()).parse(Promise.resolve('hello'))

// function parse
z.function().args(z.string()).return(z.number()).parse((x: string) => x.length)
```

和 TS 有限的区别之一在于 Enum 的处理，Zod 使用 extract 和 exclude 而不是 Pick 和 Omit。

```ts
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"])
const SalmonAndTrout = FishEnum.extract(["Salmon", "Trout"])
const TunaOnly = FishEnum.exclude(["Salmon", "Trout"])
```

有限区别之二在于 transform 方法的类型，需要使用特定的 API 提取：

```ts
const User = z.string().transform((val) => +val)
type User = z.infer<typeof User> // -> number
type UserArgs = z.input<typeof User> // -> string
type UserReturn = z.output<typeof User> // -> number
```

#### 可能碰到的问题

由于 Zod 仍是运行时库，所以它仍然保留了强制类型转换的能力，如下例子，所有待输入值都会先转换为字符串，再校验邮箱格式和长度。

```ts
z.coerce.string().email().min(5)
```

关于类型转换，Zod 以前使用 preprocess 方法对数据做预处理，但是现在不推荐使用，应当使用 coerce 或 safeParse。

```ts
z.string().safeParse(123) // => '123'
```

nullish 和 nullable 有什么区别？见下例子。

```ts
z.string().nullable().parse() // => Error
z.string().nullish().parse() // => undefined
```

Zod 的日期校验是基于字符串的，所以其严格程度不如其他专门校验日期的库。校验 datetime 时，默认只能通过 UTC 时区字符串，除非手动传 offset 参数。

```ts
const datetime = z.string().datetime({ offset: true })
```

Zod 对对象的校验关注额外的属性，默认不会关注额外属性，但可以通过 strict、passThrough、catchAll 来控制。

```ts
z.object({ username: z.string() }).strict().parse({ username: 'jane', age: 20 })
// => Error: Unexpected keys: age

z.object({ username: z.string() }).passThrough().parse({ username: 'jane', age: 20 })
// => { username: 'jane', age: 20 }

z.object({ username: z.string() }).catchAll(z.string()).parse({ username: 'jane', age: false })
// => Error: Expected string, received boolean
```

Zod 的 parse 返回值是深拷贝的，而不是原始对象，在某些情况下会造成意料之外的问题。

Zod 的 refine 允许自定义校验规则，同时支持异步函数，只是调用方法需要从 parse 需要替换成 parseAsync。同理，使用 transform 异步转换后，也要使用 parseAsync 校验。

此外需要注意 refine 函数内不应抛异常，而是返回布尔值和错误信息。

```ts
const User = z.object({
  username: z.string(),
}).refine(data => data.username.length > 5, {
  message: 'Username must be longer than 5 characters',
})
```

#### 优化手段

一些优化手段，包括，使用 discriminatedUnion 加速处理联合类型：

```ts
const Pet = z.discriminatedUnion('type', [
  z.object({ type: z.literal('dog'), bark: z.string() }),
  z.object({ type: z.literal('cat'), meow: z.string() }),
])
```

也因为 Zod 的运行时库，所以在递归类型的处理上需要手动标记类型：

```ts
const User = z.object({
  username: z.string(),
  friends: z.array(z.lazy(() => User)),
})
```

关于手动标记类型，同样的，可以用在 refine 函数中，用于收缩返回值类型。

```ts
z.refine((arg): arg is 'abc' => arg === 'abc', {
  message: 'Value must be "abc"',
})
```

#### 高级用法

JSON 类型校验是一个很好的递归类型的例子：

```ts
const Literal = z.union([ z.string(), z.number(), z.boolean(), z.null() ])
type ZLiteral = z.infer<typeof Literal>
type ZJson = ZLiteral | { [k: string]: ZJson } | ZJson[]
const JSON = z.lazy(() => Literal.or(z.object({}).catchAll(Literal)).or(z.array(Literal)))
```

为了防止循环引用，需要使用一个新的 Schema 来判断是否是循环引用，再将结果传到原 Schema 中。所以需要用到 superRefine，和 refine 相比，在 superRefine 能访问到上下文（要解析的数据）。

```ts
/** @see https://gist.github.com/colinhacks/d35825e505e635df27cc950776c5500b */
const NotCircular = z.unknown().superRefine((val, ctx) => {
  if (isCircular(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'values cannot be circular data structures',
      fatal: true
    })
    return z.NEVER
  }
})
NotCircular.pipe(jsonSchema).parse(anyData)
```

有时候需要创建自定义校验规则，可以使用 custom 方法。

```ts
const px = z.custom<`${number}px`>((val) => {
  return typeof val === "string" ? /^\d+px$/.test(val) : false
})
```

关于“不透明类型”，Zod 提供 brand 方法给类型打上标签，这样一来可以得到看起来和原始类型一致，但实际不同的类型。

```ts
const Cat = z.object({ name: z.string() }).brand<"Cat">()
type Cat = z.infer<typeof Cat>
const petCat = (cat: Cat) => {}

petCat({ name: 'Fluffy' }) // => TypeScript error，but runtime OK
```

跨函数使用 Zod 时，可能会碰到泛型问题，总结来说，有一套标准的使用 Zod Schema 作为函数参数的模版：

```ts
function parseData<T extends z.ZodTypeAny>(data: unknown, schema: T) {
  return schema.parse(data) as z.infer<T>
}
```

其中，z.ZodTypeAny 可以替换成任何你想要的其他类型，按照此类原则：

```ts
class ZodType<
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
> { ... }
```

#### 其他

文档中展示了一段关于 TypeScript 类型反直觉的地方：

```ts
const testMap: { [k: number]: string } = {
  1: "one",
}

for (const key in testMap) {
  console.log(`${key}: ${typeof key}`)
}
// prints: `1: string`
```

* ChangeLog：[Zod](https://zod.dev/CHANGELOG)
* GitHub：[Zod](https://github.com/colinhacks/zod)
