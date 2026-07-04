# AI Industry Dynamics

> Market trends and industry analysis in AI

## 投资与商业

#### Nvidia 与 OpenAI 的 1000 亿美元投资承诺发生了什么变化？

2025 年 9 月，Nvidia 与 OpenAI 签署意向书，宣布 "intends to invest up to $100 billion"。
2026 年 2 月，Nvidia CEO Jensen Huang 澄清这"从来不是承诺"，只是 OpenAI 的"邀请"。
最新进展显示，双方正协商以 300 亿美元投资取代原 1000 亿美元长期承诺。

见：[NVIDIA 与 OpenAI 宣布战略合作](https://blogs.nvidia.cn/blog/openai-nvidia/)、[英伟达 CEO 黄仁勋最新表态](https://baijiahao.baidu.com/s?id=1856006651809270501)、[英伟达将向 OpenAI 投资 300 亿美元](https://www.163.com/dy/article/KM702V170511A6N9.html)

#### "AI 投资循环"担忧是什么？

分析师指出 Nvidia→OpenAI→Oracle→Nvidia 的资金流向形成"循环融资"（circular financing）模式，引发对 AI 需求真实性的质疑。
但也有观点认为这只是正常的战略生态投资。

见：[NVIDIA invests $100B in OpenAI, a vendor financing deal](https://www.linkedin.com/posts/spshulem_nvidia-invested-100b-in-openai-openai-will-activity-7380996564745396226-pUDD)、[高盛发布《The 720》研报](https://xueqiu.com/7037545909/355781406)

#### OpenAI 正在尝试广告模式？

是的。2026 年初 OpenAI 开始在 ChatGPT 中测试广告，而 CEO Sam Altman 曾将广告视为"最后手段"。
公司 2025 年运营亏损约 80 亿美元。

见：[ChatGPT 即将上线广告](https://m.sohu.com/a/977368965_211762)

## 产品形态演进

#### MenuGen 启示：传统 App 会被模型原生能力直接吞掉

Karpathy 自己写的 MenuGen 是一个“拍菜单生成菜品图”的应用。旧范式做法需要 OCR 识别文字、抽出菜名、调用图像生成器、重新排版、部署上线，几层中间步骤串起来。
Software 3.0 版本只需要把菜单照片交给 Gemini，再让 Nano Banana 把菜品图叠回菜单——返回的不是结构化数据或组件，而是一张已经渲染完成的新图片。

Karpathy 由此判断“我整个 MenuGen 都是多余的，那个 App 不应该存在”。商业含义是：很多 AI 应用以为自己在做“更快的软件”——把 10 步压成 3 步，但模型能力会直接覆盖整个任务，中间 App 失去必要性。
更值得做的不是把已有东西做得更快，而是用 LLM 的信息重组能力做出“以前根本不可能存在的东西”，例如把文章/文档/事实重新编译成 wiki。

见：[Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering](https://baoyu.io/blog/andrej-karpathy-from-vibe-coding-to-agentic-engineering)
