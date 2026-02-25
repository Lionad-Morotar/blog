---
phase: 05-simple-batch-4
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_refactor/refactoring.md
  - content/6.maps/_refactor/refactoring/refactor.md
autonomous: true
must_haves:
  truths:
    - _refactor domain entry file exists with proper frontmatter and subdomain navigation
    - Original refactor.md content moved to _refactor/refactoring/refactor.md
    - original_path preserved in moved file frontmatter
  artifacts:
    - path: content/6.maps/_refactor/refactoring.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_refactor/refactoring/refactor.md
      provides: Original content with original_path frontmatter
  key_links:
    - from: content/6.maps/_refactor/refactoring.md
      to: content/6.maps/_refactor/refactoring/refactor.md
      via: subdomain navigation link
---

# Phase 5-03: Migrate _refactor Domain

<objective>
Migrate the _refactor domain to the 4-layer structure by creating a domain entry file and moving original refactor.md content to a refactoring subdomain directory.

Purpose: Establish consistent domain structure for code refactoring knowledge.
Output: Domain entry file and relocated original content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_refactor/refactor.md
</context>

<tasks>

<task type="auto">
  <name>Create _refactor domain entry file</name>
  <files>content/6.maps/_refactor/refactoring.md</files>
  <action>
Create content/6.maps/_refactor/refactoring.md as the domain entry file with:
1. YAML frontmatter:
   - title: 重构
   - description: 代码重构的原则、模式和实践
2. ## 子领域 section with link to refactoring subdomain:
   * [重构实践](/maps/_refactor/refactoring/refactor)
3. ## 概述 section with brief domain overview mentioning code refactoring topics
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create subdomain and migrate original content</name>
  <files>content/6.maps/_refactor/refactoring/refactor.md</files>
  <action>
1. Create directory content/6.maps/_refactor/refactoring/
2. Move original content/6.maps/_refactor/refactor.md to content/6.maps/_refactor/refactoring/refactor.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_refactor/refactor.md
4. Preserve all original content including:
   - Domain and Cross Domain sections
   - GenAI for Legacy Codebases link
   - Understand Legacy Code gist
   - gogo-element project link
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Original content migrated to refactoring subdomain with preserved metadata</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_refactor/refactoring.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to /maps/_refactor/refactoring/refactor
- [ ] content/6.maps/_refactor/refactoring/refactor.md exists with original content
- [ ] Moved file has original_path: content/6.maps/_refactor/refactor.md in frontmatter
- [ ] All original content preserved (Domain/Cross Domain sections, links)
</verification>

<success_criteria>
- _refactor domain follows 4-layer structure
- Domain entry provides clear navigation to refactoring subdomain
- Original content accessible at new location with preserved history
</success_criteria>

<output>
After completion, create `.planning/phases/05-simple-batch-4/05-P03-SUMMARY.md`
</output>
