---
phase: 10-medium-batch-5
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_programming/programming.md
  - content/6.maps/_programming/paradigms/paradigms.md
  - content/6.maps/_programming/dx/dx.md
  - content/6.maps/_programming/debugging/debugging.md
  - content/6.maps/_programming/languages/languages.md
  - content/6.maps/_programming/frameworks/frameworks.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _programming domain entry file exists with proper frontmatter and subdomain navigation
    - functional.md moved to paradigms/ subdirectory as paradigms.md subdomain entry
    - dx.md moved to dx/ subdirectory as subdomain entry (with nested dx/ content preserved)
    - debug.md moved to debugging/ subdirectory as debugging.md subdomain entry
    - programming-language.md moved to languages/ subdirectory as languages.md subdomain entry
    - rezi.md moved to frameworks/ subdirectory as frameworks.md subdomain entry
    - tech-bias.md content merged into programming.md domain entry
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_programming/programming.md
      provides: Domain entry with subdomain navigation and tech-bias content
    - path: content/6.maps/_programming/paradigms/paradigms.md
      provides: Programming paradigms content as subdomain entry with original_path
    - path: content/6.maps/_programming/dx/dx.md
      provides: Developer experience content as subdomain entry with original_path
    - path: content/6.maps/_programming/dx/genai-for-forward-engineering.md
      provides: GenAI forward engineering content with original_path
    - path: content/6.maps/_programming/dx/genai-for-legacy-codebases.md
      provides: GenAI legacy codebases content with original_path
    - path: content/6.maps/_programming/debugging/debugging.md
      provides: Debugging content as subdomain entry with original_path
    - path: content/6.maps/_programming/languages/languages.md
      provides: Programming languages content as subdomain entry with original_path
    - path: content/6.maps/_programming/frameworks/frameworks.md
      provides: Frameworks content (Rezi) as subdomain entry with original_path
  key_links:
    - from: content/6.maps/_programming/programming.md
      to: content/6.maps/_programming/paradigms/paradigms.md
      via: subdomain navigation link
    - from: content/6.maps/_programming/programming.md
      to: content/6.maps/_programming/dx/dx.md
      via: subdomain navigation link
    - from: content/6.maps/_programming/programming.md
      to: content/6.maps/_programming/debugging/debugging.md
      via: subdomain navigation link
    - from: content/6.maps/_programming/programming.md
      to: content/6.maps/_programming/languages/languages.md
      via: subdomain navigation link
    - from: content/6.maps/_programming/programming.md
      to: content/6.maps/_programming/frameworks/frameworks.md
      via: subdomain navigation link
    - from: content/6.maps/_programming/dx/dx.md
      to: content/6.maps/_programming/dx/genai-for-forward-engineering.md
      via: internal topic link
    - from: content/6.maps/_programming/dx/dx.md
      to: content/6.maps/_programming/dx/genai-for-legacy-codebases.md
      via: internal topic link
    - from: content/6.maps/0.index.md
      to: new _programming domain paths
      via: updated cross-domain links
---

# Phase 10-02: Migrate _programming Domain (MED-18)

<objective>
Migrate the _programming domain to the 4-layer structure by creating a domain entry file and organizing 8 files into 5 subdomains: paradigms/, dx/, debugging/, languages/, and frameworks/. The tech-bias.md content will be merged into the domain entry.

Purpose: Establish consistent domain structure for programming knowledge with clear subdomain separation for programming paradigms, developer experience, debugging techniques, programming languages, and frameworks.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_programming/functional.md
@content/6.maps/_programming/dx.md
@content/6.maps/_programming/debug.md
@content/6.maps/_programming/tech-bias.md
@content/6.maps/_programming/rezi.md
@content/6.maps/_programming/programming-language.md
@content/6.maps/_programming/dx/genai-for-forward-engineering.md
@content/6.maps/_programming/dx/genai-for-legacy-codebases.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _programming domain entry file</name>
  <files>content/6.maps/_programming/programming.md</files>
  <action>
Create content/6.maps/_programming/programming.md as the domain entry file with:
1. YAML frontmatter:
   - title: 编程
   - description: 编程范式、开发者体验、调试技术、编程语言与框架
2. ## 子领域 section with links to subdomains:
   * [编程范式](/maps/_programming/paradigms/paradigms) - 函数式编程、面向对象等编程范式
   * [开发者体验](/maps/_programming/dx/dx) - DX 工具与实践
   * [调试技术](/maps/_programming/debugging/debugging) - Bug 修复与调试方法
   * [编程语言](/maps/_programming/languages/languages) - 编程语言概览与特性
   * [框架与工具](/maps/_programming/frameworks/frameworks) - 开发框架与工具库
3. ## 技术偏见 section with content from tech-bias.md (all 5 links preserved)
4. ## 概述 section with brief domain overview about programming as a discipline
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and merged tech-bias content</done>
</task>

<task type="auto">
  <name>Create paradigms subdomain and migrate content</name>
  <files>content/6.maps/_programming/paradigms/paradigms.md</files>
  <action>
1. Create directory content/6.maps/_programming/paradigms/
2. Move original content/6.maps/_programming/functional.md to content/6.maps/_programming/paradigms/paradigms.md
3. Update frontmatter of moved file:
   - title: 编程范式
   - description: 编程范式与思想，包括函数式编程、面向对象等
   - original_path: content/6.maps/_programming/functional.md
4. Preserve all original content including:
   - 函数式是什么 section with imperative vs functional comparison
   - 解决什么问题 section about state management
   - 函数式的基石 section about first-class functions
   - 局部应用 section
   - 颗粒化 (Currying) section
   - 递归 section with trampoline optimization
   - 延迟 (Lazy) section
   - 函子 section (Maybe, Either, Monad)
   - 阅读更多 section with all links
5. Ensure all knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Title updated to "编程范式"
  </verify>
  <done>Paradigms subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create dx subdomain and migrate content</name>
  <files>content/6.maps/_programming/dx/dx.md</files>
  <action>
1. Keep existing directory content/6.maps/_programming/dx/
2. Move original content/6.maps/_programming/dx.md to content/6.maps/_programming/dx/dx.md (as subdomain entry)
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_programming/dx.md
4. Preserve all original content including:
   - Domain section with links to genai files
   - Cross Domain section with links to _ai domain
   - Gists section with Developer Exception Engineering article
5. Ensure nested files remain in place:
   - genai-for-forward-engineering.md (add original_path: content/6.maps/_programming/dx/genai-for-forward-engineering.md)
   - genai-for-legacy-codebases.md (add original_path: content/6.maps/_programming/dx/genai-for-legacy-codebases.md)
6. Update internal links in dx.md if needed to reflect new paths
  </action>
  <verify>
- dx.md moved to dx/ directory as subdomain entry
- original_path in frontmatter
- Nested genai files remain with original_path added
- All content preserved
  </verify>
  <done>DX subdomain formalized with entry file and nested content preserved</done>
</task>

<task type="auto">
  <name>Create debugging subdomain and migrate content</name>
  <files>content/6.maps/_programming/debugging/debugging.md</files>
  <action>
1. Create directory content/6.maps/_programming/debugging/
2. Move original content/6.maps/_programming/debug.md to content/6.maps/_programming/debugging/debugging.md
3. Update frontmatter of moved file:
   - title: 调试技术
   - description: 系统化 Bug 修复方法与调试技术
   - original_path: content/6.maps/_programming/debug.md
4. Preserve all original content including:
   - 系统化 Bug 修复方法 section with Dan Abramov's methodology
   - The table with steps 0-4 (Just Fix It, Find a Repro, Narrow the Repro, Remove Everything Else, Find the Root Cause)
   - Link to overreacted.io article
5. Ensure knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Title updated to "调试技术"
  </verify>
  <done>Debugging subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create languages subdomain and migrate content</name>
  <files>content/6.maps/_programming/languages/languages.md</files>
  <action>
1. Create directory content/6.maps/_programming/languages/
2. Move original content/6.maps/_programming/programming-language.md to content/6.maps/_programming/languages/languages.md
3. Update frontmatter of moved file:
   - title: 编程语言
   - description: 编程语言概览与特性
   - original_path: content/6.maps/_programming/programming-language.md
4. Preserve all original content including:
   - Lean link
   - Prolog link
   - Moonbit link
5. Add ## 编程语言 section header if not present
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Title updated to "编程语言"
  </verify>
  <done>Languages subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create frameworks subdomain and migrate content</name>
  <files>content/6.maps/_programming/frameworks/frameworks.md</files>
  <action>
1. Create directory content/6.maps/_programming/frameworks/
2. Move original content/6.maps/_programming/rezi.md to content/6.maps/_programming/frameworks/frameworks.md
3. Update frontmatter of moved file:
   - title: 框架与工具
   - description: 开发框架、工具库与 TUI 框架
   - original_path: content/6.maps/_programming/rezi.md
4. Preserve all original content including:
   - Rezi 是什么 section
   - Core features list (TypeScript + C engine, 56 components, Canvas drawing, etc.)
   - Link to Rezi documentation
5. Add ## TUI 框架 section header before Rezi content
6. Consider adding note about future expansion for other frameworks
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Title updated to "框架与工具"
  </verify>
  <done>Frameworks subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Remove tech-bias.md and update cross-domain links</name>
  <files>content/6.maps/_programming/tech-bias.md, content/6.maps/0.index.md</files>
  <action>
1. Delete content/6.maps/_programming/tech-bias.md (content already merged into programming.md)
2. Update content/6.maps/0.index.md:
   - Change `/maps/_programming/tech-bias` to `/maps/_programming/programming` in ## 软件 section
   - Keep link text "技术偏见" unchanged
3. Update content/6.maps/0.index.md:
   - Change `/maps/_programming/functional` to `/maps/_programming/paradigms/paradigms` in ## 软件 section
   - Keep link text "函数式" unchanged
4. Update content/6.maps/0.index.md:
   - Change `/maps/_programming/dx` to `/maps/_programming/dx/dx` in ## 工程 section
   - Keep link text "DX" unchanged
5. Update content/6.maps/0.index.md:
   - Change `/maps/_programming/rezi` to `/maps/_programming/frameworks/frameworks` in ## 软件 section
   - Keep link text "Rezi" unchanged
6. Update content/6.maps/0.index.md:
   - Change `/maps/_programming/programming-language` to `/maps/_programming/languages/languages` in ## 编程语言 section
   - Keep link text "编程语言" unchanged
  </action>
  <verify>
- tech-bias.md deleted
- All 5 links in 0.index.md updated to new paths
  </verify>
  <done>Tech-bias.md removed and all cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_programming/programming.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all five subdomains
- [ ] Domain entry has ## 技术偏见 section with merged content
- [ ] content/6.maps/_programming/paradigms/paradigms.md exists (migrated from functional.md)
- [ ] content/6.maps/_programming/dx/dx.md exists (moved from dx.md)
- [ ] content/6.maps/_programming/dx/genai-for-forward-engineering.md exists with original_path
- [ ] content/6.maps/_programming/dx/genai-for-legacy-codebases.md exists with original_path
- [ ] content/6.maps/_programming/debugging/debugging.md exists (migrated from debug.md)
- [ ] content/6.maps/_programming/languages/languages.md exists (migrated from programming-language.md)
- [ ] content/6.maps/_programming/frameworks/frameworks.md exists (migrated from rezi.md)
- [ ] All moved files have original_path in frontmatter
- [ ] Original files (functional.md, debug.md, programming-language.md, rezi.md, tech-bias.md, dx.md) removed
- [ ] All links in 0.index.md updated (functional, dx, tech-bias, rezi, programming-language)
</verification>

<success_criteria>
- _programming domain follows 4-layer structure with 5 subdomains
- Domain entry provides clear navigation to all subdomains
- tech-bias.md content merged into domain entry
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- dx/ directory properly structured with subdomain entry and nested content
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/10-medium-batch-5/10-P02-SUMMARY.md`
</output>
