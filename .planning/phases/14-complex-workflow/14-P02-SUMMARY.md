---
phase: 14-complex-workflow
plan: P02
type: execute
subsystem: _workflow
status: complete
tags: [subdomain, build-tools, linter, migration]
dependency_graph:
  requires: []
  provides: [build-tools-subdomain, linter-subdomain]
  affects: []
tech_stack:
  added: []
  patterns: [4-layer-hierarchy, original_path-preservation, subdomain-entry]
key_files:
  created:
    - content/6.maps/_workflow/build-tools/build-tools.md
    - content/6.maps/_workflow/linter/linter.md
  modified:
    - content/6.maps/_workflow/build-tools/vite.md
    - content/6.maps/_workflow/build-tools/webpack.md
    - content/6.maps/_workflow/build-tools/rspack.md
    - content/6.maps/_workflow/linter/eslint.md
    - content/6.maps/_workflow/linter/code-style.md
  deleted:
    - content/6.maps/_workflow/packer/0.index.md
    - content/6.maps/_workflow/linter/index.md
decisions:
  - Renamed "packer" to "build-tools" for clearer semantics matching industry terminology
  - Created subdomain entry files with ## 主题 navigation sections
  - Preserved all existing knowledge points as H4 headings
  - Added original_path metadata to all migrated files
metrics:
  duration: 2m 29s
  completed_at: 2026-02-25T06:04:27Z
  tasks: 2
  files: 7
---

# Phase 14 Plan P02: Build-tools and Linter Subdomains Summary

**One-liner:** Created build-tools/ and linter/ subdomains by renaming packer/ directory and creating proper entry files with navigation and preserved original_path metadata.

## What Was Done

### Task 1: Build-tools Subdomain

Renamed `packer/` directory to `build-tools/` for clearer semantics that matches industry terminology.

Created `/content/6.maps/_workflow/build-tools/build-tools.md` entry file with:
- Frontmatter: title="构建工具", description="前端构建工具全景图..."
- ## 主题 section with links to vite, webpack, rspack
- ## 工具对比 section with H4 knowledge points:
  - Vite vs Webpack: 什么时候选择哪个？
  - Rspack 的 Webpack 兼容性如何实现？
  - tsup 适合什么场景？
  - Rollup 的输出体积优势
- ## 新兴工具 section with H4 knowledge points:
  - Unbuild 的 stub 模式是什么？
  - Rome/Biome 的统一工具链愿景

Updated existing files with `original_path` metadata:
- vite.md: `original_path: /_workflow/packer/vite.md`
- webpack.md: `original_path: /_workflow/packer/webpack.md`
- rspack.md: `original_path: /_workflow/packer/rspack.md`

Removed old `build-tools/0.index.md` entry file.

### Task 2: Linter Subdomain

Created `/content/6.maps/_workflow/linter/linter.md` entry file (replacing index.md pattern) with:
- Frontmatter: title="代码规范", description="代码质量检查工具与风格规范..."
- ## 主题 section with links to eslint, code-style
- ## ESLint 9.x Flat Config section with H4 knowledge points:
  - 如何迁移到 Flat Config？
  - 为什么推荐使用 @antfu/eslint-config？
- ## 代码格式化策略 section with H4 knowledge points:
  - 为什么 antfu 不使用 Prettier？
  - ESLint-only 方案的优势

Updated existing files with `original_path` metadata:
- eslint.md: `original_path: /_workflow/linter/eslint.md`
- code-style.md: `original_path: /_workflow/linter/code-style.md`

Removed old `linter/index.md` entry file.

## Deviations from Plan

None - plan executed exactly as written.

## Auth Gates

None encountered.

## Verification Results

- [x] build-tools/ directory exists with build-tools.md entry file
- [x] build-tools/ contains vite.md, webpack.md, rspack.md with original_path
- [x] linter/ directory exists with linter.md entry file
- [x] linter/ contains eslint.md and code-style.md with original_path
- [x] packer/ directory no longer exists (renamed to build-tools/)
- [x] linter/index.md no longer exists (replaced by linter.md)
- [x] Knowledge points remain as H4 headings

## Self-Check: PASSED

All created files exist:
- [x] content/6.maps/_workflow/build-tools/build-tools.md
- [x] content/6.maps/_workflow/build-tools/vite.md
- [x] content/6.maps/_workflow/build-tools/webpack.md
- [x] content/6.maps/_workflow/build-tools/rspack.md
- [x] content/6.maps/_workflow/linter/linter.md
- [x] content/6.maps/_workflow/linter/eslint.md
- [x] content/6.maps/_workflow/linter/code-style.md

All commits exist:
- [x] a7ed19b08: feat(14-P02): create build-tools subdomain from packer directory
- [x] 25305e36f: feat(14-P02): create linter subdomain entry and update existing files

## Commits

| Hash | Message |
|------|---------|
| a7ed19b08 | feat(14-P02): create build-tools subdomain from packer directory |
| 25305e36f | feat(14-P02): create linter subdomain entry and update existing files |
