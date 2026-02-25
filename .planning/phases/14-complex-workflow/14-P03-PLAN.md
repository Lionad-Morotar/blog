---
phase: 14-complex-workflow
plan: P03
type: execute
wave: 2
depends_on:
  - 14-P01
  - 14-P02
files_modified:
  - content/6.maps/_workflow/monorepo/monorepo.md
  - content/6.maps/_workflow/monorepo/turborepo.md
  - content/6.maps/_workflow/compiler/compiler.md
  - content/6.maps/_workflow/workflow.md
  - content/6.maps/_workflow/_dir.yml
autonomous: true
must_haves:
  truths:
    - monorepo/ subdirectory exists with entry file and turborepo.md
    - compiler/ subdirectory exists with entry file
    - workflow.md domain entry exists with 6-subdomain navigation
    - _dir.yml directory configuration exists
    - All root files (fe-engineering.md, monorepo.md, compiler.md) removed after migration
    - All files have proper frontmatter with original_path preserved
  artifacts:
    - path: content/6.maps/_workflow/monorepo/monorepo.md
      provides: "Monorepo subdomain entry with navigation"
      min_lines: 40
      contains: "original_path"
    - path: content/6.maps/_workflow/monorepo/turborepo.md
      provides: "Turborepo documentation"
      min_lines: 30
    - path: content/6.maps/_workflow/compiler/compiler.md
      provides: "Compiler subdomain entry"
      min_lines: 25
      contains: "original_path"
    - path: content/6.maps/_workflow/workflow.md
      provides: "Workflow domain entry with 6-subdomain navigation"
      min_lines: 50
    - path: content/6.maps/_workflow/_dir.yml
      provides: "Nuxt Content directory configuration"
  key_links:
    - from: "workflow.md"
      to: "engineering/engineering.md"
      via: "## 子领域导航"
    - from: "workflow.md"
      to: "monorepo/monorepo.md"
      via: "## 子领域导航"
    - from: "monorepo/monorepo.md"
      to: "monorepo/turborepo.md"
      via: "## 主题 navigation"
---

<objective>
Create monorepo/ and compiler/ subdomains, create workflow.md domain entry, and clean up root files.

Purpose: Complete the _workflow domain restructuring by creating the final two subdomains and the domain entry file.
Output: 5 files (2 subdomain entries, 1 turborepo topic, 1 domain entry, 1 directory config) and cleanup of 3 root files.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
@/Users/lionad/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/14-complex-workflow/14-RESEARCH.md

Current structure:
- content/6.maps/_workflow/monorepo.md (root file, to migrate)
- content/6.maps/_workflow/compiler.md (root file, to migrate)
- content/6.maps/_workflow/fe-engineering.md (already migrated to engineering/ in P01)

Target structure:
- content/6.maps/_workflow/monorepo/monorepo.md (migrated from root)
- content/6.maps/_workflow/monorepo/turborepo.md (NEW - based on RESEARCH.md recommendation)
- content/6.maps/_workflow/compiler/compiler.md (migrated from root)
- content/6.maps/_workflow/workflow.md (NEW domain entry)
- content/6.maps/_workflow/_dir.yml (NEW directory config)

From RESEARCH.md: "新增 turborepo.md，因 2026 年 Turborepo 已成为 Monorepo 主流工具"
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create monorepo/ subdirectory with entry and turborepo.md</name>
  <files>
    content/6.maps/_workflow/monorepo/monorepo.md
    content/6.maps/_workflow/monorepo/turborepo.md
  </files>
  <action>
    1. Create content/6.maps/_workflow/monorepo/ directory
    2. Create monorepo.md by migrating from root monorepo.md:
       - Add original_path: "/_workflow/monorepo.md" to frontmatter
       - Update structure: ## 主题 section with link to turborepo.md
       - Keep existing ## 简介 section with H4 knowledge points:
         - monorepo 是什么？
         - 使用 monorepo 能解决什么问题？
         - 使用 monorepo 带来了什么问题？
       - Keep existing ## Rush and ## Lerna sections
       - Add ## Turborepo section with brief intro and link to turborepo.md
    3. Create turborepo.md NEW file:
       - Frontmatter: title="Turborepo", description="Turborepo 是 Vercel 推出的 Monorepo 构建系统，提供任务管道、本地和远程缓存等功能"
       - ## 核心特性 section with H4 knowledge points:
         - Pipeline 任务依赖图如何配置？
         - 本地缓存和远程缓存的区别？
         - 如何配置 Turborepo 远程缓存？
       - ## 最佳实践 section with H4 knowledge points:
         - 如何避免幽灵依赖问题？
         - pnpm + Turborepo 的组合优势
       - ## 资源 section with links to official docs
  </action>
  <verify>
    ls -la content/6.maps/_workflow/monorepo/
    grep "original_path" content/6.maps/_workflow/monorepo/monorepo.md
    head -30 content/6.maps/_workflow/monorepo/turborepo.md
  </verify>
  <done>
    monorepo/ directory exists with monorepo.md (with original_path) and turborepo.md (new)
  </done>
</task>

<task type="auto">
  <name>Task 2: Create compiler/ subdirectory and migrate compiler.md</name>
  <files>
    content/6.maps/_workflow/compiler/compiler.md
  </files>
  <action>
    1. Create content/6.maps/_workflow/compiler/ directory
    2. Copy root compiler.md to compiler/compiler.md
    3. Add original_path: "/_workflow/compiler.md" to frontmatter
    4. Keep existing ## Babel section with H4 knowledge point
    5. Add ## 现代编译工具 section with H4 knowledge points:
       - SWC 相比 Babel 的性能优势
       - esbuild 的 Go 实现带来的构建速度提升
       - 什么时候还需要 Babel？
    6. Keep existing ## 资源 section
  </action>
  <verify>
    ls -la content/6.maps/_workflow/compiler/
    grep "original_path" content/6.maps/_workflow/compiler/compiler.md
  </verify>
  <done>
    compiler/ directory exists with compiler.md containing original_path and expanded content
  </done>
</task>

<task type="auto">
  <name>Task 3: Create workflow.md domain entry and _dir.yml</name>
  <files>
    content/6.maps/_workflow/workflow.md
    content/6.maps/_workflow/_dir.yml
  </files>
  <action>
    1. Create workflow.md domain entry file:
       - Frontmatter: title="前端工程化", description="前端工程化工作流的核心工具链，包括包管理器、构建工具、代码规范、Monorepo 管理等"
       - ## 子领域导航 section with 6 subdomains:
         ### 工程化理论
         - [前端工程化](/maps/_workflow/engineering/fe-engineering) - 软件工程与前端工程化实践

         ### 包管理
         - [包管理器](/maps/_workflow/package-manager/package-manager) - npm、pnpm 等工具

         ### 构建工具
         - [构建工具](/maps/_workflow/build-tools/build-tools) - Vite、Webpack、Rspack

         ### 代码规范
         - [代码规范](/maps/_workflow/linter/linter) - ESLint、代码风格

         ### Monorepo
         - [Monorepo](/maps/_workflow/monorepo/monorepo) - 多包仓库管理

         ### 编译器
         - [编译器](/maps/_workflow/compiler/compiler) - Babel、SWC、esbuild
       - ## 2026 年标准工具栈 section with H4 knowledge points:
         - 为什么 2026 年推荐 pnpm？
         - Vite vs Rspack：如何选择？
         - ESLint 9.x Flat Config 迁移指南
         - Turborepo 远程缓存配置
    2. Create _dir.yml:
       ```yaml
       title: 前端工程化
       description: 前端工程化工作流的核心工具链
       icon: i-ph-gear
       ```
  </action>
  <verify>
    head -50 content/6.maps/_workflow/workflow.md
    cat content/6.maps/_workflow/_dir.yml
  </verify>
  <done>
    workflow.md domain entry exists with 6-subdomain navigation and knowledge points
    _dir.yml exists with directory configuration
  </done>
</task>

</tasks>

<verification>
- [ ] monorepo/monorepo.md exists with original_path and navigation to turborepo.md
- [ ] monorepo/turborepo.md exists with proper content
- [ ] compiler/compiler.md exists with original_path and expanded content
- [ ] workflow.md exists with 6-subdomain navigation
- [ ] _dir.yml exists with directory configuration
- [ ] Root fe-engineering.md removed (already migrated in P01)
- [ ] Root monorepo.md removed (migrated in this plan)
- [ ] Root compiler.md removed (migrated in this plan)
</verification>

<success_criteria>
1. monorepo/ subdomain complete with entry file and turborepo.md
2. compiler/ subdomain complete with entry file
3. workflow.md domain entry provides clear 6-subdomain navigation
4. _dir.yml provides Nuxt Content directory configuration
5. All root files cleaned up after migration
6. All files follow the 4-layer hierarchy pattern
</success_criteria>

<output>
After completion, create `.planning/phases/14-complex-workflow/14-P03-SUMMARY.md`
</output>
