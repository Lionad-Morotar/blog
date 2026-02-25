---
phase: 12-complex-devops
plan: 02
type: execute
wave: 2
depends_on: ['12-P01']
files_modified:
  - content/6.maps/_devops/cicd/cicd.md
  - content/6.maps/_devops/cicd/gitlab.md
  - content/6.maps/_devops/cicd/continuous-compliance.md
  - content/6.maps/_devops/cicd/deploy.md
  - content/6.maps/_devops/container/docker.md
  - content/6.maps/_devops/logging/rotatelogs.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - cicd/ subdirectory created with 4 files (cicd.md, gitlab.md, continuous-compliance.md, deploy.md)
    - container/ subdirectory created with docker.md
    - logging/ subdirectory created with rotatelogs.md
    - All moved files have original_path in frontmatter
    - Old root files removed after migration
    - Cross-domain links in 0.index.md updated to new _devops paths
  artifacts:
    - path: content/6.maps/_devops/cicd/cicd.md
      provides: CI/CD subdomain entry with original_path
    - path: content/6.maps/_devops/cicd/gitlab.md
      provides: GitLab CI/CD content with original_path
    - path: content/6.maps/_devops/cicd/continuous-compliance.md
      provides: Continuous compliance content with original_path
    - path: content/6.maps/_devops/cicd/deploy.md
      provides: Deployment content with original_path
    - path: content/6.maps/_devops/container/docker.md
      provides: Docker container content with original_path
    - path: content/6.maps/_devops/logging/rotatelogs.md
      provides: Log rotation content with original_path
    - path: content/6.maps/0.index.md
      provides: Updated cross-domain links pointing to new _devops paths
  key_links:
    - from: content/6.maps/_devops/cicd/cicd.md
      to: content/6.maps/_devops/cicd/gitlab.md
      via: internal topic link
    - from: content/6.maps/_devops/cicd/cicd.md
      to: content/6.maps/_devops/cicd/continuous-compliance.md
      via: internal topic link
    - from: content/6.maps/_devops/cicd/cicd.md
      to: content/6.maps/_devops/cicd/deploy.md
      via: internal topic link
    - from: content/6.maps/0.index.md
      to: content/6.maps/_devops/version-control/version-control.md
      via: updated cross-domain link
    - from: content/6.maps/0.index.md
      to: content/6.maps/_devops/cicd/cicd.md
      via: updated cross-domain link
---

# Phase 12-P02: Create Remaining Subdomains and Update Cross-Domain Links (COMP-01)

<objective>
Create the remaining 3 subdomains (cicd/, container/, logging/) by migrating files from the _devops root, and update cross-domain links in 0.index.md to reflect new paths.

Purpose: Complete the 4-layer hierarchy for the _devops domain by organizing remaining root files into proper subdomains and ensuring external references are updated.
Output: All 4 subdomains properly structured with migrated files and updated cross-domain navigation.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_devops/cicd.md
@content/6.maps/_devops/gitlab.md
@content/6.maps/_devops/continuous-compliance.md
@content/6.maps/_devops/deploy.md
@content/6.maps/_devops/docker.md
@content/6.maps/_devops/rotatelogs.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create cicd/ subdomain and migrate files</name>
  <files>content/6.maps/_devops/cicd/cicd.md, content/6.maps/_devops/cicd/gitlab.md, content/6.maps/_devops/cicd/continuous-compliance.md, content/6.maps/_devops/cicd/deploy.md</files>
  <action>
1. Create directory content/6.maps/_devops/cicd/

2. Move content/6.maps/_devops/cicd.md to content/6.maps/_devops/cicd/cicd.md
3. Update frontmatter to add:
   - original_path: content/6.maps/_devops/cicd.md
4. Update content to serve as subdomain entry:
   - Keep existing frontmatter (title: CI/CD, description)
   - Add ## 主题 section with links:
     * [GitLab CI/CD](./gitlab) - GitLab 流水线配置与实践
     * [持续合规](./continuous-compliance) - 自动化合规检查与策略即代码
     * [部署](./deploy) - 前端部署实践与策略
   - Preserve all existing content (Brief section, DORA metrics, CD vs CD discussion)

5. Move content/6.maps/_devops/gitlab.md to content/6.maps/_devops/cicd/gitlab.md
6. Update frontmatter to add:
   - original_path: content/6.maps/_devops/gitlab.md
7. Preserve all original content including:
   - Pipeline configuration (预定义变量、代码复用、并行工作、错误排查)
   - Complete .gitlab-ci.yml example

8. Move content/6.maps/_devops/continuous-compliance.md to content/6.maps/_devops/cicd/continuous-compliance.md
9. Update frontmatter to add:
   - original_path: content/6.maps/_devops/continuous-compliance.md
10. Preserve all original content including:
    - Guide sections (什么是持续合规、为什么升级、关键技术与实践、Adopt含义、AI时代重要性)
    - Policy as Code, SBOM, SLSA, OSCAL concepts

11. Move content/6.maps/_devops/deploy.md to content/6.maps/_devops/cicd/deploy.md
12. Update frontmatter to add:
    - original_path: content/6.maps/_devops/deploy.md
13. Preserve all original content including:
    - Link to 2021 frontend deployment article

14. Delete original root files after successful migration
  </action>
  <verify>
- cicd/ directory created
- cicd.md moved with original_path and updated ## 主题 section
- gitlab.md moved with original_path
- continuous-compliance.md moved with original_path
- deploy.md moved with original_path
- Original root files removed
  </verify>
  <done>CI/CD subdomain created with 4 files migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create container/ subdomain with docker.md</name>
  <files>content/6.maps/_devops/container/docker.md</files>
  <action>
1. Create directory content/6.maps/_devops/container/

2. Move content/6.maps/_devops/docker.md to content/6.maps/_devops/container/docker.md
3. Update frontmatter to add:
   - original_path: content/6.maps/_devops/docker.md
4. Preserve all original content including:
   - 简介 section (Docker是什么、容器是什么)
   - 原理 section (命名空间、控制组)
   - 概念 section (隔离环境、生命周期、数据卷、网络)
   - 架构 section (Dockerd、Containerd、RunC)
   - 常见指令 section
   - 构建与发布 section (多平台构建)
   - 调试流程 section
   - 常见问题 section

5. Delete original content/6.maps/_devops/docker.md after successful move
  </action>
  <verify>
- container/ directory created
- docker.md moved with original_path
- All content preserved
- Original file removed
  </verify>
  <done>Container subdomain created with docker.md migrated</done>
</task>

<task type="auto">
  <name>Create logging/ subdomain with rotatelogs.md</name>
  <files>content/6.maps/_devops/logging/rotatelogs.md</files>
  <action>
1. Create directory content/6.maps/_devops/logging/

2. Move content/6.maps/_devops/rotatelogs.md to content/6.maps/_devops/logging/rotatelogs.md
3. Update frontmatter to add:
   - original_path: content/6.maps/_devops/rotatelogs.md
4. Preserve all original content including:
   - 简介 section (rotatelogs是什么、管道机制)
   - 原理 section (数据流向、轮转触发)
   - 消息边界问题 section
   - 解决方案 section
   - 与 logrotate 对比 table
   - 配置示例 section

5. Delete original content/6.maps/_devops/rotatelogs.md after successful move
  </action>
  <verify>
- logging/ directory created
- rotatelogs.md moved with original_path
- All content preserved
- Original file removed
  </verify>
  <done>Logging subdomain created with rotatelogs.md migrated</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## 项目 section in 0.index.md to point to new _devops subdomain paths:

Replace existing:
- [DevOps](/maps/_devops/devops)
- [版本管理](/maps/_devops/version-control)

With updated links:
* [DevOps](/maps/_devops/devops) - DevOps 实践与理论
* [版本控制](/maps/_devops/version-control/version-control) - Git、版本管理与工作流
* [CI/CD](/maps/_devops/cicd/cicd) - 持续集成与持续部署
* [容器](/maps/_devops/container/docker) - Docker 容器技术
* [日志](/maps/_devops/logging/rotatelogs) - 日志轮转与管理

Keep the link text descriptive and consistent with other sections.
  </action>
  <verify>All 5 links in ## 项目 section updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_devops/cicd/ directory exists
- [ ] content/6.maps/_devops/cicd/cicd.md exists with original_path and ## 主题 section
- [ ] content/6.maps/_devops/cicd/gitlab.md exists with original_path
- [ ] content/6.maps/_devops/cicd/continuous-compliance.md exists with original_path
- [ ] content/6.maps/_devops/cicd/deploy.md exists with original_path
- [ ] Original cicd.md, gitlab.md, continuous-compliance.md, deploy.md removed from root
- [ ] content/6.maps/_devops/container/ directory exists
- [ ] content/6.maps/_devops/container/docker.md exists with original_path
- [ ] Original docker.md removed from root
- [ ] content/6.maps/_devops/logging/ directory exists
- [ ] content/6.maps/_devops/logging/rotatelogs.md exists with original_path
- [ ] Original rotatelogs.md removed from root
- [ ] content/6.maps/0.index.md has updated links in ## 项目 section
</verification>

<success_criteria>
- cicd/ subdomain created with 4 files (cicd.md, gitlab.md, continuous-compliance.md, deploy.md)
- container/ subdomain created with docker.md
- logging/ subdomain created with rotatelogs.md
- All moved files have original_path metadata
- Original root files removed
- Cross-domain links in 0.index.md updated to new paths
- No broken links between subdomains
</success_criteria>

<output>
After completion, create `.planning/phases/12-complex-devops/12-P02-SUMMARY.md`
</output>
