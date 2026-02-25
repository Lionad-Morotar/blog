---
phase: 07-medium-batch-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_typescript/typescript.md
  - content/6.maps/_typescript/type-gymnastics/type-gymnastics.md
autonomous: true
must_haves:
  truths:
    - _typescript domain entry file exists with proper frontmatter and subdomain navigation
    - type-gymnastics.md moved to type-gymnastics/ subdirectory as subdomain entry
    - original_path preserved in moved file frontmatter
    - Internal links in typescript.md updated to new subdomain path
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_typescript/typescript.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_typescript/type-gymnastics/type-gymnastics.md
      provides: Type gymnastics content as subdomain entry with original_path
  key_links:
    - from: content/6.maps/_typescript/typescript.md
      to: content/6.maps/_typescript/type-gymnastics/type-gymnastics.md
      via: subdomain navigation link
    - from: content/6.maps/0.index.md
      to: new _typescript domain paths
      via: updated cross-domain links
---

# Phase 7-01: Migrate _typescript Domain

<objective>
Migrate the _typescript domain to the 4-layer structure by creating a domain entry file and organizing the type-gymnastics content into a dedicated subdomain.

Purpose: Establish consistent domain structure for TypeScript knowledge with clear subdomain separation for advanced type-level programming.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_typescript/typescript.md
@content/6.maps/_typescript/type-gymnastics.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _typescript domain entry file</name>
  <files>content/6.maps/_typescript/typescript.md</files>
  <action>
Create content/6.maps/_typescript/typescript.md as the domain entry file with:
1. YAML frontmatter:
   - title: TypeScript
   - description: TypeScript 的核心概念、高级类型、应用实践和工程化经验
2. ## 子领域 section with link to subdomain:
   * [类型体操](/maps/_typescript/type-gymnastics/type-gymnastics)
3. ## 概述 section with brief domain overview mentioning:
   - TypeScript as a typed superset of JavaScript
   - Core concepts: type system, generics, advanced types
   - Reference to type-gymnastics for advanced type-level programming
4. Preserve key content sections from original typescript.md:
   - Roadmap (入门/进阶/高级阶段)
   - 模块系统
   - 类型系统
   - 高级类型
   - 编译器
   - 项目配置
   - 经验
   - 应用
   - 推荐阅读
5. Update internal link: change `/maps/_typescript/type-gymnastics` to `/maps/_typescript/type-gymnastics/type-gymnastics`
  </action>
  <verify>File exists with proper frontmatter, subdomain navigation, and all original content preserved</verify>
  <done>Domain entry file created with correct structure, navigation, and content</done>
</task>

<task type="auto">
  <name>Create type-gymnastics subdomain and migrate content</name>
  <files>content/6.maps/_typescript/type-gymnastics/type-gymnastics.md</files>
  <action>
1. Create directory content/6.maps/_typescript/type-gymnastics/
2. Move original content/6.maps/_typescript/type-gymnastics.md to content/6.maps/_typescript/type-gymnastics/type-gymnastics.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_typescript/type-gymnastics.md
4. Preserve all original content including:
   - 语法关键字 (keyof, extends, infer, 展开运算)
   - 字面量
   - 语句结构 (函数, 选择, 循环)
   - 基本运算 (比较, 加减乘除)
   - 工具
   - 阅读更多
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Type-gymnastics subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the links in 0.index.md under ## 前端 section:
- Keep `[TypeScript](/maps/_typescript/typescript)` as-is (domain entry)
- No changes needed for type-gymnastics as it's not directly linked from 0.index.md
  </action>
  <verify>Links in 0.index.md are correct</verify>
  <done>Cross-domain links verified</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_typescript/typescript.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to type-gymnastics subdomain
- [ ] content/6.maps/_typescript/type-gymnastics/type-gymnastics.md exists with original content
- [ ] Moved file has original_path in frontmatter
- [ ] Internal link in typescript.md updated to new path
- [ ] All original content preserved
</verification>

<success_criteria>
- _typescript domain follows 4-layer structure with 1 subdomain
- Domain entry provides clear navigation to type-gymnastics subdomain
- Original content accessible at new location with preserved history
- Internal links updated to reflect new structure
</success_criteria>

<output>
After completion, create `.planning/phases/07-medium-batch-2/07-P01-SUMMARY.md`
</output>
