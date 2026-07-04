# 运营

> 在产品全生命周期提供支持。

## 数据

#### NPS 是什么？

NPS（Net Promoter Score） 是衡量客户忠诚度的关键指标，由贝恩咨询公司 Fred Reichheld 于 2003 年提出。其核心是通过一个问题"你会推荐我们的产品/服务给朋友吗？"来衡量客户对产品的满意度，
并将结果分为推荐者（9 ~ 10 分）、中立者（7 ~ 8 分）、批评者（0 ~ 6 分）三类，由推荐者减去批评者再除以有效问卷数量得到 NPS 值。一般来说，NPS 60+ 为优秀，
少数公司能做到在某次更新后达到 80+ 的高 NPS 值。

相比 CSAT（Customer Satisfaction） 和 CES（Customer Effort Score），NPS 更能反映用户对产品的忠诚度，但他也有自身的局限性，如无法解释具体痛点、只能反应品牌总体满意度等。
所以一般需要都流程上结合多种数据来评估分析，如，对于初创企业，NPS 可快速验证市场接受度；对于成熟企业，则是优化用户忠诚度的战略工具。NPS 的成功取决于数据驱动的行动闭环，绝非单一的数字追求。

<mermaid size="md">

graph TD
    A[收集用户评分数据] --> B{评分范围}
    B -->|9-10 分| C[**推荐者 Promoters**]
    B -->|7-8 分| D[**被动者 Passives**]
    B -->|0-6 分| E[**贬损者 Detractors**]
    C --> F[计算推荐者比例]
    E --> G[计算贬损者比例]
    F --> H[NPS = 推荐者比例 - 贬损者比例]
    G --> H
    H --> I[结果乘以 100]
    I --> J[最终 NPS 值]

</mermaid>

## 广告

#### 广告投放策略

<table>
<thead>
  <tr>
    <th>
      模型
    </th>
    
    <th>
      计费依据
    </th>
    
    <th>
      适用阶段
    </th>
    
    <th>
      风险
    </th>
    
    <th>
      优化重点
    </th>
    
    <th>
      典型案例
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        CPM(cost per mille)
      </strong>
    </td>
    
    <td>
      每千次展示
    </td>
    
    <td>
      品牌曝光期
    </td>
    
    <td>
      低
    </td>
    
    <td>
      CTR 提升
    </td>
    
    <td>
      奢侈品开屏广告（3 元/CPM）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPC(cost per click)
      </strong>
    </td>
    
    <td>
      每次点击
    </td>
    
    <td>
      流量获取期
    </td>
    
    <td>
      中
    </td>
    
    <td>
      落地页转化率
    </td>
    
    <td>
      百度搜索广告（5 元/CPC）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        oCPM
      </strong>
    </td>
    
    <td>
      优化千次展示
    </td>
    
    <td>
      转化优化期
    </td>
    
    <td>
      中高
    </td>
    
    <td>
      转化目标设置
    </td>
    
    <td>
      朋友圈广告（oCPM 20 元/转化）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPT(cost per time)
      </strong>
    </td>
    
    <td>
      固定时段展示
    </td>
    
    <td>
      品牌安全期
    </td>
    
    <td>
      高
    </td>
    
    <td>
      媒体资源选择
    </td>
    
    <td>
      门户网站首页包天（5 万/天）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPA(cost per action)
      </strong>
    </td>
    
    <td>
      每次转化动作
    </td>
    
    <td>
      效果考核期
    </td>
    
    <td>
      极高
    </td>
    
    <td>
      全链路转化率
    </td>
    
    <td>
      教育机构获客（300 元/留资）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPV(cost per view)
      </strong>
    </td>
    
    <td>
      有效播放（≥15 秒）
    </td>
    
    <td>
      视频营销期
    </td>
    
    <td>
      中
    </td>
    
    <td>
      前 3 秒完播率
    </td>
    
    <td>
      YouTube 贴片广告（0.1 元/CPV）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPI(cost per install)
      </strong>
    </td>
    
    <td>
      应用安装
    </td>
    
    <td>
      拉新增长期
    </td>
    
    <td>
      高
    </td>
    
    <td>
      ASO 优化
    </td>
    
    <td>
      游戏 App 推广（8 元/安装）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPS(cost per sale)
      </strong>
    </td>
    
    <td>
      实际销售额分成
    </td>
    
    <td>
      电商变现期
    </td>
    
    <td>
      零风险
    </td>
    
    <td>
      客单价提升
    </td>
    
    <td>
      淘宝客（佣金比例 20%）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        PPC(pay per customer)
      </strong>
    </td>
    
    <td>
      每潜在客户
    </td>
    
    <td>
      B2B 营销期
    </td>
    
    <td>
      中高
    </td>
    
    <td>
      线索质量筛选
    </td>
    
    <td>
      Salesforce 获客（100 元/条）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CPE(cost per engagement)
      </strong>
    </td>
    
    <td>
      深度互动
    </td>
    
    <td>
      社交互动期
    </td>
    
    <td>
      中高
    </td>
    
    <td>
      社交平台互动指标
    </td>
    
    <td>
      抖音挑战赛（0.5 元/次）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        dCPM
      </strong>
    </td>
    
    <td>
      动态 CPM
    </td>
    
    <td>
      实时竞价期
    </td>
    
    <td>
      高
    </td>
    
    <td>
      用户价值预测
    </td>
    
    <td>
      汽车广告（300%提升）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        PPE
      </strong>
    </td>
    
    <td>
      深度交互
    </td>
    
    <td>
      互动营销期
    </td>
    
    <td>
      高
    </td>
    
    <td>
      完整留资率
    </td>
    
    <td>
      保险行业（120 元/条）
    </td>
  </tr>
</tbody>
</table>

#### 为什么没有考核点在付费阶段的投放策略？

如果用户为广告付费才算作有效广告，这给了广告主很大的作弊空间。

#### oCPM 和 CPM 相比有什么优势？

oCPM 是 Facebook 率先使用的一种广告投放方式，它在 CPM 投放方式的基础上，将广告主的出价点从曝光下移到转化，达到激励相容的效果。

具体来看，CPM 是苹果花费 20 块钱买 B 站 2000 次曝光，平台只需要保证曝光量就能拿到钱，oCPM 是苹果花费 20 块钱买 B 站 2 次曝光，但平台保证这 2 次曝光中至少有 1 次转化。这样看来，如果转换率不达标，
苹果会亏钱，所以平台会更加努力提升转化率，达到正和博弈效果。一般平台还会设置赔率，如 20 块钱买 2 次曝光，但没有转化就退 2 块钱。

## 线索生成

#### Skills 为何正在替代 Freemium 成为新的线索生成策略？

Freemium 模式建立在"公司知道如何构建，而用户不知道"的不对称性之上。
免费层存在于用户需求与能力之间的差距中。
但当用户可以用一个 Prompt 在 20 分钟内构建出满足 60% 需求的解决方案时，
这种不对称性正在崩溃——用户成为"漏斗中的幽灵"，从未进入转化漏斗。

Skills（技能文件）作为新的线索生成方式，核心差异在于：

1. **无法被 Prompt 替代**：技能包含的是积累的专业领域理解，
而非简单的功能代码。用户可以说"Claude，给我做一个营销工具"，
但无法获得 Corey Haines 在真实项目中迭代出的营销洞察。
2. **提升最佳可用人类标准**：没有技能时，用户获得的是通用 AI 水平；
有了技能，AI 操作水平相当于在该领域工作数年的专家。
这是"可用帮助"的质变，而非量变。
3. **护城河是领域理解而非代码**：技能免费开源（MIT/Apache 2.0），
真正的价值在于编码者对"什么会出错"的积累理解。
这改变了商业模式——从"隐藏护城河"到"直接赠送护城河"。

见：[The Ghost in the Funnel](https://worksonmymachine.ai/p/the-ghost-in-the-funnel)、
[I know Kung Fu](https://www.sideband.pub/p/i-know-kung-fu)
