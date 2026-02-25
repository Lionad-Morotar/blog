---
phase: 14-complex-workflow
plan: P01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_workflow/engineering/engineering.md
  - content/6.maps/_workflow/engineering/fe-engineering.md
  - content/6.maps/_workflow/package-manager/package-manager.md
  - content/6.maps/_workflow/package-manager/npm.md
  - content/6.maps/_workflow/package-manager/pnpm.md
  - content/6.maps/_workflow/package-manager/lockfile.md
autonomous: true
must_haves:
  truths:
    - engineering/ subdirectory exists with entry file and fe-engineering.md
    - package-manager/ subdirectory exists with entry file and 3 topic files
    - All files have proper frontmatter with original_path preserved
    - Knowledge points remain as H4 headings (not split into separate files)
  artifacts:
    - path: content/6.maps/_workflow/engineering/engineering.md
      provides: "Engineering subdomain entry with navigation"
      min_lines: 30
    - path: content/6.maps/_workflow/engineering/fe-engineering.md
      provides: "Frontend engineering content from fe-engineering.md"
      min_lines: 50
      contains: "original_path"
    - path: content/6.maps/_workflow/package-manager/package-manager.md
      provides: "Package manager subdomain entry with navigation"
      min_lines: 40
    - path: content/6.maps/_workflow/package-manager/npm.md
      provides: "NPM documentation"
      contains: "original_path"
    - path: content/6.maps/_workflow/package-manager/pnpm.md
      provides: "pnpm documentation"
      contains: "original_path"
    - path: content/6.maps/_workflow/package-manager/lockfile.md
      provides: "Lockfile mechanism documentation"
      contains: "original_path"
  key_links:
    - from: "engineering/engineering.md"
      to: "engineering/fe-engineering.md"
      via: "## 主题 navigation"
    - from: "package-manager/package-manager.md"
      to: "package-manager/npm.md"
      via: "## 主题 navigation"
---

<objective>
Create engineering/ and package-manager/ subdomains with proper entry files and migrated content.

Purpose: Establish the first two subdomains of the _workflow domain restructuring, following the pattern from Phase 13.
Output: 6 files organized into 2 subdomains with proper navigation and preserved original_path metadata.
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
- content/6.maps/_workflow/fe-engineering.md (root file, to migrate)
- content/6.maps/_workflow/package-manager/0.index.md (existing entry)
- content/6.maps/_workflow/package-manager/npm.md (existing)
- content/6.maps/_workflow/package-manager/pnpm.md (existing)
- content/6.maps/_workflow/package-manager/lockfile.md (existing)

Target structure:
- content/6.maps/_workflow/engineering/engineering.md (new entry)
- content/6.maps/_workflow/engineering/fe-engineering.md (migrated from root)
- content/6.maps/_workflow/package-manager/package-manager.md (new entry, replaces 0.index.md)
- content/6.maps/_workflow/package-manager/npm.md (preserve with original_path)
- content/6.maps/_workflow/package-manager/pnpm.md (preserve with original_path)
- content/6.maps/_workflow/package-manager/lockfile.md (preserve with original_path)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create engineering/ subdirectory and migrate fe-engineering.md</name>
  <files>
    content/6.maps/_workflow/engineering/engineering.md
    content/6.maps/_workflow/engineering/fe-engineering.md
  </files>
  <action>
    1. Create content/6.maps/_workflow/engineering/ directory
    2. Create engineering.md entry file with:
       - Frontmatter: title="工程化", description="软件工程与前端工程化的理论与实践"
       - ## 主题 section linking to fe-engineering.md
       - ## 核心概念 section with H4 knowledge points about software engineering principles
       - ## 最佳实践 section with H4 knowledge points
    3. Copy fe-engineering.md from root to engineering/fe-engineering.md
    4. Add original_path: "/_workflow/fe-engineering.md" to frontmatter
    5. Keep all existing H4 knowledge points intact
  </action>
  <verify>
    ls -la content/6.maps/_workflow/engineering/
    grep "original_path" content/6.maps/_workflow/engineering/fe-engineering.md
  </verify>
  <done>
    engineering/ directory exists with engineering.md entry and fe-engineering.md with original_path preserved
  </done>
</task>

<task type="auto">
  <name>Task 2: Create package-manager/ entry and update existing files</name>
  <files>
    content/6.maps/_workflow/package-manager/package-manager.md
    content/6.maps/_workflow/package-manager/npm.md
    content/6.maps/_workflow/package-manager/pnpm.md
    content/6.maps/_workflow/package-manager/lockfile.md
  </files>
  <action>
    1. Create package-manager.md entry file (replacing 0.index.md pattern):
       - Frontmatter: title="包管理器", description="用于管理项目依赖的工具，涵盖 npm、pnpm、yarn 的核心特性和最佳实践"
       - ## 主题 section with links to npm, pnpm, lockfile
       - ## 发展历程 section (migrate content from 0.index.md ## 发展历程)
       - ## 常见问题 section (migrate H4 knowledge points from 0.index.md)
    2. Update npm.md: Add original_path: "/_workflow/package-manager/npm.md" if not exists
    3. Update pnpm.md: Add original_path: "/_workflow/package-manager/pnpm.md" if not exists
    4. Update lockfile.md: Add original_path: "/_workflow/package-manager/lockfile.md" if not exists
    5. Keep 0.index.md for now (will be removed in later phase after link updates)
  </action>
  <verify>
    grep -l "original_path" content/6.maps/_workflow/package-manager/*.md | wc -l
    head -20 content/6.maps/_workflow/package-manager/package-manager.md
  </verify>
  <done>
    package-manager.md entry created with navigation, all topic files have original_path in frontmatter
  </done>
</task>

</tasks>

<verification>
- [ ] engineering/engineering.md exists with proper frontmatter and ## 主题 navigation
- [ ] engineering/fe-engineering.md exists with original_path preserved
- [ ] package-manager/package-manager.md exists with ## 主题 navigation
- [ ] All package-manager topic files have original_path in frontmatter
- [ ] Knowledge points remain as H4 headings (not split into files)
- [ ] No broken internal links within these subdomains
</verification>

<success_criteria>
1. engineering/ subdirectory complete with entry file and migrated content
2. package-manager/ subdirectory has new entry file and all topic files preserved
3. All files follow the 4-layer hierarchy pattern (Domain → Subdomain → Topic → Knowledge Point)
4. Original paths documented for future reference
</success_criteria>

<output>
After completion, create `.planning/phases/14-complex-workflow/14-P01-SUMMARY.md`
</output>
