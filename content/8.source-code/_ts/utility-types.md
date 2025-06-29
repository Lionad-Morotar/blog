---
title: Utility Types
description: TypeScript 内置的工具类型和高级类型，包括 Partial、Required、Readonly、Record、Pick、Omit、Exclude、Extract、NonNullable、Parameters、ReturnType 等。
---

#### Partial

将类型中所有属性转换成为可选属性。

```ts
type Partial<T> = { [P in keyof T]?: T[P] }
```

#### Required

将类型中所有类型转换为必选属性，与 Partial 相对。

```ts
type Required<T> = { [P in keyof T]-?: T[P] }
```

#### Readonly

将类型中所有属性设为只读。

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P]} }
```

#### Record

构造一个属性的值其类型皆为某种特定类型的类型。有点类似声明 C++ 中的 map，如 `map<string, int>`。

```ts
type Record<K extends keyof any, T> = { [P in K]: T }
```

#### Pick

从类型中选取部分属性构造出一个新类型。

```ts
type Pick<T, K extends keyof any> = { [P in K]: T[P] }
```

#### Omit

从类型中排除指定属性，用剩下的属性构造一个新类型。

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

#### Exclude

从类型中排除指定项，再用剩下的项构造一个新类型。

```ts
type Exclude<T, U> = T extends U ? never : T
```

#### Extract

取类型的交集，与 Exclude 相对。

```ts
type Extract<T, U> = T extends U ? T : never
```

#### NonNullable

去除类型中的 null 和 undefined 类型，用剩下的项返回一个新类型。

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

#### Parameters

获取函数参数的类型组成的元组类型。

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) ? P : never
```

#### ReturnType

返回函数的返回值的类型组成的元组类型。

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer P ? P : never
```

