# 设计模式

设计模式可以按照使用方式划分为：创建型模式、结构型模式和行为模式。

* 创建型模式：提供创建对象的机制，增加已有代码的灵活性和可复用性
* 结构性模式：将对象和类组装成更大的结构，保证结构的灵活和高校
* 行为模式：提供对象间的沟通和职责分配  

## 创建型模式

#### 工厂

使用工厂模式时，父类提供一个创建对象的方法，允许子类决定实例化对象的具体类型。使用工厂模式可以避免创建者和具体产品之间的紧密耦合，你可以把具体的业务逻辑放到具体创建者中去实现，就算有新的业务逻辑，完全可以使用新的具体创建者去扩展工厂函数。

![[工厂结构](https://www.processon.com/diagraming/614ebac1637689481b65eb42)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/1bcb390f-a1bf-4cb0-8511-de8cecea11ce.svg)

一般来说，由于其复杂性低，工厂函数适合快速设计时使用，随后可以转化为抽象工厂、原型或者生成器模式。

#### 抽象工厂

抽象工厂可以创建一系列相关的对象，而无需指定其具体类，可以将代码和具体创建者（业务逻辑）解耦。

![[抽象工厂结构](https://www.processon.com/diagraming/614ec5dd1efad403f372ff29)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/a67af4bd-c5ff-472b-a6b4-2c4ea05460d4.svg)

抽象工厂专注于生产一系列对象，举个例子，Weex 和 Web 版本的 ElementUI（假设有的话）就需要根据不同平台去初始化不同的具体工厂实例，再使用具体工厂实例去生成不同的组件。

#### 生成器

生成器模式允许使用相同的代码生成不同类型、不同形式的复杂对象，这些复杂对象的构造函数本需要非常多的参数来控制其构造细节，使用生成器模式可以避免这些无止尽的构造函数重载。由于生成器还解耦了构造的步骤，你也许需要一个主管类（Director）来封装这些构造步骤，使其与客户端解耦。

<!-- ProcessOn 生成的 SVG 格式有些问题 -->
![[生成器结构](https://www.processon.com/diagraming/614ed017637689481b66191e)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/bd255980-5c94-4d8a-8a6f-0b7149ade883.svg)

从图中可以看到当前的主管结构和具体生成器是解耦的，也就是说客户端依赖具体生成器来获取生成结果，这在可能有产品不遵循通用生成器接口的时候有用。

#### 原型

原型模式使你能否复制已有对象，而无需依赖它们所属的类。通常，直接遍历并拷贝对象会丢失一些对象私有属性或是外部依赖变量，使用原型模式可以让你更便捷及高效地完成复制操作。直接调用已有对象，以复制一个新对象就像细胞的有丝分裂；你也可以通过提供一个注册表来维护一些基本的可用来复制的预生成对象，并提供搜索方法，方便客户端搜索它们  。

![[原型结构](https://www.processon.com/diagraming/614edeb80e3e743114730791)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/a719383a-7761-4a72-90b9-ac83da7b47d8.svg)

原型模式有一个显著的缺陷便是，克隆包含循环引用的对象会变得非常麻烦。

#### 单例

单例模式保证了一个类只有一个对象实例或为访问某实例提供了一个全局节点。使用单例能够方便的控制资源的调度。

![[单例结构](https://www.processon.com/diagraming/614ee4e7637689481b664044)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/42fd4a01-5832-4c43-84c7-fda41402f2d4.svg)

## 结构型模式

#### 适配器

适配器使接口不兼容的对象能够相互合作。

![[适配器结构](https://www.processon.com/diagraming/614ee9531e08536dabbca6d6)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/f3a86005-1da5-4233-81e9-c0bddccc6c3c.svg)


#### 桥接

桥接可以将一个大类或者一系列紧密相关的类拆分为抽象和实现两个独立的层次结构，从而在开发的时候分别使用。这里说的抽象和实现与OO中的名词不是一回事儿，更适合描述应该是：使用桥接模式意味着把一些基础函数以及用基础函数组合出来的更抽象的函数分别按照实现类和抽象类分开。

![[桥接结构](https://www.processon.com/diagraming/614f66a7637689167d0dc218)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/5de62e64-55e2-459b-8cf8-6d5a8914d17c.svg)

想象一下无论使用遥控器或是手机都能给电视或空调静音，在这里“静音”是抽象，而“减小音量”是抽象，一直减小音量就静音了，所以他们两是聚合的关系。

#### 组合

使用组合模式将对象组合成树状结构，并且能够像使用独立对象一样使用他们。

![[组合结构](https://www.processon.com/diagraming/614edeb80e3e743114730791)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/e0de9723-e348-41c9-9461-6ee6e5bd52ef.svg)

需要注意的是，如果核心模型能用树状结构表示，使用组合模式才有价值。容器（或组合）本身不完成具体工作，而是将请求递归地传递给自己的子项目，然后汇总结果。

#### 装饰

装饰允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

![[装饰器结构](https://www.processon.com/diagraming/614edeb80e3e743114730791)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/64b2e57c-5315-48f1-a7df-54ae6942b88c.svg)

咋一眼看起来装饰的类层次结构和组合的类层次结构很像，hhh

感觉 OO 中的装饰器实现起来蹩脚，使用起来也糟心。为了封装对象，需要提前创建特定的类，明明用高阶函数 10 行就能封装好代码，还比类更简单明了！

#### 外观

外观模式能为程序库、框架或其他复杂类提供一个简单的接口，这样初始化、编排之类的业务逻辑就能从客户端解耦开来。

![[外观结构](https://www.processon.com/diagraming/614fcbcf7d9c0867a384de1b)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/05f145a2-7048-4fb3-8fc3-5e5ac63f4f8d.svg)

#### 享元

享元通过共享多个对象中共有的相同状态，让你能在有限的内存容量中载入更多对象。这是一种优化手段，需要确定内存消耗问题无法使用其它更加友好的方式来解决时才好使用。

![[享元结构](https://www.processon.com/diagraming/614fdf7f1e085341faa58eb2)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/04b754e1-4d9c-493f-ac37-86dea28e6316.svg)

#### 代理

代理能够让你提供对象的替代品或占位符，该替代品能够控制着原对象的访问，允许操作提交给对象前后进行一些处理。

![[代理结构](https://www.processon.com/diagraming/614fe9c77d9c0867a3857604)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/99d55f92-79b8-444f-875b-746f141206be.svg)

代理和装饰看起来非常相似，他们都实现了客户端想要的接口，封装对象并伪装成这个对象进行工作，但其实他们有着本质的差异：装饰增强对象，但需要由客户端主动使用装饰；代理重在请求拦截，一般来说它不会提交生成的主动权。
