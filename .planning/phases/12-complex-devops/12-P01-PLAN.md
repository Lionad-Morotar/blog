---
phase: 12-complex-devops
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_devops/devops.md
  - content/6.maps/_devops/version-control/version-control.md
  - content/6.maps/_devops/version-control/dorothy.md
  - content/6.maps/_devops/version-control/gitflow.md
  - content/6.maps/_devops/version-control/pre-commit-hook.md
  - content/6.maps/_devops/git.md
  - content/6.maps/_devops/version-control.md
autonomous: true
must_haves:
  truths:
    - _devops domain entry file exists with proper frontmatter and subdomain navigation
    - version-control/ subdirectory created with merged content from git.md + version-control.md
    - version-control.md serves as subdomain entry with links to all 4 topics
    - git/ files (dorothy.md, gitflow.md, pre-commit-hook.md) moved to version-control/
    - original_path preserved in all moved file frontmatter
    - Old git.md, version-control.md, and git/ directory removed after migration
  artifacts:
    - path: content/6.maps/_devops/devops.md
      provides: Domain entry with subdomain navigation for all 4 subdomains
    - path: content/6.maps/_devops/version-control/version-control.md
      provides: Merged subdomain entry combining git.md and version-control.md content with original_path
    - path: content/6.maps/_devops/version-control/dorothy.md
      provides: Dorothy commit convention content with original_path
    - path: content/6.maps/_devops/version-control/gitflow.md
      provides: Gitflow workflow content with original_path
    - path: content/6.maps/_devops/version-control/pre-commit-hook.md
      provides: Pre-commit hooks content with original_path
  key_links:
    - from: content/6.maps/_devops/devops.md
      to: content/6.maps/_devops/version-control/version-control.md
      via: subdomain navigation link
    - from: content/6.maps/_devops/version-control/version-control.md
      to: content/6.maps/_devops/version-control/dorothy.md
      via: internal topic link
    - from: content/6.maps/_devops/version-control/version-control.md
      to: content/6.maps/_devops/version-control/gitflow.md
      via: internal topic link
    - from: content/6.maps/_devops/version-control/version-control.md
      to: content/6.maps/_devops/version-control/pre-commit-hook.md
      via: internal topic link
---

# Phase 12-P01: Create Domain Entry and version-control/ Subdomain (COMP-01)

<objective>
Create the _devops domain entry file and reorganize the version-control related content by merging git.md and version-control.md into a single subdomain entry, then move git/ subdirectory files to version-control/.

Purpose: Establish the 4-layer hierarchy foundation for the _devops domain. The version-control/ subdomain is the largest change, requiring content consolidation from two files plus migration of three files from git/.
Output: Domain entry file and reorganized version-control/ subdomain with merged content and preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_devops/devops.md
@content/6.maps/_devops/git.md
@content/6.maps/_devops/version-control.md
@content/6.maps/_devops/git/dorothy.md
@content/6.maps/_devops/git/gitflow.md
@content/6.maps/_devops/git/pre-commit-hook.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _devops domain entry file</name>
  <files>content/6.maps/_devops/devops.md</files>
  <action>
Create content/6.maps/_devops/devops.md as the domain entry file with:
1. YAML frontmatter:
   - title: DevOps
   - description: DevOps 是一种开发理论，它致力于将大量自动化操作整合进开发到交付过程中，以消除各个团队之间的隔阂，使需求尽快交付，并得到质量反馈。
2. ## 子领域 section with links to all 4 subdomains:
   * [版本控制](/maps/_devops/version-control/version-control) - Git、版本管理与工作流
   * [CI/CD](/maps/_devops/cicd/cicd) - 持续集成与持续部署
   * [容器](/maps/_devops/container/docker) - Docker 容器技术
   * [日志](/maps/_devops/logging/rotatelogs) - 日志轮转与管理
3. ## 概述 section with brief domain overview about DevOps practices
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation covering all 4 subdomains</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create version-control subdirectory and merge git.md + version-control.md</name>
  <files>content/6.maps/_devops/version-control/version-control.md</files>
  <action>
1. Create directory content/6.maps/_devops/version-control/
2. Create content/6.maps/_devops/version-control/version-control.md as the merged subdomain entry with:

   YAML frontmatter:
   - title: 版本控制
   - description: 版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统，包括 Git、版本号管理、工作流等
   - original_path: content/6.maps/_devops/git.md (primary source), content/6.maps/_devops/version-control.md (merged)

   Content structure:
   - ## 主题 section with links to 4 topics:
     * [Dorothy](./dorothy) - Git Commit Message 约定
     * [Gitflow](./gitflow) - Git 分支工作流程
     * [Pre-commit Hook](./pre-commit-hook) - 预提交钩子与代码检查
     * [语义化版本](./semantic-versioning) - 版本号管理与 Semver (inline H4 knowledge points)

   - ## 简介 section (from git.md):
     * H4: Git 的优势？
     * H4: 使用 Git 时数据流是怎样的？

   - ## 配置相关 section (from git.md):
     * H4: 如何解决下载超时问题？
     * H4: 如何配置用户名和邮箱？
     * H4: 如何把 VIM 编辑器换掉？
     * H4: 怎么配置代理？

   - ## 分支操作 section (from git.md):
     * H4: 如何添加远端仓库？
     * H4: 如何拷贝仓库代码？
     * H4: 怎么初始化项目的子模块？
     * H4: 怎么快速创建新分支？
     * H4: 如何查看所有分支？
     * H4: 如何拣选提交？
     * H4: 如何关联远程分支？
     * H4: 如何切换至 zdiff3？

   - ## 工程化实践 section (from git.md):
     * H4: 提交规范有什么用？
     * H4: 一个简单的提交规范示例？

   - ## Quick Questions section (from git.md):
     * H4: 草稿功能应该怎么使用？
     * H4: 如何快速拷贝仓库代码？
     * H4: 怎么在命令行提交多行消息？
     * H4: 怎么快速修正上一次提交？
     * H4: reset --hard 有几种模式？
     * H4: 如何拯救因删除或还原造成丢失的信息？
     * H4: 如何清理最近几次提交？
     * H4: 怎么对比文件历史？
     * H4: 如何合并两个不相关分支？
     * H4: 如何忽略冲突快速合并？
     * H4: 如何忽略特定提交？

   - ## Git Worktree section (from git.md):
     * H4: 什么是 Git Worktree？
     * H4: Worktree 的核心用法
     * H4: 为什么需要 Worktree？
     * H4: 和 stash 的区别
     * H4: 注意事项
     * H4: Git 平台生态的碎片化陷阱

   - ## Common Issues section (from git.md):
     * H4: Git 为什么不会被文件重命名愚弄？
     * H4: 怎么记住 HTTPs 账号密码？
     * H4: SSH 链接超时问题怎么解决？
     * H4: Reference Broken 问题？

   - ## 语义化版本 section (from version-control.md, inline):
     * H4: 语义化版本是什么？
     * H4: 语义化版本解决了什么问题？
     * H4: 如何解决版本号膨胀问题？

3. Preserve all H4 knowledge points as atomic units (do not split to separate files)
4. Delete original content/6.maps/_devops/git.md after successful creation
5. Delete original content/6.maps/_devops/version-control.md after successful creation
  </action>
  <verify>
- Directory created
- Merged file created with all content from both source files
- ## 主题 section has links to 4 topics
- All H4 knowledge points preserved as inline content
- original_path in frontmatter
- Original files removed
  </verify>
  <done>Version-control subdomain created with merged content from git.md and version-control.md</done>
</task>

<task type="auto">
  <name>Move git/ files to version-control/</name>
  <files>content/6.maps/_devops/version-control/dorothy.md, content/6.maps/_devops/version-control/gitflow.md, content/6.maps/_devops/version-control/pre-commit-hook.md</files>
  <action>
1. Move content/6.maps/_devops/git/dorothy.md to content/6.maps/_devops/version-control/dorothy.md
2. Update frontmatter to add:
   - original_path: content/6.maps/_devops/git/dorothy.md
3. Preserve all original content including:
   - Commit message format and types
   - BREAKING change markers

4. Move content/6.maps/_devops/git/gitflow.md to content/6.maps/_devops/version-control/gitflow.md
5. Update frontmatter to add:
   - original_path: content/6.maps/_devops/git/gitflow.md
6. Preserve all original content including:
   - Workflow comparisons (Centralized, Feature Branch, Forking, Gitflow)
   - PR explanations
   - Thoughtworks evaluation

7. Move content/6.maps/_devops/git/pre-commit-hook.md to content/6.maps/_devops/version-control/pre-commit-hook.md
8. Update frontmatter to add:
   - original_path: content/6.maps/_devops/git/pre-commit-hook.md
9. Preserve all original content including:
   - Pre-commit importance in AI era
   - Three-layer defense model
   - pre-commit framework examples

10. Remove empty content/6.maps/_devops/git/ directory after all files moved
  </action>
  <verify>
- dorothy.md moved with original_path
- gitflow.md moved with original_path
- pre-commit-hook.md moved with original_path
- Original git/ directory removed
  </verify>
  <done>Git/ files migrated to version-control/ with metadata preserved</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_devops/devops.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all 4 subdomains
- [ ] content/6.maps/_devops/version-control/ directory exists
- [ ] content/6.maps/_devops/version-control/version-control.md exists (merged from git.md + version-control.md)
- [ ] version-control.md has ## 主题 section with links to 4 topics
- [ ] version-control.md has original_path in frontmatter
- [ ] All H4 knowledge points preserved in merged file
- [ ] content/6.maps/_devops/version-control/dorothy.md exists with original_path
- [ ] content/6.maps/_devops/version-control/gitflow.md exists with original_path
- [ ] content/6.maps/_devops/version-control/pre-commit-hook.md exists with original_path
- [ ] Original git.md removed
- [ ] Original version-control.md removed
- [ ] Original git/ directory removed
</verification>

<success_criteria>
- _devops domain entry exists with navigation to all 4 subdomains
- version-control/ subdomain created with merged entry file
- git.md and version-control.md content consolidated into version-control.md
- git/ files (dorothy.md, gitflow.md, pre-commit-hook.md) moved to version-control/
- All moved files have original_path metadata
- Empty directories removed
</success_criteria>

<output>
After completion, create `.planning/phases/12-complex-devops/12-P01-SUMMARY.md`
</output>
