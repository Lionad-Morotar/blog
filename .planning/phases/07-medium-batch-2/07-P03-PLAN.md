---
phase: 07-medium-batch-2
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_cpp/cpp.md
  - content/6.maps/_cpp/google-cpp-standard.md
  - content/6.maps/_cpp/king-db.md
  - content/6.maps/_cpp/makefile.md
autonomous: true
must_haves:
  truths:
    - _cpp domain entry file exists with proper frontmatter and topic navigation
    - All topic files (google-cpp-standard.md, king-db.md, makefile.md) remain as flat topics
    - original_path preserved in all topic file frontmatter
    - Internal links in cpp.md point to correct topic paths
    - Cross-domain link in king-db.md to hash-collision verified
    - Cross-domain links in 0.index.md verified
  artifacts:
    - path: content/6.maps/_cpp/cpp.md
      provides: Domain entry with topic navigation
    - path: content/6.maps/_cpp/google-cpp-standard.md
      provides: Google C++ style guide content with original_path
    - path: content/6.maps/_cpp/king-db.md
      provides: KingDB key-value store content with original_path
    - path: content/6.maps/_cpp/makefile.md
      provides: Makefile tutorial content with original_path
  key_links:
    - from: content/6.maps/_cpp/cpp.md
      to: content/6.maps/_cpp/google-cpp-standard.md
      via: topic navigation link
    - from: content/6.maps/_cpp/cpp.md
      to: content/6.maps/_cpp/king-db.md
      via: topic navigation link
    - from: content/6.maps/_cpp/cpp.md
      to: content/6.maps/_cpp/makefile.md
      via: topic navigation link
    - from: content/6.maps/_cpp/king-db.md
      to: content/6.maps/_computer/encoding/hash-collision
      via: cross-domain link
---

# Phase 7-03: Migrate _cpp Domain

<objective>
Migrate the _cpp domain to the 4-layer structure with a flat topic layout (no subdomains). Create a domain entry file and formalize the existing topic files with proper frontmatter including original_path metadata.

Purpose: Establish consistent domain structure for C++ knowledge while maintaining the flat organization pattern appropriate for independent topics.
Output: Domain entry file and formalized topic files with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_cpp/cpp.md
@content/6.maps/_cpp/google-cpp-standard.md
@content/6.maps/_cpp/king-db.md
@content/6.maps/_cpp/makefile.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _cpp domain entry file</name>
  <files>content/6.maps/_cpp/cpp.md</files>
  <action>
Create content/6.maps/_cpp/cpp.md as the domain entry file with:
1. YAML frontmatter:
   - title: C++
   - description: C++ 是一种静态类型、编译式、通用、多范式编程语言
2. ## 主题 section with links to topics:
   * [Google C++ Standard](/maps/_cpp/google-cpp-standard)
   * [KingDB](/maps/_cpp/king-db)
   * [Makefile](/maps/_cpp/makefile)
3. ## 概述 section with brief domain overview mentioning:
   - C++ as a multi-paradigm language (procedural, OOP, generic)
   - Cross-language interop capabilities (PInvoke)
   - Build toolchain and standards
4. Preserve key content sections from original cpp.md:
   - FAQ section (string headers, namespace std, PInvoke)
5. Verify internal links point to correct paths:
   - `/maps/_cpp/google-cpp-standard` -> `/maps/_cpp/google-cpp-standard`
   - `/maps/_cpp/king-db` -> `/maps/_cpp/king-db`
   - `/maps/_cpp/makefile` -> `/maps/_cpp/makefile`
  </action>
  <verify>File exists with proper frontmatter and topic navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Formalize google-cpp-standard topic file</name>
  <files>content/6.maps/_cpp/google-cpp-standard.md</files>
  <action>
Update content/6.maps/_cpp/google-cpp-standard.md:
1. Keep existing frontmatter:
   - title: Google C++ Standard
   - description: Google C++ 编程规范
2. Add to frontmatter:
   - original_path: content/6.maps/_cpp/google-cpp-standard.md
3. Preserve all original content including:
   - 头文件 section
   - 作用域 section
   - 类 section
   - 函数 section
   - 指针 section
   - 其他 C++ 特性 section
   - 命名约定 section
   - 注释 section
   - 格式化 section
   - 规则特例 section
  </action>
  <verify>
- File exists with proper frontmatter
- original_path in frontmatter
- All content preserved
  </verify>
  <done>Google-cpp-standard topic file formalized with metadata</done>
</task>

<task type="auto">
  <name>Formalize king-db topic file</name>
  <files>content/6.maps/_cpp/king-db.md</files>
  <action>
Update content/6.maps/_cpp/king-db.md:
1. Keep existing frontmatter:
   - title: King Database
   - description: A simple key-value store database
2. Add to frontmatter:
   - original_path: content/6.maps/_cpp/king-db.md
3. Preserve all original content including:
   - IKVS Series overview
   - Parts 1-10 summaries
   - Architecture analysis
   - Hash table implementations
   - LSM-tree concepts
4. Verify cross-domain link to hash-collision:
   - `/maps/_computer/encoding/hash-collision` should remain correct
  </action>
  <verify>
- File exists with proper frontmatter
- original_path in frontmatter
- Cross-domain link preserved
- All content preserved
  </verify>
  <done>King-db topic file formalized with metadata</done>
</task>

<task type="auto">
  <name>Formalize makefile topic file</name>
  <files>content/6.maps/_cpp/makefile.md</files>
  <action>
Update content/6.maps/_cpp/makefile.md:
1. Keep existing frontmatter:
   - title: Makefile
   - description: Makefile 构建工具基础教程
2. Add to frontmatter:
   - original_path: content/6.maps/_cpp/makefile.md
3. Preserve all original content including:
   - 概述 section
   - Makefile syntax explanation
   - wildcard and patsubst examples
   - 相关 resources
  </action>
  <verify>
- File exists with proper frontmatter
- original_path in frontmatter
- All content preserved
  </verify>
  <done>Makefile topic file formalized with metadata</done>
</task>

<task type="auto">
  <name>Verify cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Verify the links in 0.index.md under ## 编程语言 section:
- `[C++](/maps/_cpp/cpp)` should remain correct (domain entry)
- No changes needed as paths remain flat
  </action>
  <verify>Links in 0.index.md are correct</verify>
  <done>Cross-domain links verified</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_cpp/cpp.md exists with proper frontmatter
- [ ] Domain entry has ## 主题 section linking to all topics
- [ ] content/6.maps/_cpp/google-cpp-standard.md has original_path in frontmatter
- [ ] content/6.maps/_cpp/king-db.md has original_path in frontmatter
- [ ] content/6.maps/_cpp/makefile.md has original_path in frontmatter
- [ ] Cross-domain link in king-db.md to hash-collision is valid
- [ ] 0.index.md links are correct
- [ ] All original content preserved
</verification>

<success_criteria>
- _cpp domain follows 4-layer structure with flat topic organization
- Domain entry provides clear navigation to all topics
- All topic files have original_path metadata preserved
- Cross-domain links remain valid
</success_criteria>

<output>
After completion, create `.planning/phases/07-medium-batch-2/07-P03-SUMMARY.md`
</output>
