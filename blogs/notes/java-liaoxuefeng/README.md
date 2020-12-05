# Java

## 基本类型

* 基本类型：byte、short、int、long、float、double、char、boolean
* 引用类型：class、interface

基本类型都有对应的包装类，如 int 对应有 Integer，Integer 是引用类型。引用类型在进行比较的时候，需要使用 equals 方法，而不是等号，比如：`"123".equals("123")`，不过也有例外，比如使用 enum 定义的枚举类型可以使用等号比较。

#### 数字

计算机制：

* 运算时如果类型不一致，结果的类型总为位数较大值的类型，如 short 和 int 一起运算，结果为 int 类型。
* 浮点数参 IEEE-754 标准

数字范围：

* byte: -128 ~ 127
* short: -32768 ~ 32767
* int: -2147483648 ~ 2147483647
* long: -9223372036854775808 ~ 9223372036854775807

需要注意的点：

* 整形除零会报错，而浮点数不会

#### 字符串

Java 中 Char 和 String 在内存中是以 Unicode 的形式（两个字节）表示的。

String 是不可变对象，所以在拼接过程中会创造新的字符串，扔掉旧的字符串。

需要注意的点：

* 多行字符串会自动去掉共同缩进

#### 数组

需要注意的点：

* 数组初始化后会填充默认值，整型都是0，浮点型是0.0，布尔型是false
* 数组长度固定

## OOP

### Class

使用 protected 关键字可以将字段和方法的访问权限控制到继承树内部。

使用 @Override 可以让编译器帮助检测是否进行了正确的 Override。

Interface 中的字段只能是 public、static、final 所以定义字段时可以省略这几个关键字。

Java 的内部类 Inner Class、Anonymous Class 和 Static nested Class 都拥有外部类的 private 字段的访问权限，并且，前两者还必须依附外部类的实例。

需要注意的点：

* 指定了 final 字段后，仍可以在构造器中进行初始化

## 常见错误

* `错误: 编码GBK的不可映射字符`

如果你的源文件是 UTF-8 编码，运行时则需要指定编译器的解码器为 UTF-8，如：`javac -encoding UTF-8 Hello.java | java Hello`

