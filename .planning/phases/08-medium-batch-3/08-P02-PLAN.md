---
phase: 08-medium-batch-3
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_management/management.md
  - content/6.maps/_management/organization/organization.md
  - content/6.maps/_management/shape-up/shape-up.md
  - content/6.maps/_management/slice/slice.md
  - content/6.maps/_management/capacity-driven-development/capacity-driven-development.md
  - content/6.maps/_management/shadow-it/shadow-it.md
  - content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
  - content/6.maps/_management/slice/standalone-data-engineering-team.md
autonomous: true
must_haves:
  truths:
    - _management domain entry file exists with proper frontmatter and subdomain navigation
    - organization.md moved to organization/ subdirectory as subdomain entry
    - shape-up.md moved to shape-up/ subdirectory as subdomain entry
    - slice/ directory formalized with slice.md entry and nested content
    - capacity-driven-development.md moved to capacity-driven-development/ subdirectory
    - shadow-it/ directory formalized with shadow-it.md entry and nested content
    - original_path preserved in all moved file frontmatter
    - Internal links in organization.md updated to new subdomain paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_management/management.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_management/organization/organization.md
      provides: Organization management content as subdomain entry with original_path
    - path: content/6.maps/_management/shape-up/shape-up.md
      provides: Shape Up methodology content as subdomain entry with original_path
    - path: content/6.maps/_management/slice/slice.md
      provides: Team slice/organization patterns subdomain entry
    - path: content/6.maps/_management/capacity-driven-development/capacity-driven-development.md
      provides: Capacity-driven development content as subdomain entry with original_path
    - path: content/6.maps/_management/shadow-it/shadow-it.md
      provides: Shadow IT subdomain entry with navigation to nested content
    - path: content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
      provides: AI-accelerated Shadow IT nested content
    - path: content/6.maps/_management/slice/standalone-data-engineering-team.md
      provides: Standalone data engineering team nested content
  key_links:
    - from: content/6.maps/_management/management.md
      to: content/6.maps/_management/organization/organization.md
      via: subdomain navigation link
    - from: content/6.maps/_management/management.md
      to: content/6.maps/_management/shape-up/shape-up.md
      via: subdomain navigation link
    - from: content/6.maps/_management/management.md
      to: content/6.maps/_management/slice/slice.md
      via: subdomain navigation link
    - from: content/6.maps/_management/management.md
      to: content/6.maps/_management/capacity-driven-development/capacity-driven-development.md
      via: subdomain navigation link
    - from: content/6.maps/_management/management.md
      to: content/6.maps/_management/shadow-it/shadow-it.md
      via: subdomain navigation link
    - from: content/6.maps/_management/organization/organization.md
      to: content/6.maps/_management/shape-up/shape-up.md
      via: internal domain link
    - from: content/6.maps/_management/organization/organization.md
      to: content/6.maps/_management/slice/standalone-data-engineering-team.md
      via: internal domain link
    - from: content/6.maps/_management/organization/organization.md
      to: content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
      via: internal domain link
    - from: content/6.maps/_management/organization/organization.md
      to: content/6.maps/_management/capacity-driven-development/capacity-driven-development.md
      via: internal domain link
    - from: content/6.maps/0.index.md
      to: new _management domain paths
      via: updated cross-domain links
---

# Phase 8-02: Migrate _management Domain (MED-10)

<objective>
Migrate the _management domain to the 4-layer structure by creating a domain entry file and organizing five management-related content areas into dedicated subdomains: organization/, shape-up/, slice/, capacity-driven-development/, and shadow-it/.

Purpose: Establish consistent domain structure for management and organizational knowledge with clear subdomain separation for team organization, development methodologies, organizational patterns, capacity management, and shadow IT governance.
Output: Domain entry file and reorganized content with preserved metadata and updated internal links.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_management/organization.md
@content/6.maps/_management/shape-up.md
@content/6.maps/_management/slice/standalone-data-engineering-team.md
@content/6.maps/_management/capacity-driven-development.md
@content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _management domain entry file</name>
  <files>content/6.maps/_management/management.md</files>
  <action>
Create content/6.maps/_management/management.md as the domain entry file with:
1. YAML frontmatter:
   - title: 管理
   - description: 团队管理、组织架构、开发方法和工程文化
2. ## 子领域 section with links to subdomains:
   * [组织](/maps/_management/organization/organization) - 团队组织架构与管理方法
   * [Shape Up](/maps/_management/shape-up/shape-up) - 适合中小团队的工作方式
   * [团队切片](/maps/_management/slice/slice) - 独立数据工程团队等组织模式
   * [产能驱动开发](/maps/_management/capacity-driven-development/capacity-driven-development) - 产能管理与价值流优化
   * [影子 IT](/maps/_management/shadow-it/shadow-it) - AI 加速的影子 IT 与治理
3. ## 概述 section with brief domain overview mentioning:
   - Team organization and management methodologies
   - Development workflows like Shape Up
   - Organizational patterns and anti-patterns
   - Capacity management and value stream optimization
   - Shadow IT governance in the AI era
4. No existing content to preserve (creating new domain entry)
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create organization subdomain and migrate content</name>
  <files>content/6.maps/_management/organization/organization.md</files>
  <action>
1. Create directory content/6.maps/_management/organization/
2. Move original content/6.maps/_management/organization.md to content/6.maps/_management/organization/organization.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_management/organization.md
4. Update internal links in the moved file:
   - Change `/maps/_management/shape-up` to `/maps/_management/shape-up/shape-up`
   - Change `/maps/_management/slice/standalone-data-engineering-team` to `/maps/_management/slice/slice` (or keep nested path if preferred)
   - Change `/maps/_management/shadow-it/ai-accelerated-shadow-it` to `/maps/_management/shadow-it/shadow-it` (or keep nested path)
   - Change `/maps/_management/capacity-driven-development` to `/maps/_management/capacity-driven-development/capacity-driven-development`
5. Preserve all original content including:
   - 组织方法 section
   - 目标管理 section (OKR)
   - 组织切面 section
   - 团队规模 section (两个披萨原则)
   - Agent Teams 与组织架构 section
   - Domain section with all links
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Internal links updated to new paths
  </verify>
  <done>Organization subdomain created with file migrated and links updated</done>
</task>

<task type="auto">
  <name>Create shape-up subdomain and migrate content</name>
  <files>content/6.maps/_management/shape-up/shape-up.md</files>
  <action>
1. Create directory content/6.maps/_management/shape-up/
2. Move original content/6.maps/_management/shape-up.md to content/6.maps/_management/shape-up/shape-up.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_management/shape-up.md
4. Preserve all original content including:
   - Shape Up 文章引用
   - Ship It 和 Shape Up 概念解释
   - 六周迭代周期说明
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Shape-up subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create slice subdomain and formalize structure</name>
  <files>content/6.maps/_management/slice/slice.md</files>
  <action>
1. Verify directory content/6.maps/_management/slice/ exists
2. Create content/6.maps/_management/slice/slice.md as subdomain entry file with:
   - YAML frontmatter:
     - title: 团队切片
     - description: 团队组织切分模式与反模式
   - ## 子主题 section with link to nested content:
     * [独立数据工程团队](/maps/_management/slice/standalone-data-engineering-team)
   - ## 概述 section briefly describing:
     - Team slicing patterns and organizational anti-patterns
     - Standalone data engineering teams as an anti-pattern
3. Preserve the existing file: content/6.maps/_management/slice/standalone-data-engineering-team.md
   - Add original_path to frontmatter: content/6.maps/_management/slice/standalone-data-engineering-team.md
  </action>
  <verify>
- Directory exists
- slice.md entry file created with proper frontmatter
- standalone-data-engineering-team.md preserved with original_path
  </verify>
  <done>Slice subdomain formalized with entry file and nested content preserved</done>
</task>

<task type="auto">
  <name>Create capacity-driven-development subdomain and migrate content</name>
  <files>content/6.maps/_management/capacity-driven-development/capacity-driven-development.md</files>
  <action>
1. Create directory content/6.maps/_management/capacity-driven-development/
2. Move original content/6.maps/_management/capacity-driven-development.md to content/6.maps/_management/capacity-driven-development/capacity-driven-development.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_management/capacity-driven-development.md
4. Preserve all original content including:
   - Brief section with核心观点
   - Details section with all subsections:
     - 背景与现状
     - 问题与风险
     - 模式与原理
     - 对比与演进
     - 系统影响
     - 落地建议
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Capacity-driven-development subdomain created with file migrated</done>
</task>

<task type="auto">
  <name>Create shadow-it subdomain and formalize structure</name>
  <files>content/6.maps/_management/shadow-it/shadow-it.md</files>
  <action>
1. Verify directory content/6.maps/_management/shadow-it/ exists
2. Create content/6.maps/_management/shadow-it/shadow-it.md as subdomain entry file with:
   - YAML frontmatter:
     - title: 影子 IT
     - description: 影子 IT 现象、风险与治理策略
   - ## 子主题 section with link to nested content:
     * [AI 加速的影子 IT](/maps/_management/shadow-it/ai-accelerated-shadow-it)
   - ## 概述 section briefly describing:
     - Shadow IT phenomenon and its risks
     - AI-accelerated shadow IT as an emerging concern
     - Governance strategies for managing shadow IT
3. Preserve the existing file: content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
   - Add original_path to frontmatter: content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
  </action>
  <verify>
- Directory exists
- shadow-it.md entry file created with proper frontmatter
- ai-accelerated-shadow-it.md preserved with original_path
  </verify>
  <done>Shadow-it subdomain formalized with entry file and nested content preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the link in 0.index.md under ## 管理 section:
- Change `[组织](/maps/_management/organization)` to `[组织](/maps/_management/organization/organization)`

Verify no other direct links to shape-up, slice, capacity-driven-development, or shadow-it exist in 0.index.md.
  </action>
  <verify>Links in 0.index.md point to new paths</verify>
  <done>Cross-domain links updated to reflect new structure</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_management/management.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all five subdomains
- [ ] content/6.maps/_management/organization/organization.md exists with original content
- [ ] content/6.maps/_management/shape-up/shape-up.md exists with original content
- [ ] content/6.maps/_management/slice/slice.md exists as subdomain entry
- [ ] content/6.maps/_management/capacity-driven-development/capacity-driven-development.md exists
- [ ] content/6.maps/_management/shadow-it/shadow-it.md exists as subdomain entry
- [ ] All moved files have original_path in frontmatter
- [ ] Internal links in organization.md updated to new paths
- [ ] 0.index.md links updated to new paths
- [ ] All original content preserved
</verification>

<success_criteria>
- _management domain follows 4-layer structure with 5 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Internal cross-links updated to reflect new structure
- Nested content (ai-accelerated-shadow-it, standalone-data-engineering-team) accessible via subdomain entries
</success_criteria>

<output>
After completion, create `.planning/phases/08-medium-batch-3/08-P02-SUMMARY.md`
</output>
