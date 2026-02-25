---
phase: 05-simple-batch-4
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_photography/photography.md
  - content/6.maps/_photography/techniques/techniques.md
autonomous: true
must_haves:
  truths:
    - _photography domain entry file exists with proper frontmatter and subdomain navigation
    - Original 0.index.md content moved to _photography/techniques/techniques.md
    - original_path preserved in moved file frontmatter
  artifacts:
    - path: content/6.maps/_photography/photography.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_photography/techniques/techniques.md
      provides: Original content with original_path frontmatter
  key_links:
    - from: content/6.maps/_photography/photography.md
      to: content/6.maps/_photography/techniques/techniques.md
      via: subdomain navigation link
---

# Phase 5-02: Migrate _photography Domain

<objective>
Migrate the _photography domain to the 4-layer structure by creating a domain entry file and moving original 0.index.md content to a techniques subdomain directory.

Purpose: Establish consistent domain structure for photography knowledge.
Output: Domain entry file and relocated original content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_photography/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _photography domain entry file</name>
  <files>content/6.maps/_photography/photography.md</files>
  <action>
Create content/6.maps/_photography/photography.md as the domain entry file with:
1. YAML frontmatter:
   - title: 摄影
   - description: 技术传达情感，摄影记录生活
2. ## 子领域 section with link to techniques subdomain:
   * [摄影技巧](/maps/_photography/techniques/techniques)
3. ## 概述 section with brief domain overview mentioning photography techniques and concepts
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create subdomain and migrate original content</name>
  <files>content/6.maps/_photography/techniques/techniques.md</files>
  <action>
1. Create directory content/6.maps/_photography/techniques/
2. Move original content/6.maps/_photography/0.index.md to content/6.maps/_photography/techniques/techniques.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_photography/0.index.md
4. Preserve all original content including:
   - 照片好坏衡量标准
   - 光圈和景深的关系
   - 光圈、快门、ISO Cheat Sheet images
   - 自动快门模式场景说明
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Original content migrated to techniques subdomain with preserved metadata</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_photography/photography.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to /maps/_photography/techniques/techniques
- [ ] content/6.maps/_photography/techniques/techniques.md exists with original content
- [ ] Moved file has original_path: content/6.maps/_photography/0.index.md in frontmatter
- [ ] All original content preserved (照片标准, 光圈景深, Cheat Sheet, 快门模式)
</verification>

<success_criteria>
- _photography domain follows 4-layer structure
- Domain entry provides clear navigation to techniques subdomain
- Original content accessible at new location with preserved history
</success_criteria>

<output>
After completion, create `.planning/phases/05-simple-batch-4/05-P02-SUMMARY.md`
</output>
