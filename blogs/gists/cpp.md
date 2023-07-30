# C++

[TOC]

### 萌新问题

##### [C++ 使用字符串一定要 #include \<string\> 吗](https://www.zhihu.com/question/270726509)

```cpp
#include <iostream>
// #include <string>
```

如果引入 iostream，会间接引用 string 头文件，所以就算注释掉第二行，程序也能正常编译运行。如果去掉注释，由于 C++ 头文件使用了 #ifnfef #define #endif 所以不会二次引入，程序同样能正常编译运行。

##### [为什么尽量不要使用 using namespace std](https://www.zhihu.com/question/26911239)

如果是在源码里面用则无所谓，但是如果放到了头文件里，被其它代码引入了，那很容易带来困惑。如果想在头文件里用，最好用自己的命名空间包一层，同时做最小暴露，如使用 vector 那就 using std::vector。
