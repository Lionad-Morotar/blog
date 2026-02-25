---
phase: 08-medium-batch-3
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_software/software.md
  - content/6.maps/_software/whale-fall/whale-fall.md
  - content/6.maps/_software/software-engineering/software-engineering.md
  - content/6.maps/_software/data-structure/data-structure.md
  - content/6.maps/_software/design-patterns/design-patterns.md
  - content/6.maps/_software/algorithm/algorithm.md
autonomous: true
must_haves:
  truths:
    - _software domain entry file exists with proper frontmatter and subdomain navigation
    - whale-fall.md moved to whale-fall/ subdirectory as subdomain entry
    - software-engineering.md moved to software-engineering/ subdirectory as subdomain entry
    - data-structure.md moved to data-structure/ subdirectory as subdomain entry
    - design-patterns.md moved to design-patterns/ subdirectory as subdomain entry
    - algorithm.md moved to algorithm/ subdirectory as subdomain entry
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_software/software.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_software/whale-fall/whale-fall.md
      provides: Whale Fall open source ecosystem content as subdomain entry with original_path
    - path: content/6.maps/_software/software-engineering/software-engineering.md
      provides: Software engineering principles content as subdomain entry with original_path
    - path: content/6.maps/_software/data-structure/data-structure.md
      provides: Data structures content as subdomain entry with original_path
    - path: content/6.maps/_software/design-patterns/design-patterns.md
      provides: Design patterns content as subdomain entry with original_path
    - path: content/6.maps/_software/algorithm/algorithm.md
      provides: Algorithms content as subdomain entry with original_path
  key_links:
    - from: content/6.maps/_software/software.md
      to: content/6.maps/_software/whale-fall/whale-fall.md
      via: subdomain navigation link
    - from: content/6.maps/_software/software.md
      to: content/6.maps/_software/software-engineering/software-engineering.md
      via: subdomain navigation link
    - from: content/6.maps/_software/software.md
      to: content/6.maps/_software/data-structure/data-structure.md
      via: subdomain navigation link
    - from: content/6.maps/_software/software.md
      to: content/6.maps/_software/design-patterns/design-patterns.md
      via: subdomain navigation link
    - from: content/6.maps/_software/software.md
      to: content/6.maps/_software/algorithm/algorithm.md
      via: subdomain navigation link
    - from: content/6.maps/0.index.md
      to: new _software domain paths
      via: updated cross-domain links
---

# Phase 8-03: Migrate _software Domain (MED-11)

<objective>
Migrate the _software domain to the 4-layer structure by creating a domain entry file and organizing five software-related content files into dedicated subdomains: whale-fall/, software-engineering/, data-structure/, design-patterns/, and algorithm/.

Purpose: Establish consistent domain structure for software engineering knowledge with clear subdomain separation for open source ecosystems, engineering principles, data structures, design patterns, and algorithms.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_software/whale-fall.md
@content/6.maps/_software/software-engineering.md
@content/6.maps/_software/data-structure.md
@content/6.maps/_software/design-patterns.md
@content/6.maps/_software/algorithm.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _software domain entry file</name>
  <files>content/6.maps/_software/software.md</files>
  <action>
Create content/6.maps/_software/software.md as the domain entry file with:
1. YAML frontmatter:
   - title: 软件
   - description: 软件工程、数据结构、算法与设计模式
2. ## 子领域 section with links to subdomains:
   * [鲸落](/maps/_software/whale-fall/whale-fall) - 大型开源项目的生态演替
   * [软件工程](/maps/_software/software-engineering/software-engineering) - 软件工程原则与实践
   * [数据结构](/maps/_software/data-structure/data-structure) - 基础数据结构知识
   * [设计模式](/maps/_software/design-patterns/design-patterns) - 经典设计模式解析
   * [算法](/maps/_software/algorithm/algorithm) - 经典算法原理与实现
3. ## 概述 section with brief domain overview mentioning:
   - Software engineering principles and practices
   - Open source ecosystem evolution (Whale Fall)
   - Fundamental computer science concepts (data structures, algorithms)
   - Design patterns for software architecture
4. No existing content to preserve (creating new domain entry)
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create whale-fall subdomain and migrate content</name>
  <files>content/6.maps/_software/whale-fall/whale-fall.md</files>
  <action>
1. Create directory content/6.maps/_software/whale-fall/
2. Move original content/6.maps/_software/whale-fall.md to content/6.maps/_software/whale-fall/whale-fall.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_software/whale-fall.md
4. Preserve all original content including:
   - 开源项目的鲸落三阶段 section
   - 连续再殖民化 section (Sass迁移路径、失败模式)
   - 许可证变更触发食腐 section
   - Sun Microsystems的鲸群死亡 section
   - 浅水区与云厂商整合 section
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Whale-fall subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create software-engineering subdomain and migrate content</name>
  <files>content/6.maps/_software/software-engineering/software-engineering.md</files>
  <action>
1. Create directory content/6.maps/_software/software-engineering/
2. Move original content/6.maps/_software/software-engineering.md to content/6.maps/_software/software-engineering/software-engineering.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_software/software-engineering.md
4. Preserve all original content including:
   - Gists section with Martin Fowler访谈
   - All quotes about AI and software engineering
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Software-engineering subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create data-structure subdomain and migrate content</name>
  <files>content/6.maps/_software/data-structure/data-structure.md</files>
  <action>
1. Create directory content/6.maps/_software/data-structure/
2. Move original content/6.maps/_software/data-structure.md to content/6.maps/_software/data-structure/data-structure.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_software/data-structure.md
4. Preserve all original content including:
   - 树 section (Morris遍历、二叉树删除)
   - B树和B+树详解 section
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Data-structure subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create design-patterns subdomain and migrate content</name>
  <files>content/6.maps/_software/design-patterns/design-patterns.md</files>
  <action>
1. Create directory content/6.maps/_software/design-patterns/
2. Move original content/6.maps/_software/design-patterns.md to content/6.maps/_software/design-patterns/design-patterns.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_software/design-patterns.md
4. Preserve all original content including:
   - Related link to OOP
   - 创建型模式 section (工厂、抽象工厂、生成器、原型、单例)
   - 结构型模式 section (适配器、桥接、组合、装饰、外观、享元、代理)
   - 行为模式 section (责任链、命令、中介者、备忘录、观察者)
   - 阅读 section
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Design-patterns subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create algorithm subdomain and migrate content</name>
  <files>content/6.maps/_software/algorithm/algorithm.md</files>
  <action>
1. Create directory content/6.maps/_software/algorithm/
2. Move original content/6.maps/_software/algorithm.md to content/6.maps/_software/algorithm/algorithm.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_software/algorithm.md
4. Preserve all original content including:
   - 快速排序 section with implementation link
   - 多人协作系统 section with Figma references
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Algorithm subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the links in 0.index.md under ## 软件 section:
- Change `[软件工程](/maps/_software/software-engineering)` to `[软件工程](/maps/_software/software-engineering/software-engineering)`
- Change `[Whale Fall](/maps/_software/whale-fall)` to `[Whale Fall](/maps/_software/whale-fall/whale-fall)`
- Change `[设计模式](/maps/_software/design-patterns)` to `[设计模式](/maps/_software/design-patterns/design-patterns)`
- Change `[数据结构](/maps/_software/data-structure)` to `[数据结构](/maps/_software/data-structure/data-structure)`
- Change `[算法](/maps/_software/algorithm)` to `[算法](/maps/_software/algorithm/algorithm)`
  </action>
  <verify>Links in 0.index.md point to new paths</verify>
  <done>Cross-domain links updated to reflect new structure</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_software/software.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all five subdomains
- [ ] content/6.maps/_software/whale-fall/whale-fall.md exists with original content
- [ ] content/6.maps/_software/software-engineering/software-engineering.md exists with original content
- [ ] content/6.maps/_software/data-structure/data-structure.md exists with original content
- [ ] content/6.maps/_software/design-patterns/design-patterns.md exists with original content
- [ ] content/6.maps/_software/algorithm/algorithm.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] 0.index.md links updated to new paths
- [ ] All original content preserved
</verification>

<success_criteria>
- _software domain follows 4-layer structure with 5 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/08-medium-batch-3/08-P03-SUMMARY.md`
</output>
