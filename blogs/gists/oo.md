# 面向对象

## UML

类之间的关系总的来说可以包含这几种：

* A依赖B：对类B的修改会影响到类A
* A关联B：对象A知道对象B，类A依赖于类B
* A聚合B：对象A由B构成，类A依赖于类B
* A组合B：对象A由B构成且管理B的生命周期，类A依赖于类B
* A实现B：对象A可视为对象B，类A定义了接口B声明的方法，类A依赖于类B
* A继承B：对象A可视为对象B，类A继承类B的接口和实现，还可以对其扩展，类A依赖于类B

![Class Relations](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/b3612320-5822-48fc-8041-ead5c269f8e5.svg)

![Object Relations](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/cff33e77-e9aa-48eb-ae0d-01dd1561abd0.svg)
