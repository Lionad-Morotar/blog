---
title: ML 可重复性
description: 机器学习可重复性（Reproducibility）的核心价值与实践方法
---

#### ML 可重复性为何重要？

可重复性不是"锦上添花"，而是 ML 系统的核心支柱。没有它，调试变成无头苍蝇，模型改进沦为猜测游戏，团队协作寸步难行。在受监管行业（金融、医疗、自动驾驶），证明模型行为的一致性更是合规的必要条件。正如名言所说："If it isn't reproducible, it's not science." —— 在 MLOps 中，不可重复的模型在生产环境中不可能稳健。

#### 实现 ML 可重复性的六大实践

1. **版本化一切**：用 Git 管理代码，用 DVC（Data Version Control）管理数据和模型，建立完整的版本控制闭环
2. **确保确定性**：固定随机种子（PyTorch/TensorFlow 的 `manual_seed`），设置 `cudnn.deterministic = True`，消除随机性带来的不确定性
3. **测试可重复性**：训练完模型后用相同输入验证，确保结果一致
4. **追踪实验**：使用 MLflow 等工具记录运行 ID、超参数、环境信息，确保任何成功运行都可复现
5. **数据版本追踪**：记录数据文件版本和校验和，验证数据集一致性
6. **环境容器化**：用 Docker 捕获完整软件环境，避免"在我机器上能跑"的问题

#### PyTorch 可重复性完整配置

```python
import random, numpy as np, torch

def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
```

注意：即使设置种子，GPU 并行计算的细微差异仍可能引入极少量随机性，多 GPU 训练时需格外注意。

见：[Ensuring Reproducibility in ML Systems](https://blog.dailydoseofds.com/p/ensuring-reproducibility-in-machine) | [PyTorch 可复现性指南](https://m.blog.csdn.net/yaoyao2024/article/details/145764746)
