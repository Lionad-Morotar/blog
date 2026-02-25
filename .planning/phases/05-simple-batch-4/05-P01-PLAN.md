---
phase: 05-simple-batch-4
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_apps/apps.md
  - content/6.maps/_apps/networking/vpn.md
autonomous: true
must_haves:
  truths:
    - _apps domain entry file exists with proper frontmatter and subdomain navigation
    - Original vpn.md content moved to _apps/networking/vpn.md
    - original_path preserved in moved file frontmatter
  artifacts:
    - path: content/6.maps/_apps/apps.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_apps/networking/vpn.md
      provides: Original content with original_path frontmatter
  key_links:
    - from: content/6.maps/_apps/apps.md
      to: content/6.maps/_apps/networking/vpn.md
      via: subdomain navigation link
---

# Phase 5-01: Migrate _apps Domain

<objective>
Migrate the _apps domain to the 4-layer structure by creating a domain entry file and moving original vpn.md content to a networking subdomain directory.

Purpose: Establish consistent domain structure for application and networking tools knowledge.
Output: Domain entry file and relocated original content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_apps/vpn.md
</context>

<tasks>

<task type="auto">
  <name>Create _apps domain entry file</name>
  <files>content/6.maps/_apps/apps.md</files>
  <action>
Create content/6.maps/_apps/apps.md as the domain entry file with:
1. YAML frontmatter:
   - title: 应用
   - description: 应用软件、网络工具及实用程序
2. ## 子领域 section with link to networking subdomain:
   * [网络工具](/maps/_apps/networking/vpn)
3. ## 概述 section with brief domain overview mentioning VPN and networking tools
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create subdomain and migrate original content</name>
  <files>content/6.maps/_apps/networking/vpn.md</files>
  <action>
1. Create directory content/6.maps/_apps/networking/
2. Move original content/6.maps/_apps/vpn.md to content/6.maps/_apps/networking/vpn.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_apps/vpn.md
4. Preserve all original content including:
   - VPN introduction and use cases
   - Pac/UserRule syntax table
   - 开放平台 links (Glados, PaofuCloud)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Original content migrated to networking subdomain with preserved metadata</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_apps/apps.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to /maps/_apps/networking/vpn
- [ ] content/6.maps/_apps/networking/vpn.md exists with original content
- [ ] Moved file has original_path: content/6.maps/_apps/vpn.md in frontmatter
- [ ] All original content preserved (VPN介绍, Pac规则, 开放平台)
</verification>

<success_criteria>
- _apps domain follows 4-layer structure
- Domain entry provides clear navigation to networking subdomain
- Original content accessible at new location with preserved history
</success_criteria>

<output>
After completion, create `.planning/phases/05-simple-batch-4/05-P01-SUMMARY.md`
</output>
