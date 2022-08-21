# 🎃 斑马难题

[TOC]

好了，不卖关子了，我说的就是“**斑马难题**”。网传斑马难题是爱因斯坦设下的一道谜题，世界上只有 2% 的人能解。不过，对此我深表怀疑... 我们直接看看题目吧，如果实在毫无头绪的话，可以直接跳到文末视频（BiliBili 干杯~ []~(￣ ▽ ￣)~\*）。

## 题目介绍

> 五个不同国家且工作各不相同的人分别住在一条街上的五所房子里，每所房子颜色不同，每个人都有自己养的不同的宠物，喜欢喝不同的饮料。<br/>
> 根据提示，回答问题。

**提示以下列出：**

1. 英国人住在红色的房子里；
2. 西班牙人养了一条狗；
3. 日本人是一个油漆工；
4. 意大利人喜欢喝茶；
5. 挪威人住在左边的第一个房子里；
6. 绿房子在白房子的右边；
7. 摄影师养了一只蜗牛；
8. 外交官住在黄房子里；
9. 中间房子里的那个人喜欢喝牛奶；
10. 喜欢喝咖啡的人住在绿房子里；
11. 挪威人住在蓝色的房子旁边；
12. 小提琴家喜欢喝橘子汁；
13. 养狐狸的人所住的房子与医师的房子相邻；
14. 养马的人所住的房子与外交官的房子相邻；

根据条件判断，**哪所房子里的人养斑马，哪所房子里的人喜欢喝矿泉水**。

红红火火恍恍惚惚，是不是毫无头绪... 先别看答案，拿出纸和笔自己画画图吧。

<hr />

有条件，就有推理；将条件写成表达式，推理就变成了布尔代数，所以最符合逻辑的解法应该是真值表之类的。不过也许有人和我一样，第一反应是想写段代码穷举的 hhh... 事实上，我觉得用纸和笔推算答案可能要比写代码快很多，因为能猜到题目是给了挺充分条件，要求最优解的问题。

这里先后介绍分别使用两种工具解斑马题：**布尔代数** 和 **Excel**（对，你没看错）

## 布尔代数策略

在斑马题中，布尔代数其实就是和 True 或 False 组成的表达式打交道，针对题目给定的条件，如“小提琴家喜欢喝橘子汁”，我们需要找到条件所包含的变量，用以组成表达式。这之后，我们可以使用布尔代数的运算规则和真值表推算所有变量的可能的组合，根据组合的可能性得到符合答案的结果。

比方说我们有以下三条件：

> 上班摸鱼且心情不愉悦会导致进度不能完成；<br/>
> 上班听歌能使你心情愉悦；<br/>
> 心情愉悦时就算摸鱼也能完成进度；

那我们能从条件得到以下变量：

<ul>
    <li>A: 上班摸鱼</li>
    <li>B: 上班听歌</li>
    <li>C: 心情愉悦</li>
    <li>D: 进度完成</li>
</ul>

也就意味着，条件可以简写为：

<ul>
    <li>Ⅰ：A AND !C ⇒ !D</li>
    <li>Ⅱ：B ⇒ C</li>
    <li>Ⅲ：(C AND A) OR (C AND !A) ⇒ D</li>
</ul>

根据分配律，我们将相同项从表达式中提取出来，Ⅲ 可以进一步化简为：C AND (A OR !A) ⇒ D，即 Ⅲ：C ⇒ D

然后，我们把所有的变量和条件都列到一张二维表里。如下表，将 ABCD 四个变量可能出现的值进行排列组合，然后分别检验是否能使三个表达式都成立，都成立则说明这个组合是可行的。

运算规则如下：B ⇒ C 只有在“B 且 !C”的情况下为假。可以举个例子：如果努力（B）就能转正（C），那么努力了还不能转正才是“假”的形况。

| 项目编号 |  A  |  B  |  C  |  D  | A AND !C ⇒ !D | B ⇒ C | C ⇒ D | 满足三个条件 |
| :------: | :-: | :-: | :-: | :-: | :-----------: | :---: | :---: | :----------: |
|    1     | ❌  | ❌  | ❌  | ❌  |      ✅       |  ✅   |  ✅   |      ✅      |
|    2     | ❌  | ❌  | ❌  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    3     | ❌  | ❌  | ✅  | ❌  |      ✅       |  ✅   |  ❌   |      ❌      |
|    4     | ❌  | ❌  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    5     | ❌  | ✅  | ❌  | ❌  |      ✅       |  ❌   |  ✅   |      ❌      |
|    6     | ❌  | ✅  | ❌  | ✅  |      ✅       |  ❌   |  ✅   |      ❌      |
|    7     | ❌  | ✅  | ✅  | ❌  |      ✅       |  ✅   |  ❌   |      ❌      |
|    8     | ❌  | ✅  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    9     | ✅  | ❌  | ❌  | ❌  |      ✅       |  ✅   |  ✅   |      ✅      |
|    10    | ✅  | ❌  | ❌  | ✅  |      ❌       |  ✅   |  ✅   |      ❌      |
|    11    | ✅  | ❌  | ✅  | ❌  |      ✅       |  ✅   |  ❌   |      ❌      |
|    12    | ✅  | ❌  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    13    | ✅  | ✅  | ❌  | ❌  |      ✅       |  ❌   |  ✅   |      ❌      |
|    14    | ✅  | ✅  | ❌  | ✅  |      ❌       |  ❌   |  ✅   |      ❌      |
|    15    | ✅  | ✅  | ✅  | ❌  |      ✅       |  ✅   |  ❌   |      ❌      |
|    16    | ✅  | ✅  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |

可以从结果看到，满足三个条件的组合只有以下几项：

| 项目编号 |  A  |  B  |  C  |  D  | A AND !C ⇒ !D | B ⇒ C | C ⇒ D | 满足三个条件 |
| :------: | :-: | :-: | :-: | :-: | :-----------: | :---: | :---: | :----------: |
|    1     | ❌  | ❌  | ❌  | ❌  |      ✅       |  ✅   |  ✅   |      ✅      |
|    2     | ❌  | ❌  | ❌  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    4     | ❌  | ❌  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    8     | ❌  | ✅  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    9     | ✅  | ❌  | ❌  | ❌  |      ✅       |  ✅   |  ✅   |      ✅      |
|    12    | ✅  | ❌  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |
|    16    | ✅  | ✅  | ✅  | ✅  |      ✅       |  ✅   |  ✅   |      ✅      |

如果我们的问题是，找到上班摸鱼还能完成进度方案，那我们只需要寻找 A AND D 的项目：

- 第 12 条：上班摸鱼，上班不听歌，心情愉悦，进度照样能完成
- 第 16 条：上班摸鱼，上班听歌，心情愉悦，进度照样能完成

最终可以简化为：A AND D ⇒ C。即：你摸鱼也能完成进度，说明你肯定心情愉悦。（只是例子，各位千万别在项目中实践如何摸鱼...）

### 真值表&斑马题

我们回到斑马题，尝试用表达式先把条件写下来。比方说，对于前 6 个条件：

1. 英国人住在红色的房子里；
2. 西班牙人养了一条狗；
3. 日本人是一个油漆工；
4. 意大利人喜欢喝茶；
5. 挪威人住在左边的第一个房子里；

表达式记为：

1. EnglishRed(1) XOR EnglishRed(2) XOR EnglishRed(3) XOR EnglishRed(4) XOR EnglishRed(5) // 英国人住在红房间，但可能是 1-5 号任意一间
2. SpainDog(1) XOR SpainDog(2) XOR SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)
3. JapanesePainter(1) XOR JapanesePainter(2) XOR JapanesePainter(3) XOR JapanesePainter(4) XOR JapanesePainter(5)
4. ItalyTea(1) XOR ItalyTea(2) XOR ItalyTea(3) XOR ItalyTea(4) XOR ItalyTea(5)
5. Norway(1)
6. (Green(2) AND White(1)) XOR (Green(3) AND White(2)) XOR (Green(4) AND White(3)) XOR (Green(5) AND White(4))

不过，已经记了六个表达式了，为什么貌似一点成果都没有？

从这几个个表达式中确实能不能推断出东西来，因为未知量太多了。所以，我们可以把目光转到已知信息更多的条件上，比如 5 号表达式就是已知项目，可以记录到我们的备忘录上：

|   1    |  2  |  3  |  4  |  5  |
| :----: | :-: | :-: | :-: | :-: |
|   ?    |  ?  |  ?  |  ?  |  ?  |
| Norway |  ?  |  ?  |  ?  |  ?  |
|   ?    |  ?  |  ?  |  ?  |  ?  |
|   ?    |  ?  |  ?  |  ?  |  ?  |
|   ?    |  ?  |  ?  |  ?  |  ?  |

第 9 项，中间房子的人喜欢喝牛奶；第 12 项，挪威人住在蓝色的房子旁边；

|   1    |  2   |  3   |  4  |  5  |
| :----: | :--: | :--: | :-: | :-: |
|   ?    | Blue |  ?   |  ?  |  ?  |
| Norway |  ?   |  ?   |  ?  |  ?  |
|   ?    |  ?   | Milk |  ?  |  ?  |
|   ?    |  ?   |  ?   |  ?  |  ?  |
|   ?    |  ?   |  ?   |  ?  |  ?  |

得到了更多的信息，紧接着就可以开始化简已知的表达式。既然 Norway(1) 为真，那么 English(1)、EnglishRed(1) 都不可能为真。按照这个思路，前几条表达式可以简化为：

1. EnglishRed(3) XOR EnglishRed(4) XOR EnglishRed(5)
2. SpainDog(2) XOR SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)
3. JapanesePainter(2) XOR JapanesePainter(3) XOR JapanesePainter(4) XOR JapanesePainter(5)
4. ItalyTea(2) XOR ItalyTea(4) XOR ItalyTea(5)
5. Norway(1)
6. (Green(5) AND White(4)) XOR (Green(4) AND White(3))

欸，看到第六条表达式分支变成了仅仅两条，突然开心起来。根据表格，继续列表达式吧，已知越多，我们越能对表达式进行推断和化简：

7. PhotorSnail(1) XOR PhotorSnail(2) XOR PhotorSnail(3) XOR PhotorSnail(4) XOR PhotorSnail(5)
8. DiplomatYellow(1) XOR DiplomatYellow(3) XOR DiplomatYellow(4) XOR DiplomatYellow(5)
9. GreenCoffee(4) XOR GreenCoffee(5)
10. ViolinistJuice(2) XOR ViolinistJuice(4) XOR ViolinistJuice(5)
11. (Fox(1) AND Doctor(2)) XOR (Fox(2) AND Doctor(3)) XOR (Fox(3) AND Doctor(4)) XOR (Fox(4) AND Doctor(5)) XOR (Fox(2) AND Doctor(1)) XOR (Fox(3) AND Doctor(2)) XOR (Fox(4) AND Doctor(3)) XOR (Fox(5) AND Doctor(4))
12. (DiplomatYellow(1) AND Horse(2)) XOR (DiplomatYellow(3) AND Horse(2)) XOR (DiplomatYellow(3) AND Horse(4)) XOR (DiplomatYellow(4) AND Horse(3)) XOR (DiplomatYellow(4) AND Horse(5)) XOR (DiplomatYellow(5) AND Horse(4))

目前来说，已知量最多的是房子颜色数据，我们有 Yellow、Green、White、Red、Blue 这几个变量相关的表达式。所以可以从第 6 项，第 1 项，第 8 项入手，推断未知信息，见下例：

<details>
    <summary>已知条件</summary>
    <ul>
        <li>1. EnglishRed(3) XOR EnglishRed(4) XOR EnglishRed(5)</li>
        <li>6. (Green(5) AND White(4)) XOR (Green(4) AND White(3))</li>
        <li>8. DiplomatYellow(1) XOR DiplomatYellow(3) XOR DiplomatYellow(4) XOR DiplomatYellow(5)</li>
    </ul>
</details>

如果只考虑房子颜色的话，加上已知的蓝房子条件，化简为：

- Blue(2)
- Red(3) XOR Red(4) XOR Red(5)
- (Green(5) AND White(4)) XOR (Green(4) AND White(3))
- Yellow(1) XOR Yellow(3) XOR Yellow(4) XOR Yellow(5)

显然，1 号房子只能是黄色的（因为只有一个坑位，非他不可了...）。再由 14 得 2 号房子的主人养马，我们可以再次更新已知条件表格：

|    1     |   2   |  3   |  4  |  5  |
| :------: | :---: | :--: | :-: | :-: |
|  Yellow  | Blue  |  ?   |  ?  |  ?  |
|  Norway  |   ?   |  ?   |  ?  |  ?  |
|    ?     |   ?   | Milk |  ?  |  ?  |
| Diplomat |   ?   |  ?   |  ?  |  ?  |
|    ?     | Horse |  ?   |  ?  |  ?  |

继续，依据 Horse(2) 这个线索，可以更新以下几项表达式：

2. SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)
3. (Green(5) AND White(4) AND EnglishRed(3)) XOR (Green(4) AND White(3) AND EnglishRed(5))
4. PhotorSnail(3) XOR PhotorSnail(4) XOR PhotorSnail(5)
5. (Fox(1) AND Doctor(2)) XOR XOR (Fox(3) AND Doctor(4)) XOR (Fox(4) AND Doctor(5)) XOR (Fox(3) AND Doctor(2)) XOR (Fox(4) AND Doctor(3)) XOR (Fox(5) AND Doctor(4))

其中，第 6 项和第 10 项可以合并为：

6. (GreenCoffee(5) AND White(4) AND EnglishRed(3)) XOR (GreenCoffee(4) AND White(3) AND EnglishRed(5))

这之后，我们还剩以下表达式：

2. SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)
3. JapanesePainter(2) XOR JapanesePainter(3) XOR JapanesePainter(4) XOR JapanesePainter(5)
4. ItalyTea(2) XOR ItalyTea(4) XOR ItalyTea(5)
5. (Green(5) AND White(4) AND EnglishRed(3)) XOR (Green(4) AND White(3) AND EnglishRed(5))
6. PhotorSnail(3) XOR PhotorSnail(4) XOR PhotorSnail(5)、
7. ViolinistJuice(2) XOR ViolinistJuice(4) XOR ViolinistJuice(5)
8. (Fox(1) AND Doctor(2)) XOR XOR (Fox(3) AND Doctor(4)) XOR (Fox(4) AND Doctor(5)) XOR (Fox(3) AND Doctor(2)) XOR (Fox(4) AND Doctor(3)) XOR (Fox(5) AND Doctor(4))

我们取 2、4、6，三个变量比较少的表达式进行推算：

首先，将 6 拆分为两个变量：

- A: Green(4) AND White(3) AND EnglishRed(5)
- B: Green(5) AND White(4) AND EnglishRed(3)

再建立真值表：

|  A  |  B  | SpaDog(3) | SpaDog(4) | SpaDog(5) | ItaTea(2) | ItaTea(4) | ItaTea(5) | 满足条件 |
| :-: | :-: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :------: |
| ❌  | ✅  |    ✅     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌     |    ❌    |
| ❌  | ✅  |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅    |
| ❌  | ✅  |    ❌     |    ❌     |    ✅     |    ✅     |    ❌     |    ❌     |    ✅    |
| ❌  | ✅  |    ✅     |    ❌     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌    |
| ❌  | ✅  |    ❌     |    ✅     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌    |
| ❌  | ✅  |    ❌     |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ✅    |
| ❌  | ✅  |    ✅     |    ❌     |    ❌     |    ❌     |    ❌     |    ✅     |    ❌    |
| ❌  | ✅  |    ❌     |    ✅     |    ❌     |    ❌     |    ❌     |    ✅     |    ❌    |
| ❌  | ✅  |    ❌     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅     |    ❌    |
| ✅  | ❌  |    ✅     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅    |
| ✅  | ❌  |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅    |
| ✅  | ❌  |    ❌     |    ❌     |    ✅     |    ✅     |    ❌     |    ❌     |    ❌    |
| ✅  | ❌  |    ✅     |    ❌     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌    |
| ✅  | ❌  |    ❌     |    ✅     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌    |
| ✅  | ❌  |    ❌     |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ❌    |
| ✅  | ❌  |    ✅     |    ❌     |    ❌     |    ❌     |    ❌     |    ✅     |    ❌    |
| ✅  | ❌  |    ❌     |    ✅     |    ❌     |    ❌     |    ❌     |    ✅     |    ❌    |
| ✅  | ❌  |    ❌     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅     |    ❌    |

依据结果，把满足条件的项目列出。发现，ItalyTea(5) 这个条件永远不能满足，也就是说，可以不考虑这项了，可以把它从我们的表达式中划掉。

|  A  |  B  | SpaDog(3) | SpaDog(4) | SpaDog(5) | ItaTea(2) | ItaTea(4) | ItaTea(5) | 满足条件 |
| :-: | :-: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :------: |
| ❌  | ✅  |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅    |
| ❌  | ✅  |    ❌     |    ❌     |    ✅     |    ✅     |    ❌     |    ❌     |    ✅    |
| ❌  | ✅  |    ❌     |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ✅    |
| ✅  | ❌  |    ✅     |    ❌     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅    |
| ✅  | ❌  |    ❌     |    ✅     |    ❌     |    ✅     |    ❌     |    ❌     |    ✅    |

那么，第 4 项化简如下：

4. ItalyTea(2) XOR ItalyTea(4)

接着可以试试将其它项组合为真值表，继续演算，最终能推断出正确结果，完整过程就省略了...

真值表这玩意儿太繁琐了，你现在是不是和我一样有些头疼？现在直接介绍下一种解法，新手十分钟就能解。

## 剪枝策略

大家如有有写过搜索算法的话，都应该听过“剪枝”这个词。无论是深度优先搜索，还是广度优先搜索，只要是搜索问题，我们的目标都是要找到符合条件的问题解。如果此过程中判定的搜索条件越界了，那么就直接中止循环了。对应到斑马题中，我们把所有条件列出，然后逐个假设这些表达式是正确的，若碰到了当前假设的表达式违背了已知项时，就将这个假设删掉，不再继续寻找可能性。比方说，如果我们要装满一个容量为 5 的背包，一旦我们测试有一种装法装满了，那么就可以不继续装其它物品测试了（剪枝）。

举个例子，假设有已知表格如下，并分别应用两个假设：

- 绿房子在白房子的右边
- 喜欢喝咖啡的人住在绿房子里

|   1    |  2   |  3   |  4  |  5  |
| :----: | :--: | :--: | :-: | :-: |
|   ?    | Blue |  ?   |  ?  |  ?  |
| Norway |  ?   |  ?   |  ?  |  ?  |
|   ?    |  ?   | Milk |  ?  |  ?  |
|   ?    |  ?   |  ?   |  ?  |  ?  |
|   ?    |  ?   |  ?   |  ?  |  ?  |

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/%pn_06_23_024.gif)

我们将会得到两种“正确”的结果，以真值表的角度而言就意味着当前所有假设都是成立。

|   1    |  2   |  3   |   4   |   5    |
| :----: | :--: | :--: | :---: | :----: |
|   ?    | Blue |  ?   | White | Green  |
| Norway |  ?   |  ?   |   ?   |   ?    |
|   ?    |  ?   | Milk |   ?   | Coffee |
|   ?    |  ?   |  ?   |   ?   |   ?    |
|   ?    |  ?   |  ?   |   ?   |   ?    |

|   1    |  2   |   3   |   4    |  5  |
| :----: | :--: | :---: | :----: | :-: |
|   ?    | Blue | White | Green  |  ?  |
| Norway |  ?   |   ?   |   ?    |  ?  |
|   ?    |  ?   | Milk  | Coffee |  ?  |
|   ?    |  ?   |   ?   |   ?    |  ?  |
|   ?    |  ?   |   ?   |   ?    |  ?  |

此时，若假设有 Yellow(5) 条件，分别代入两个表格，发现 Yellow(5) 于第一个表格不成立，即与已知项相违背，那么之后的推算我们就可以仅使用第二个表格了（剪枝）。

实际推算时，需要注意表格的维度。比如刚才的“绿房子在白房子的右边”这个条件使我们表格的维度翻倍（使用“维度”可能相当不准确，大意就是某个条件如果是未知项目，就会分裂我们当前的搜索结果），所以接下来 GreenCoffee 这个条件需要代入两个表格进行推算。而接下来及时使用 Yellow(5) 条件，又可以减少表格的运算数量，减轻我们的运算负担。

下面我将展示一个推算的示例。

<br />

<iframe src="//player.bilibili.com/player.html?aid=926028678&bvid=BV1WT4y1J7No&cid=204804596&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="500px" />

## 阅读更多

斑马难题是上个月我在《计算机科学精粹》一书中发现的，尽管使用布尔代数解法的思路中只用了一些初等代数的知识，但一开始也是看不懂（开始后悔为啥不学点数学了）。我一度想写程序看能不能穷举这题，但过了一会儿就放弃了，因为突然觉得用 Excel 穷举会比打代码快。实践证明确实如此啊，**选择对的工具，往往决定了思路能不能一路畅通**。

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误的地方也麻烦各位评论指出。<JJ><p>若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=</p></JJ>

<JJ><p>所有的文章和源码都会汇总到我的[博客项目](https://github.com/Lionad-Morotar/blogs)，欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](https://www.lionad.art)，排版超 Nice 哦~</p></JJ>

- [计算机科学精粹](https://book.douban.com/subject/30382590/)
- [Solving the Zebra Puzzle with Boolean Algebra](https://code.energy/solving-zebra-puzzle/)
