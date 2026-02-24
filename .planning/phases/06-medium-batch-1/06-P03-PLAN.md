---
phase: 06-medium-batch-1
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_policy/policy.md
  - content/6.maps/_policy/five-years-plan-14.md
autonomous: true
must_haves:
  truths:
    - _policy domain entry file exists with proper frontmatter and topic navigation
    - five-years-plan-14.md remains at domain root (flat structure)
    - original_path preserved in five-years-plan-14.md frontmatter
    - Cross-domain links in 0.index.md verified
  artifacts:
    - path: content/6.maps/_policy/policy.md
      provides: Domain entry with topic navigation
    - path: content/6.maps/_policy/five-years-plan-14.md
      provides: Five-year plan content with original_path
  key_links:
    - from: content/6.maps/_policy/policy.md
      to: content/6.maps/_policy/five-years-plan-14.md
      via: topic navigation link
    - from: content/6.maps/0.index.md
      to: content/6.maps/_policy/policy
      via: cross-domain link
---

# Phase 6-03: Migrate _policy Domain

<objective>
Migrate the _policy domain to the 4-layer structure by creating a domain entry file and keeping the topic file at the domain root level (flat structure). With only 2 files total, subdomains would be premature.

Purpose: Establish consistent domain structure for policy knowledge with flat topic organization.
Output: Domain entry file and topic file with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_policy/policy.md
@content/6.maps/_policy/five-years-plan-14.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _policy domain entry file</name>
  <files>content/6.maps/_policy/policy.md</files>
  <action>
Create content/6.maps/_policy/policy.md as the domain entry file with:
1. YAML frontmatter:
   - title: 政策
   - description: 政策研究、五年规划及政策分析
2. ## 主题 section with link to topic:
   * [十四五规划](/maps/_policy/five-years-plan-14)
3. ## Cross Domain section (preserve existing links):
   - [Continues Compliance 持续合规](/maps/_devops/continuous-compliance)
4. ## 概述 section with brief domain overview mentioning policy research and five-year plans

Note: The existing policy.md will be replaced with the new domain entry structure.
Preserve any existing cross-domain links from the original file.
  </action>
  <verify>File exists with proper frontmatter and topic navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Update five-years-plan-14.md with original_path frontmatter</name>
  <files>content/6.maps/_policy/five-years-plan-14.md</files>
  <action>
Update content/6.maps/_policy/five-years-plan-14.md to add to frontmatter:
- original_path: content/6.maps/_policy/five-years-plan-14.md

Preserve all original content including:
- 十四五规划全文引用
- 十三五成就回顾
- 国际环境分析
- 2035年远景目标
  </action>
  <verify>
- File has original_path in frontmatter
- All original content preserved
  </verify>
  <done>Five-years-plan-14.md updated with original_path metadata</done>
</task>

<task type="auto">
  <name>Verify cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Verify the link in 0.index.md under ## 政策 section:
- [政策](/maps/_policy/policy) - should remain as-is (path doesn't change)

Note: Since we're replacing policy.md with the domain entry (same filename), the path remains the same.
  </action>
  <verify>Link in 0.index.md is correct</verify>
  <done>Cross-domain link verified</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_policy/policy.md exists with proper frontmatter
- [ ] Domain entry has ## 主题 section linking to five-years-plan-14
- [ ] Domain entry preserves ## Cross Domain section with continuous-compliance link
- [ ] content/6.maps/_policy/five-years-plan-14.md has original_path in frontmatter
- [ ] All original content preserved in five-years-plan-14.md
- [ ] 0.index.md link is correct
</verification>

<success_criteria>
- _policy domain follows 4-layer structure with flat topic organization
- Domain entry provides clear navigation to five-years-plan-14 topic
- Domain entry preserves cross-domain links to _devops
- Topic file has preserved metadata with original_path
- Cross-domain links in 0.index.md are correct
</success_criteria>

<output>
After completion, create `.planning/phases/06-medium-batch-1/06-P03-SUMMARY.md`
</output>
