# Utility Types

#### IfEquals

判断两种类型是否相等，分别返回 A 和 B。

```ts
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B
```

#### Primitive and isPrimitive

Primitive 包含 JS 中的原始类型，有着对应的类型守卫 isPrimitive。

```ts
type Primitive = string | number | bigint | boolean | symbol | null | undefined

const isPrimitive = (val: unknown): val is Primitive => {
  if (val === null || val === undefined) {
    return true
  } else {
    switch (typeof val) {
      case 'string':
      case 'number':
      case 'bigint':
      case 'boolean':
        return true
      default:
        return false
    }
  }
}
```

#### Falsy and isFalsy

Falsy 类型包含了 JS 中的幻假值（除了 NaN），有着对应的类型守卫 isFalsy。

```ts
type Falsy = null | undefined | '' | 0 | false

const isFalsy = (val: unknown): val is Falsy => !val
```

#### Nullish and isNullish

Nullish 用来指代 JS 中的空值，有着对应的类型守卫 isNullish。

```ts
type Nullish = null | undefined

const isNullish = (val: unknown): val is Nullish => val == null
```

#### SetIntersection

两种类型的交集，同内置类型 Extract。

```ts
type SetIntersection<A, B> = A extends B ? A : never
```

#### SetDifference

A 类型与 B 类型的差集，同内置类型 Exclude。

```ts
type SetDifference<A, B> = A extends B ? never : A
```

#### SetComplement

两种类型的补集，要求 A1 为 A 的子集。

```ts
type SetComplement<A, A1 extends A> = SetDifference<A, A1>
```

#### SymmetricDifference

两种类型的差集。

```ts
type SymmetricDifference<A, B> = SetDifference<A | B, A & B>
```

#### NonNullable and NonUndefined

过滤掉类型中的空值。

```ts
type NonUndefined<A> = A extends undefined ? never : A

type NonNullable<A> = A extends undefined ? never : A extends null ? never : A
```

#### FunctionKeys and NonFunctionKeys

求类型中属性值类型为函数的属性集合。

```ts
type FunctionKeys<T extends object> = {
  [K keyof T]: T[K] extends Function ? T : never
}[keyof T]

type NonFunctionKeys<T extends object> = {
  [K keyof T]: T[K] extends Function ? never : T
}[keyof T]
```

#### RequiredKeys and OptionalKeys

RequiredKeys 将类型中必选属性的集合组成新类型，与之相对应有 OptionalKeys。

```ts
type RequiredKeys<T extends object> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K
}[keyof T]

type OptionalKeys<T extends object> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never
}[keyof T]
```

#### ReadonlyKeys and MutableKeys

ReadonlyKeys 将类型中只读属性的集合转化为新类型，与之对应有 MutableKeys，将类型中可变属性的集合转化为新类型。

```ts
type ReadonlyKeys<T extends object> = {
  [K in keyof T]: IfEquals<
    { [P in K]: T[K] },
    { -readonly [P in K]: T[K] },
    never,
    P
  >
}[keyof T]

type MutableKeys<T extends object> = {
  [K in keyof T]: IfEquals<
    { [P in K]: T[K] },
    { -readonly [P in K]: T[K] },
    P,
    never
  >
}[keyof T]
```

#### PickByValue and PickByValueExact

PickByValue 用来取类型中的匹配某值的属性及其值组合成新类型，与之类似的 PickByValueExact 匹配值时使用更加严格的“集合相等”策略。

```ts
type PickByValue<T, ValueType> = Pick<
  T,
  { [K in T]: T[K] extends ValueType ? K : never }[keyof T]
>

type PickByValueExact<T, ValueType> = Pick<
  T,
  { [K in T]: [T[K]] extends [ValueType] ? [ValueType] extends [T[K]] ? K : never : never}[keyof T]
>
```

#### Intersection

取两种类型共有属性及其值组合成新的类型。

```ts
type Intersection<T extends object, P extends object> = Pick<T, Extract<keyof T, keyof P>>
```

#### Subtract and Diff

Subtract 从类型 T 中移除其子集 T1 中所有的属性，再组成新类型。Diff 与之类似，但不要求 T1 为子集。

```ts
type Subtract<T, T1> = Pick<T, SetComplement<keyof T, keyof T1>>

type Diff<T, P> = Pick<T, SetDifference<keyof T, keyof P>>
```

#### Assign and Overwrite

Assign 类似 Object.assign，使新类型中的属性及值覆盖原有类型的属性及值。Overwrite 与 Assign 类似，但不会给原有类型添加新的属性。

```ts
type Assign<T, P,
  I = Diff<T, P> & Intersection<P, T> & Diff<P, T>
> = Pick<I, keyof I>

type Overwrite<T, P,
  I = Diff<T, P> & Intersection<P, T>
> = Pick<I, keyof I>
```

## 阅读更多

* [utility-types](https://github.com/piotrwitek/utility-types)