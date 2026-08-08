---
title: Code Style
description: 代码风格与格式规范的最佳实践
original_path: /_workflow/linter/code-style.md
---

#### 软换行无法正确处理结构化文本

软换行（soft-wrapping）依赖编辑器自动换行，但无法正确处理需要语义理解的结构化文本。例如 Markdown 列表换行时需要保持缩进层级，这只有硬换行（hard-wrapping）才能做到。

#### 代码与注释宜采用不同的列宽限制

matklad 的实践建议：代码行宽限制在 100 列（并排显示两个编辑器的物理极限），而注释内容宜限制在 60-70 列。因为代码排版密度低于散文，且缩进会蚕食注释可用空间，较窄的行宽使注释更易阅读。

#### 注释换行应相对于缩进位置计算

matklad 期望的编辑器行为：注释内容在 70 列处换行，但这个限制应相对于注释起始位置而非绝对列数。这样深层嵌套的注释块依然保持舒适的阅读宽度，不会被过度挤压。

见：[Wrapping Code Comments @ matklad](https://matklad.github.io/2026/02/21/wrapping-code-comments.html)

#### 布尔变量用 is / has / can / should 四前缀

布尔命名应是一个语法通顺的疑问句，用四个前缀即可覆盖绝大多数场景：is 描述身份与状态、搭配形容词
（isActive、isEmpty）；has 描述拥有与包含、搭配名词（hasAccess、hasChildren）；can 描述权限或
潜在动作（canEdit、canRetry）；should 描述业务规则意图，把"能做什么"与"想做什么"分开
（shouldCacheResponse、shouldRetry）。前缀与词性错配（如 isAccess、hasActive）会迫使读者在脑中
重新解析句子；flag、done、check 这类不回答任何问题的"耸肩变量"则应改成可判读的状态问句，
如 isPaymentVerified。

见：[Stop Naming Your Variables "Flag": The Art of Boolean Prefixes](https://thatamazingprogrammer.com/posts/stop-naming-your-variables-flag-the-art-of-boolean-prefixes/)

#### 布尔命名避免否定式

不用 isNotEnabled、isDisabled、hasNoAccess 这类否定名。否定名让取反判断变成双重否定——
if (!isDisabled) 要解码为"如果不是未启用"；否定名在书写时自然，但对每个后续读者征税，IDE
反转 if 时甚至可能把 isDisabled 自动改成 isNotDisabled。唯一例外是镜像外部 API 或 HTML 属性
自带的否定默认值（如 noValidate），且应隔离在边界处：进入领域逻辑前映射为正向，
如 shouldValidate = !request.noValidate。

见：[Stop Naming Your Variables "Flag": The Art of Boolean Prefixes](https://thatamazingprogrammer.com/posts/stop-naming-your-variables-flag-the-art-of-boolean-prefixes/)

#### 函数参数避免裸布尔（布尔陷阱）

前缀规则适用于属性（状态），救不了参数位置的布尔：Execute(false, true, false) 对读者完全不透明，
这一设计缺陷称为布尔陷阱（Boolean Trap）。修法有三：布尔彻底改变方法行为时拆成两个方法
（SendImmediately / SendQueued）；表示模式时用枚举给分支命名（WriteMode.Append）；多个开关并存时
传配置对象（new ExportOptions { Script, Export, JustDrop }），让每个 true / false 在调用点都有名字。

见：[Stop Naming Your Variables "Flag": The Art of Boolean Prefixes](https://thatamazingprogrammer.com/posts/stop-naming-your-variables-flag-the-art-of-boolean-prefixes/)

#### 多用途布尔与漂移标志

两个局部布尔反模式。一是多用途布尔：变量名只声称一件事，实际检查多个条件——isValid 暗地里验证
"用户存在、有邮箱且已激活"，应显式展开，如 isReadyForBilling = user.Exists && user.HasEmail &&
user.IsActive。二是漂移标志：同一局部布尔在多个逻辑步骤间被反复复用（先记录保存失败、再叠加发信
失败的 error 桶），应用 Result 对象或提前返回替代，不要回收布尔桶。

见：[Stop Naming Your Variables "Flag": The Art of Boolean Prefixes](https://thatamazingprogrammer.com/posts/stop-naming-your-variables-flag-the-art-of-boolean-prefixes/)
