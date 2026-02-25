---
phase: 14-complex-workflow
plan: P04
type: execute
wave: 3
depends_on:
  - 14-P01
  - 14-P02
  - 14-P03
files_modified:
  - content/6.maps/0.index.md
  - content/6.maps/_workflow/build-tools/vite.md
  - content/6.maps/_workflow/build-tools/webpack.md
  - content/6.maps/_workflow/build-tools/rspack.md
  - content/6.maps/_workflow/linter/eslint.md
  - content/6.maps/_workflow/linter/code-style.md
  - content/6.maps/_workflow/package-manager/npm.md
  - content/6.maps/_workflow/package-manager/pnpm.md
  - content/6.maps/_workflow/package-manager/lockfile.md
  - content/6.maps/_software/*.md
  - content/6.maps/_devops/*.md
autonomous: true
must_haves:
  truths:
    - 0.index.md links to _workflow updated to new paths
    - All internal links within _workflow point to new subdomain paths
    - Cross-domain links from _software and _devops to _workflow updated
    - No broken internal links to old paths (_workflow/fe-engineering, _workflow/monorepo, etc.)
  artifacts:
    - path: content/6.maps/0.index.md
      provides: "Updated navigation links to _workflow subdomains"
      contains: "/_workflow/workflow"
    - path: content/6.maps/_workflow/build-tools/vite.md
      provides: "Internal links updated to new paths"
    - path: content/6.maps/_workflow/build-tools/webpack.md
      provides: "Internal links updated to new paths"
    - path: content/6.maps/_workflow/build-tools/rspack.md
      provides: "Internal links updated to new paths"
  key_links:
    - from: "0.index.md"
      to: "_workflow/workflow.md"
      via: "navigation link"
    - from: "_software/*.md"
      to: "_workflow/*"
      via: "cross-domain references"
    - from: "_devops/*.md"
      to: "_workflow/*"
      via: "cross-domain references"
---

<objective>
Update all cross-domain links to point to new _workflow subdomain paths.

Purpose: Ensure all internal links work correctly after the _workflow domain restructuring.
Output: Updated links in 0.index.md, within _workflow files, and cross-domain references from _software and _devops.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
@/Users/lionad/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/14-complex-workflow/14-RESEARCH.md

Link mapping (old → new):
- /maps/_workflow/fe-engineering → /maps/_workflow/engineering/fe-engineering
- /maps/_workflow/monorepo → /maps/_workflow/monorepo/monorepo
- /maps/_workflow/compiler → /maps/_workflow/compiler/compiler
- /maps/_workflow/package-manager → /maps/_workflow/package-manager/package-manager
- /maps/_workflow/packer → /maps/_workflow/build-tools/build-tools
- /maps/_workflow/packer/vite → /maps/_workflow/build-tools/vite
- /maps/_workflow/packer/webpack → /maps/_workflow/build-tools/webpack
- /maps/_workflow/packer/rspack → /maps/_workflow/build-tools/rspack
- /maps/_workflow/linter → /maps/_workflow/linter/linter
- /maps/_workflow/linter/eslint → /maps/_workflow/linter/eslint
- /maps/_workflow/linter/code-style → /maps/_workflow/linter/code-style

Files to check for cross-domain links:
- content/6.maps/0.index.md (main navigation)
- content/6.maps/_software/*.md (may reference workflow tools)
- content/6.maps/_devops/*.md (may reference workflow tools)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update 0.index.md navigation links</name>
  <files>
    content/6.maps/0.index.md
  </files>
  <action>
    1. Read current 0.index.md to identify _workflow links
    2. Update the following links:
       - [前端工程](/maps/_workflow/fe-engineering) → [前端工程化](/maps/_workflow/workflow)
       - [Monorepo](/maps/_workflow/monorepo) → [Monorepo](/maps/_workflow/monorepo/monorepo)
       - [包管理器](/maps/_workflow/package-manager) → [包管理器](/maps/_workflow/package-manager/package-manager)
       - [打包工具](/maps/_workflow/packer) → [构建工具](/maps/_workflow/build-tools/build-tools)
       - [编译器](/maps/_workflow/compiler) → [编译器](/maps/_workflow/compiler/compiler)
       - [Linter](/maps/_workflow/linter) → [代码规范](/maps/_workflow/linter/linter)
    3. Ensure all link text matches the new subdomain titles
  </action>
  <verify>
    grep "_workflow" content/6.maps/0.index.md | head -20
  </verify>
  <done>
    0.index.md contains updated links to all _workflow subdomains using new paths
  </done>
</task>

<task type="auto">
  <name>Task 2: Update internal _workflow links</name>
  <files>
    content/6.maps/_workflow/build-tools/vite.md
    content/6.maps/_workflow/build-tools/webpack.md
    content/6.maps/_workflow/build-tools/rspack.md
    content/6.maps/_workflow/linter/eslint.md
    content/6.maps/_workflow/linter/code-style.md
    content/6.maps/_workflow/package-manager/npm.md
    content/6.maps/_workflow/package-manager/pnpm.md
    content/6.maps/_workflow/package-manager/lockfile.md
  </files>
  <action>
    1. Search for any internal links within _workflow files that reference old paths
    2. Update links in packer/ files (now build-tools/) that may reference /packer/ paths
    3. Update links in package-manager/ files that may reference old paths
    4. Update links in linter/ files that may reference /linter/index paths
    5. Common patterns to check:
       - /maps/_workflow/packer/ → /maps/_workflow/build-tools/
       - /maps/_workflow/linter/index → /maps/_workflow/linter/linter
  </action>
  <verify>
    grep -r "/_workflow/packer/" content/6.maps/_workflow/ || echo "No old packer references found"
    grep -r "/_workflow/linter/index" content/6.maps/_workflow/ || echo "No old linter/index references found"
  </verify>
  <done>
    All internal _workflow links updated to new subdomain paths
  </done>
</task>

<task type="auto">
  <name>Task 3: Update cross-domain links from _software and _devops</name>
  <files>
    content/6.maps/_software/*.md
    content/6.maps/_devops/*.md
  </files>
  <action>
    1. Search for _workflow references in _software domain:
       grep -l "_workflow" content/6.maps/_software/*.md 2>/dev/null || echo "No _software references"
    2. Search for _workflow references in _devops domain:
       grep -l "_workflow" content/6.maps/_devops/*.md 2>/dev/null || echo "No _devops references"
    3. Update any found links to use new paths:
       - /maps/_workflow/fe-engineering → /maps/_workflow/engineering/fe-engineering
       - /maps/_workflow/monorepo → /maps/_workflow/monorepo/monorepo
       - /maps/_workflow/compiler → /maps/_workflow/compiler/compiler
       - /maps/_workflow/package-manager/* → /maps/_workflow/package-manager/* (paths stay same)
       - /maps/_workflow/packer/* → /maps/_workflow/build-tools/*
       - /maps/_workflow/linter/* → /maps/_workflow/linter/* (paths stay same)
  </action>
  <verify>
    grep -r "/_workflow/" content/6.maps/_software/ content/6.maps/_devops/ 2>/dev/null | grep -v "original_path" || echo "No cross-domain workflow references"
  </verify>
  <done>
    All cross-domain links from _software and _devops updated to new _workflow paths
  </done>
</task>

</tasks>

<verification>
- [ ] 0.index.md links to _workflow updated to new paths
- [ ] No references to /_workflow/fe-engineering (old root path) remain
- [ ] No references to /_workflow/monorepo (old root path) remain
- [ ] No references to /_workflow/compiler (old root path) remain
- [ ] No references to /_workflow/packer (old directory name) remain
- [ ] All internal _workflow links use correct new paths
- [ ] Cross-domain links from _software and _devops updated
</verification>

<success_criteria>
1. 0.index.md navigation reflects new _workflow structure
2. All internal _workflow links point to correct new paths
3. Cross-domain links from _software and _devops updated
4. No broken links to old _workflow paths
5. Link consistency maintained across the knowledge base
</success_criteria>

<output>
After completion, create `.planning/phases/14-complex-workflow/14-P04-SUMMARY.md`
</output>
