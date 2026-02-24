---
phase: 06-medium-batch-1
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_industry/industry.md
  - content/6.maps/_industry/digital.md
  - content/6.maps/_industry/low-code.md
  - content/6.maps/_industry/analytics.md
autonomous: true
must_haves:
  truths:
    - _industry domain entry file exists with proper frontmatter and topic navigation
    - All 3 topic files remain at domain root (flat structure)
    - original_path preserved in all topic file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_industry/industry.md
      provides: Domain entry with topic navigation
    - path: content/6.maps/_industry/digital.md
      provides: Digital transformation content with original_path
    - path: content/6.maps/_industry/low-code.md
      provides: Low-code platform content with original_path
    - path: content/6.maps/_industry/analytics.md
      provides: Industry analytics content with original_path
  key_links:
    - from: content/6.maps/_industry/industry.md
      to: content/6.maps/_industry/digital.md
      via: topic navigation link
    - from: content/6.maps/_industry/industry.md
      to: content/6.maps/_industry/low-code.md
      via: topic navigation link
    - from: content/6.maps/_industry/industry.md
      to: content/6.maps/_industry/analytics.md
      via: topic navigation link
    - from: content/6.maps/0.index.md
      to: new industry domain paths
      via: updated cross-domain links
---

# Phase 6-02: Migrate _industry Domain

<objective>
Migrate the _industry domain to the 4-layer structure by creating a domain entry file and keeping the 3 topic files at the domain root level (flat structure). The 3 topics (digital, low-code, analytics) are distinct with no clear grouping, so no subdomains are needed.

Purpose: Establish consistent domain structure for industry knowledge with flat topic organization.
Output: Domain entry file and topic files with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_industry/digital.md
@content/6.maps/_industry/low-code.md
@content/6.maps/_industry/analytics.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _industry domain entry file</name>
  <files>content/6.maps/_industry/industry.md</files>
  <action>
Create content/6.maps/_industry/industry.md as the domain entry file with:
1. YAML frontmatter:
   - title: 行业
   - description: 数字化转型、低代码平台及行业分析
2. ## 主题 section with links to topics:
   * [数字化](/maps/_industry/digital)
   * [低代码](/maps/_industry/low-code)
   * [行业报告](/maps/_industry/analytics)
3. ## 概述 section with brief domain overview mentioning digital transformation, low-code platforms, and industry analytics
  </action>
  <verify>File exists with proper frontmatter and topic navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Update topic files with original_path frontmatter</name>
  <files>
    content/6.maps/_industry/digital.md
    content/6.maps/_industry/low-code.md
    content/6.maps/_industry/analytics.md
  </files>
  <action>
For each of the 3 topic files, add to frontmatter:
- original_path: content/6.maps/_industry/{filename}.md

Files to update:
1. digital.md - add original_path: content/6.maps/_industry/digital.md
2. low-code.md - add original_path: content/6.maps/_industry/low-code.md
3. analytics.md - add original_path: content/6.maps/_industry/analytics.md

Preserve all original content in each file.
  </action>
  <verify>
- All 3 files have original_path in frontmatter
- All original content preserved
  </verify>
  <done>All topic files updated with original_path metadata</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Verify and update the links in 0.index.md under ## 行业 section:
- [数字化](/maps/_industry/digital) - should remain as-is (no path change)
- [低代码](/maps/_industry/low-code) - should remain as-is (no path change)
- [行业报告](/maps/_industry/analytics) - should remain as-is (no path change)

Note: Since we're keeping flat structure, paths don't change, but verify links are correct.
  </action>
  <verify>Links in 0.index.md are correct</verify>
  <done>Cross-domain links verified</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_industry/industry.md exists with proper frontmatter
- [ ] Domain entry has ## 主题 section linking to all 3 topics
- [ ] content/6.maps/_industry/digital.md has original_path in frontmatter
- [ ] content/6.maps/_industry/low-code.md has original_path in frontmatter
- [ ] content/6.maps/_industry/analytics.md has original_path in frontmatter
- [ ] All original content preserved in topic files
- [ ] 0.index.md links are correct
</verification>

<success_criteria>
- _industry domain follows 4-layer structure with flat topic organization
- Domain entry provides clear navigation to all 3 topics
- All topic files have preserved metadata with original_path
- Cross-domain links in 0.index.md are correct
</success_criteria>

<output>
After completion, create `.planning/phases/06-medium-batch-1/06-P02-SUMMARY.md`
</output>
