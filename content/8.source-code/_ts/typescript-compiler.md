---
title: TypeScript 编译器
description: TypeScript 的整个编译流程层层递进，分工明确：预处理器确定文件范围，解析器生成抽象语法结构，Binder建立符号体系并理顺作用域，Program汇集全局视角，TypeChecker完成类型推断和诊断，最终由Emitter生成输出文件。
---

本文以 TypeScript v5.9.0 版本为准，部分内容由 AI 辅助生成，请注意核对。

## 概览

#### 如何调试 TypeScript 源码？

下载仓库源码后，使用带 SourceMap 选项编译 TypeScript，就可以用 VSCode 本地调试其代码。

快速入门见：[我读 Typescript 源码的秘诀都在这里了](https://zhuanlan.zhihu.com/p/417298212)，或参考更完整的：[TypeScript Compiler Notes](https://github.com/microsoft/TypeScript-Compiler-Notes)。

#### TypeScript 编译器的一些关键概念？

* 类型推断：TypeScript 编译器会根据代码上下文自动推断变量、函数参数和返回值的类型，而不需要显式声明类型。这种推断基于控制流分析，能够在不同代码路径上动态调整类型。
* 控制流分析：Control flow analysis（控制流分析）是 TypeScript 编译器中的一项核心技术，用于根据代码的执行流程，动态推断和分析变量的类型。它让类型系统不仅静态地分析声明，还能理解程序运行过程中不同代码路径上变量类型的变化，从而实现更精确的类型检查和类型推断。
* TypeFacts：TypeFacts 用来描述某个类型具体特性与关系的“标志位枚举类型（bitmask）”，允许高效地表示、记录和快速判断某个类型的一些“事实真相”，这些事实往往和类型保护（type guard）、控制流类型收窄、类型兼容性分析等环节密切关联。

#### 编译器的整体流程？

TypeScript 的整个编译流程层层递进，分工明确：预处理器确定文件范围，解析器生成抽象语法结构，Binder建立符号体系并理顺作用域，Program汇集全局视角，TypeChecker完成类型推断和诊断，最终由Emitter生成输出文件。

编译过程的起点是预处理器。它会扫描代码中的 `/// <reference>` 指令、`require` 语句以及 `import` 语句，从而**确定该次编译需要包含哪些源文件**，为后续分析和构建依赖树奠定基础。

在文件依赖关系明确之后，解析器（Parser）会将源文件逐个转换为抽象语法树（AST，Abstract Syntax Tree）。  
- **AST** 是源代码的结构化表达，仅关心语法结构，与具体实现细节无关。  
- **SourceFile** 对象承担了每个源文件的语法树载体，内部不仅保存 AST，还包含文件名、源码文本等元数据。

Binder 负责遍历 AST 节点，**为每个命名实体（如变量、函数、类、接口等）分配并绑定唯一的 Symbol（符号）**。  
- 支持声明合并：例如同名的类与命名空间可以合并为同一个 Symbol。
- 每个 Symbol 记录所有相关声明节点信息，同时处理作用域（Scope），确保符号在各自的封闭作用域中正确分层与隔离。
- 这一过程保证了后续类型分析时，每个引用都能找到其唯一且准确的定义。

通过调用 `createSourceFile` API，可生成 SourceFile 及其对应的 Symbol 构建成果。

经过绑定以后，**Program** 对象被创建出来。  
- Program 是当前所有 SourceFile 的全局集合，加上一组编译选项（CompilerOptions）。
- 通过 `createProgram` API 生成，在整个编译期间为所有源文件和类型分析提供统一的上下文。

**TypeChecker** 是 TypeScript 类型系统的核心引擎。从 Program 实例获取所有必要信息后进入工作状态：

- **符号合并与全局符号表**  
  TypeChecker 首先将所有 SourceFile 中的 Symbol 进行合并，如跨文件的命名空间、重载声明等，构建全局符号表，精准反映整个程序的命名与类型空间。
- **类型推断与约束分析**  
  负责为每个语法节点分配具体的 Type，判断类型兼容性、推断泛型等。
- **生成语义诊断（Semantic Diagnostics）**  
  检查类型错误、不一致或潜在缺陷，生成准确的错误提示信息。

TypeChecker 在整个过程中采用**惰性计算（lazy evaluation）策略**，只对用户当前查询或编辑的内容进行深入分析，极大提升了性能与交互体验。

最后由 **Emitter** 负责根据语法树和类型信息，为每个 SourceFile 生成具体的输出文件，包括：
- `.js`（JavaScript 编译产物）
- `.d.ts`（类型声明文件）
- `.jsx`
- `.js.map`（源码映射，便于调试）

Emitter 按需输出这些文件，为运行时环境或类型消费方（如编辑器、其他项目等）提供必要的支撑。

见：[TypeScript Compiler Notes](https://github.com/microsoft/TypeScript-Compiler-Notes)、[TypeScript Deep Dive](https://jkchao.github.io/typescript-book-chinese/compiler/overview.html)。

## Program

#### Program 的基本流程

在命令行执行 tsc 时，Program 协调了 TypeScript 管道的工作过程，如：读取项目配置（tsconfig）、文件预处理（模块解析）、语法树解析、绑定（绑定语法树和符号）、类型检查（根据语法树及其绑定检查类型错误）、转换（将语法树转换为符合配置的 JavaScript 代码）、输出。

* scanner：读取文件内容，分词，生成 Token 流。
* parser：将 Token 流转换为语法树（AST）。
* binder：把程序中的变量、函数、类等标识符绑定到具体的符号（Symbol）对象上，组织出符号表，为后续类型检查、类型推断和代码生成提供基础语义信息。
* checker：根据绑定的符号表，进行类型检查和类型推断，确保代码符合 TypeScript 的类型规则。
* transformer：将语法树转换为符合目标 JavaScript 版本的代码，可能包括语法转换、特性降级等。
* emitter：将转换后的语法树输出为 JavaScript 代码文件。

关于 Checker 的某种概况性说明：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202507120154134.png)

## Checker

#### 一个典型的类型检查的调用流程？

以下代码为例，分析使用 TS Compiler API 的 `checker.getTypeAtLocation` 获取 x1 的类型的过程。火焰图从 `trace` 函数开始看起。

```typescript
declare function fn(x: number): string
const x1 = fn(1)
```

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202507140845563.png)

<!-- ![getTypeAtLocation flame graph](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202507121212277.png) -->

以下是详细的调用过程说明。

每一个 Program 都有自己的 TypeChecker 实例，其中提供了 getTypeOfLocation API，用来获取某个位置的节点类型。

```ts
function createTypeChecker(program: Program): TypeChecker {
  return {
    getTypeAtLocation: nodeIn => {
      const node = getParseTreeNode(nodeIn)
      return node ? getTypeOfNode(node) : errorType
    },
  }
}
```

由于 TypeScript 在编译等过程中，经常会对语法树（AST）做各种变换，比如类型分析、代码合成（emit helper）、自动补充内容等。node.original 主要是为了解决AST 节点在变换、派生或合成后，如何溯源的问题。如重构、自动补全、语法高亮、定义跳转、引用查找，都需要知道原始的节点信息。所以能看到，getTypeAtLocation 先找到了原始节点，再获取其类型。x1 的原始节点数据结构如图。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202507140424234.png)

getTypeOfNode 根据节点类型调用不同的处理函数，因为 x1 位于变量声明节点，所以流程进入对应 if 语句，先获取节点对应的 Symbol，再从中获取类型。

```ts
function getTypeOfNode(node: Node): Type {
  if (isSourceFile(node) && !isExternalModule(node)) {
    //...
  }
  if (isPartOfTypeNode(node)) {
    //...
  }
  if (isExpressionNode(node)) {
    //...
  }
  //...
  if (isDeclarationNameOrImportPropertyName(node)) {
    return getTypeOfSymbol(getSymbolAtLocation(node))
  }
}
```

为什么要从 Symbol 而不是节点获取类型呢？当源码转换成 AST 时，是不携带上下文信息的，需要再将 AST 交给 Binder 处理成 Symbol。每个 Symbol 都记录所有相关声明节点信息，同时处理了作用域（Scope），可以保证 Symbol 在各自的封闭作用域中正确分层与隔离，以便更准确的拿到类型。

以下是 x1 位置对应的 Symbol。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202507140437709.png)

getTypeOfSymbol 会根据 Symbol 的检查状态及类别，调用不同的处理函数。举例，某些复杂类型需要延迟计算其类型，那么它可能携带 DeferredType 的检查状态。而 x1 对应的 Symbol 是简单类型，直接根据其类型交由 getTypeOfVariableOrParameterOrProperty 处理。

```ts
function getTypeOfSymbol(symbol: Symbol): Type {
  const checkFlags = getCheckFlags(symbol)
  if (checkFlags & CheckFlags.DeferredType) {
    return getTypeOfSymbolWithDeferredType(symbol)
  }
  //...
  if (symbol.flags & (SymbolFlags.Variable | SymbolFlags.Property)) {
    return getTypeOfVariableOrParameterOrProperty(symbol)
  }
  //...
  return errorType;
}
```

Symbol 有 links 属性，用来存储符号的附加信息，如缓存、临时数据、类型检查相关状态。获取 Symbol 的类型时，只要类型不是上下文相关的，那么计算结果会缓存到 Symbol.links.type 属性中。

什么是上下文相关的类型呢？举个例子，以下代码中的 item 的类型要从其父 Symbol 中推断出来，那么它就是上下文相关的。

```ts
const arr = [1, 2, 3]
arr.map((item) => item.toFixed())
```

而 x1 不是上下文相关。我们继续看流程，getTypeOfVariableOrParameterOrProperty 实际调用了另一个函数去计算类型，它本身实现的是缓存模式，此概念稍后会介绍。实际的计算由 getTypeOfVariableOrParameterOrPropertyWorker 实现，需要从变量声明 symbol.valueDeclaration 中推断类型信息。

```ts
function getTypeOfVariableOrParameterOrPropertyWorker(symbol: Symbol): Type {
  if (
    isParameter(declaration)
    || isPropertyDeclaration(declaration)
    || isPropertySignature(declaration)
    || isVariableDeclaration(declaration)
    || isBindingElement(declaration)
    || isJSDocPropertyLikeTag(declaration)
  ) {
    type = getWidenedTypeForVariableLikeDeclaration(declaration, /*reportErrors*/ true);
  }
}
```

这里涉及一个类型推断的新概念：widened type。在某些情况下，如返回值、参数赋值的类型计算中，需要从字面量类型中推导出更宽泛的类型，例如：`const x = '123'` 中的 x 的类型是 string 而不是字面量 '123'，除非指定 const。把字面量扩宽为 string 的逻辑，就是在以下代码 widenTypeInferredFromInitializer 中处理的。简便起见，这里忽略 widened type 的细节继续看。

JS 中，除了不带值初始化的变量声明，常见的变量声明有两种形式：一种如我们举例代码使用的 `const x1 = f1(1)`，另一种是包含类型注解的 `let x2: string = 'hello'`。后者可以直接从类型注解中拿到实际类型，而前者需要处理声明的初始化器（DeclarationInitializer）。

```ts
function getTypeForVariableLikeDeclaration(
    declaration: ParameterDeclaration | PropertyDeclaration | PropertySignature | VariableDeclaration | BindingElement | JSDocPropertyLikeTag,
    includeOptionality: boolean,
    checkMode: CheckMode,
): Type | undefined {
  const declaredType = tryGetTypeFromEffectiveTypeNode(declaration)
  if (declaredType) {
    //...
  }
  if (hasOnlyExpressionInitializer(declaration) && !!declaration.initializer) {
    const type = widenTypeInferredFromInitializer(declaration, checkDeclarationInitializer(declaration, checkMode))
    return addOptionality(type, isProperty, isOptional)
  }
}
```

checkDeclarationInitializer 会根据上下文类型来处理简单赋值和复杂赋值（解构赋值）的类型，而我们例子中的代码 x1 结构很简单，是一个不带泛型参数的函数的调用，所以可以直接从其返回值中获取赋值的类型，并由此进入 checkNonNullType、checkExpression 函数。

```ts
function getQuickTypeOfExpression(node: Expression): Type | undefined {
  //...
  // Optimize for the common case of a call to a function with a single non-generic call
  // signature where we can just fetch the return type without checking the arguments.
  if (isCallExpression(expr) && expr.expression.kind !== SyntaxKind.SuperKeyword && !isRequireCall(expr, /*requireStringLiteralLikeArgument*/ true) && !isSymbolOrSymbolForCall(expr) && !isImportCall(expr)) {
      return isCallChain(expr) ? getReturnTypeOfSingleNonGenericSignatureOfCallChain(expr) :
          getReturnTypeOfSingleNonGenericCallSignature(checkNonNullExpression(expr.expression));
  }
  //...
  return undefined;
}
```

checkExpression 是 TypeScript 类型检查的核心函数。也由此引入 TypeScript 中关于类型的重要概念：类型实例化。可以把实例化过程理解为给泛型填空，即在用到泛型类型或泛型函数时，把类型参数替换为实际给定的类型，从而生成具有特定结构和行为的“具体类型”。

checkExpression 从表达式析取出一个可能带泛型的类型，并交给后续过程进行实例化。但由于形如 `f1(1)` 的函数调用类型无需实例化，所以在这个例子中，uninstantiatedType 和 type 是相同的。

```ts
function checkExpression(node: Expression, checkMode?: CheckMode): Type {
    const uninstantiatedType = checkExpressionWorker(node, checkMode);
    const type = instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, checkMode);
}
```

`f1(1)` 的类型如下。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202507140721530.png)

在 TypeScript Compiler 内部，类型即 Type 对象，由一个 flags 属性标记其实际类型，比如 flags 可以是 NumberLiteral，标记一种字面量类型。

```ts
export interface Type {
  flags: {
    Any             = 1 << 0,
    NumberLiteral   = 1 << 8,
    UniqueESSymbol  = 1 << 13,  // unique symbol
    Void            = 1 << 14,
    TypeParameter   = 1 << 18,  // Type parameter
    Object          = 1 << 19,  // Object type
    //...
  }
}
```

但并不是所有类型都是字面量之类的简单类型，Type 还可以是更复杂的联合类型（Union Type）、交叉类型（Intersection Type）等，这些类型可能只会在需要计算时才将其解析（延迟计算），以下代码为例，C 的类型是 `A & B`。

```ts
type A = { x: number }
type B = { y: string }
type C = A & B
```

由于 f1 函数没有重载，是单签名的，并且从函数获取类型的过程也可能涉及延迟计算，所以代码流程从 getSingleCallSignature 进入 getSingleSignature，最后进入 resolveStructuredTypeMembers 尝试解析函数的签名类型。

```ts
function resolveStructuredTypeMembers(type: StructuredType): ResolvedType {
  if (!(type as ResolvedType).members) {
    if (type.flags & TypeFlags.Object) {
        if ((type as ObjectType).objectFlags & ObjectFlags.Reference) {
            resolveTypeReferenceMembers(type as TypeReference);
        } else if ((type as ObjectType).objectFlags & ObjectFlags.Anonymous) {
            resolveAnonymousTypeMembers(type as AnonymousType);
        }
        //...
    }
    else if (type.flags & TypeFlags.Union) {
        resolveUnionTypeMembers(type as UnionType);
    }
    else if (type.flags & TypeFlags.Intersection) {
        resolveIntersectionTypeMembers(type as IntersectionType);
    }
    //...
  }
  return type as ResolvedType;
}
```

此函数涉及匿名类型和具名类型的处理，典型的具名类型形如：

```ts
interface Point { x: number, y: number }
let p: Point
```

显而易见，f1 不是具名类型，所以继续由 resolveAnonymousTypeMembers 解析。因为 TypeScript 是结构化类型系统，对于不同的函数而言，只要其调用签名相同，就可以认为类型是兼容的，所以解析函数类型，也仅需解析其 callSignatures。type.callSignatures 的结果可能是数组，但实际取得值会在 getSingleSignature 中兼容成数组第一项。

```ts
function resolveAnonymousTypeMembers(type: AnonymousType) {
  //...
  if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method)) {
    type.callSignatures = getSignaturesOfSymbol(symbol)
  }
  //...
}
```

此时我们拿到了 f1 的签名类型。最后，还需根据上 getQuickTypeOfExpression 函数，通过 getReturnTypeOfSingleNonGenericCallSignature，根据函数的类型标注，获取其返回值类型，作为调用的结果类型，赋值给 x1。

```ts
function getReturnTypeOfSignature(signature: Signature): Type {
  if (!signature.resolvedReturnType) {
    let type = getReturnTypeFromAnnotation(signature.declaration)
    signature.resolvedReturnType ??= type
  }
  return signature.resolvedReturnType
}
```

getReturnTypeFromAnnotation 的过程则非常简单。我们已经知道 f1 的类型标注是 `fn(x: number): string`，可以直接根据此类型节点，根据类型节点的类型（node.kind），获取字符串字面量。此过程相关 getTypeFromTypeNode 函数。

```ts
function getTypeFromTypeNodeWorker(node: TypeNode): Type {
  switch (node.kind) {
    case SyntaxKind.StringKeyword:
      return stringType // -> 'string'
    case SyntaxKind.NeverKeyword:
      return neverType
    //...
  }
}
```

getTypeFromTypeNode 和 getTypeFromTypeNodeWorker 的区别在于前者处理了控制流分析，后文会介绍。至此，已经完成 x1 的类型获取，结果为 `string`。

## Transformers

#### 转换器管道是如何工作的？

输出文件时会调用转换器管道转换代码。上文提到，输出操作是由 Program 统筹执行的，对应代码：

```ts
function emitWorker () {
  const emitResult = typeChecker.runWithCancellationToken(
    cancellationToken,
    () =>
      emitFiles(
        emitResolver,
        getEmitHost(writeFileCallback),
        sourceFile,
        getTransformers(options, customTransformers, emitOnly),
        emitOnly,
        /*onlyBuildInfo*/ false,
        forceDtsEmit,
        skipBuildInfo,
      ),
  )
}
```

转换器管道有 scriptTransformers 和 declarationTransformers 两种，分别对应代码生成和声明生成。ESNext、ES2021、ES2020 等不用版本的转换器被做成了插件，在编译时根据 `compilerOptions` 的 `target` 属性动态加载，输出前添加到转换器管道中，见以下代码。

```ts
function getScriptTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers, emitOnly?: boolean | EmitOnly) {
    const languageVersion = getEmitScriptTarget(compilerOptions)
    const transformers: TransformerFactory<SourceFile | Bundle>[] = []

    transformers.push(transformTypeScript)
    if (compilerOptions.experimentalDecorators) {
        transformers.push(transformLegacyDecorators)
    }
    if (getJSXTransformEnabled(compilerOptions)) {
        transformers.push(transformJsx)
    }
    if (languageVersion < ScriptTarget.ESNext) {
        transformers.push(transformESNext)
    }
    if (languageVersion < ScriptTarget.ES2021) {
        transformers.push(transformES2021)
    }
    if (languageVersion < ScriptTarget.ES2020) {
        transformers.push(transformES2020)
    }
    //...
    return transformers
}
```

#### 转换器插件是如何工作的？

以功能最简短的 taggedTemplate 转换器为例。

TODO

## 代码模式

#### 卫语句

TypeScript 常对 JavaScript 文件有特殊处理，比如在类型分析时如果遇到变量初始化器，在 TS 文件中可能要做类型推断，而 JS 文件中只需要简单从 JSDoc 注释中获取类型，因此常在代码中见到卫语句模式，如 checkDeclarationInitializer 中的 isInJSFile 判断。

```ts
function checkDeclarationInitializer(
  declaration: HasExpressionInitializer,
  checkMode: CheckMode,
  contextualType?: Type | undefined,
) {
  const initializer = getEffectiveInitializer(declaration)
  if (isInJSFile(declaration)) {
      return //...
  }
  return //...
}
```

#### 缓存模式

TypeScript Compiler 代码中常见一种 xxx、xxxWorker 的命名模式，分别对应功能的外部包装以及实际实现。以 getTypeOfVariableOrParameterOrProperty 为例，其外部包装实现了缓存效果，避免重复计算，而 getTypeOfVariableOrParameterOrPropertyWorker 才是真正的计算逻辑。

```ts
function getTypeOfVariableOrParameterOrProperty(symbol: Symbol): Type {
  const links = getSymbolLinks(symbol)
  if (!links.type) {
    const type = getTypeOfVariableOrParameterOrPropertyWorker(symbol)
    return type
  }
  return links.type
}
```

## 工具

* [TypeScript AST Viewer](https://ts-ast-viewer.com/#)

