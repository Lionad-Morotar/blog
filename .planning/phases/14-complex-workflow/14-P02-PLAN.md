---
phase: 14-complex-workflow
plan: P02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_workflow/build-tools/build-tools.md
  - content/6.maps/_workflow/build-tools/vite.md
  - content/6.maps/_workflow/build-tools/webpack.md
  - content/6.maps/_workflow/build-tools/rspack.md
  - content/6.maps/_workflow/linter/linter.md
  - content/6.maps/_workflow/linter/eslint.md
  - content/6.maps/_workflow/linter/code-style.md
autonomous: true
must_haves:
  truths:
    - build-tools/ subdirectory exists with entry file and 3 topic files
    - linter/ subdirectory exists with entry file and 2 topic files
    - packer/ directory renamed to build-tools/
    - linter/index.md renamed to linter/linter.md
    - All files have proper frontmatter with original_path preserved
  artifacts:
    - path: content/6.maps/_workflow/build-tools/build-tools.md
      provides: "Build tools subdomain entry with navigation"
      min_lines: 50
    - path: content/6.maps/_workflow/build-tools/vite.md
      provides: "Vite documentation"
      contains: "original_path"
    - path: content/6.maps/_workflow/build-tools/webpack.md
      provides: "Webpack documentation"
      contains: "original_path"
    - path: content/6.maps/_workflow/build-tools/rspack.md
      provides: "Rspack documentation"
      contains: "original_path"
    - path: content/6.maps/_workflow/linter/linter.md
      provides: "Linter subdomain entry with navigation"
      min_lines: 30
    - path: content/6.maps/_workflow/linter/eslint.md
      provides: "ESLint documentation"
      contains: "original_path"
    - path: content/6.maps/_workflow/linter/code-style.md
      provides: "Code style documentation"
      contains: "original_path"
  key_links:
    - from: "build-tools/build-tools.md"
      to: "build-tools/vite.md"
      via: "## 主题 navigation"
    - from: "linter/linter.md"
      to: "linter/eslint.md"
      via: "## 主题 navigation"
---

<objective>
Create build-tools/ and linter/ subdomains by renaming existing directories and creating proper entry files.

Purpose: Continue _workflow domain restructuring by formalizing the build tools and linter subdomains.
Output: 7 files organized into 2 subdomains with proper navigation and preserved original_path metadata.
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
- content/6.maps/_workflow/packer/0.index.md (existing entry)
- content/6.maps/_workflow/packer/vite.md (existing)
- content/6.maps/_workflow/packer/webpack.md (existing)
- content/6.maps/_workflow/packer/rspack.md (existing)
- content/6.maps/_workflow/linter/index.md (existing entry)
- content/6.maps/_workflow/linter/eslint.md (existing)
- content/6.maps/_workflow/linter/code-style.md (existing)

Target structure:
- content/6.maps/_workflow/build-tools/build-tools.md (new entry)
- content/6.maps/_workflow/build-tools/vite.md (migrated from packer/)
- content/6.maps/_workflow/build-tools/webpack.md (migrated from packer/)
- content/6.maps/_workflow/build-tools/rspack.md (migrated from packer/)
- content/6.maps/_workflow/linter/linter.md (new entry, replaces index.md)
- content/6.maps/_workflow/linter/eslint.md (preserve with original_path)
- content/6.maps/_workflow/linter/code-style.md (preserve with original_path)

Key decision from RESEARCH.md: Rename "packer" to "build-tools" for clearer semantics (matches industry terminology).
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rename packer/ to build-tools/ and create entry file</name>
  <files>
    content/6.maps/_workflow/build-tools/build-tools.md
    content/6.maps/_workflow/build-tools/vite.md
    content/6.maps/_workflow/build-tools/webpack.md
    content/6.maps/_workflow/build-tools/rspack.md
  </files>
  <action>
    1. Rename directory: mv packer/ build-tools/
    2. Create build-tools.md entry file:
       - Frontmatter: title="构建工具", description="前端构建工具全景图，涵盖 Vite、Webpack、Rspack 等主流工具的特性对比和使用说明"
       - ## 主题 section with links to vite, webpack, rspack
       - ## 工具对比 section with H4 knowledge points:
         - Vite vs Webpack: 什么时候选择哪个？
         - Rspack 的 Webpack 兼容性如何实现？
         - tsup 适合什么场景？
         - Rollup 的输出体积优势
       - ## 新兴工具 section with H4 knowledge points:
         - Unbuild 的 stub 模式是什么？
         - Rome/Biome 的统一工具链愿景
    3. Update vite.md: Add original_path: "/_workflow/packer/vite.md"
    4. Update webpack.md: Add original_path: "/_workflow/packer/webpack.md"
    5. Update rspack.md: Add original_path: "/_workflow/packer/rspack.md"
    6. Remove build-tools/0.index.md (replaced by build-tools.md)
  </action>
  <verify>
    ls -la content/6.maps/_workflow/build-tools/
    grep "original_path" content/6.maps/_workflow/build-tools/*.md
  </verify>
  <done>
    build-tools/ directory exists with entry file and 3 topic files, all with original_path preserved
  </done>
</task>

<task type="auto">
  <name>Task 2: Create linter/ entry file and update existing files</name>
  <files>
    content/6.maps/_workflow/linter/linter.md
    content/6.maps/_workflow/linter/eslint.md
    content/6.maps/_workflow/linter/code-style.md
  </files>
  <action>
    1. Create linter.md entry file (replacing index.md pattern):
       - Frontmatter: title="代码规范", description="代码质量检查工具与风格规范，涵盖 ESLint、Prettier 等工具的配置与最佳实践"
       - ## 主题 section with links to eslint, code-style
       - ## ESLint 9.x Flat Config section with H4 knowledge points:
         - 如何迁移到 Flat Config？
         - 为什么推荐使用 @antfu/eslint-config？
       - ## 代码格式化策略 section with H4 knowledge points:
         - 为什么 antfu 不使用 Prettier？
         - ESLint-only 方案的优势
    2. Update eslint.md: Add original_path: "/_workflow/linter/eslint.md" if not exists
    3. Update code-style.md: Add original_path: "/_workflow/linter/code-style.md" if not exists
    4. Migrate any essential content from index.md to linter.md
    5. Remove linter/index.md (replaced by linter.md)
  </action>
  <verify>
    ls -la content/6.maps/_workflow/linter/
    grep "original_path" content/6.maps/_workflow/linter/*.md
  </verify>
  <done>
    linter/ directory has linter.md entry file, eslint.md and code-style.md have original_path preserved
  </done>
</task>

</tasks>

<verification>
- [ ] build-tools/ directory exists with build-tools.md entry file
- [ ] build-tools/ contains vite.md, webpack.md, rspack.md with original_path
- [ ] linter/ directory exists with linter.md entry file
- [ ] linter/ contains eslint.md and code-style.md with original_path
- [ ] packer/ directory no longer exists (renamed to build-tools/)
- [ ] linter/index.md no longer exists (replaced by linter.md)
- [ ] Knowledge points remain as H4 headings
</verification>

<success_criteria>
1. build-tools/ subdomain complete with entry file and 3 topic files
2. linter/ subdomain complete with entry file and 2 topic files
3. Directory renamed from packer/ to build-tools/ for clearer semantics
4. All files follow the 4-layer hierarchy pattern
5. Original paths documented for future reference
</success_criteria>

<output>
After completion, create `.planning/phases/14-complex-workflow/14-P02-SUMMARY.md`
</output>
