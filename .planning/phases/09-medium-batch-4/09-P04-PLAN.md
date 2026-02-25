---
phase: 09-medium-batch-4
plan: 04
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_computer/computer.md
  - content/6.maps/_computer/fundamentals/fundamentals.md
  - content/6.maps/_computer/encoding/encoding.md
  - content/6.maps/_computer/encoding/emoji.md
  - content/6.maps/_computer/encoding/hash-collision.md
  - content/6.maps/_computer/network/network.md
  - content/6.maps/_computer/network/segments/http-request-example.md
  - content/6.maps/_computer/network/segments/http-response-example.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _computer domain entry file exists with proper frontmatter and subdomain navigation
    - computer.md moved to fundamentals/fundamentals.md as subdomain entry (renamed to avoid conflict)
    - encoding.md moved to encoding/encoding.md as subdomain entry, with existing emoji.md and hash-collision.md kept
    - network.md moved to network/network.md as subdomain entry, with segments/ nested underneath
    - segments/ directory relocated from root to under network/
    - original_path preserved in all moved file frontmatter
    - Internal links in encoding.md updated to new paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_computer/computer.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_computer/fundamentals/fundamentals.md
      provides: Computer fundamentals content as subdomain entry with original_path
    - path: content/6.maps/_computer/encoding/encoding.md
      provides: Encoding overview as subdomain entry with original_path
    - path: content/6.maps/_computer/encoding/emoji.md
      provides: Emoji encoding content (kept in place)
    - path: content/6.maps/_computer/encoding/hash-collision.md
      provides: Hash collision content (kept in place)
    - path: content/6.maps/_computer/network/network.md
      provides: Networking content as subdomain entry with original_path
    - path: content/6.maps/_computer/network/segments/http-request-example.md
      provides: HTTP request example (relocated from root segments/)
    - path: content/6.maps/_computer/network/segments/http-response-example.md
      provides: HTTP response example (relocated from root segments/)
  key_links:
    - from: content/6.maps/_computer/computer.md
      to: content/6.maps/_computer/fundamentals/fundamentals.md
      via: subdomain navigation link
    - from: content/6.maps/_computer/computer.md
      to: content/6.maps/_computer/encoding/encoding.md
      via: subdomain navigation link
    - from: content/6.maps/_computer/computer.md
      to: content/6.maps/_computer/network/network.md
      via: subdomain navigation link
    - from: content/6.maps/_computer/encoding/encoding.md
      to: content/6.maps/_computer/encoding/emoji.md
      via: internal topic link
    - from: content/6.maps/_computer/encoding/encoding.md
      to: content/6.maps/_computer/encoding/hash-collision.md
      via: internal topic link
    - from: content/6.maps/_computer/network/network.md
      to: content/6.maps/_computer/network/segments/http-request-example.md
      via: internal reference link
    - from: content/6.maps/_computer/network/network.md
      to: content/6.maps/_computer/network/segments/http-response-example.md
      via: internal reference link
    - from: content/6.maps/0.index.md
      to: new _computer domain paths
      via: updated cross-domain links
---

# Phase 9-04: Migrate _computer Domain (MED-14)

<objective>
Migrate the _computer domain to the 4-layer structure by creating a domain entry file and organizing content into three subdomains: fundamentals/, encoding/, and network/. The encoding/ subdirectory already exists and needs formalization. The computer.md file will be renamed to fundamentals.md to avoid naming conflict with the domain entry. The segments/ directory will be nested under network/ since it contains HTTP examples used exclusively by network.md.

Purpose: Establish consistent domain structure for computer science knowledge with clear subdomain separation for fundamentals, encoding, and networking. Preserve existing subdirectory structure while formalizing it according to 4-layer hierarchy.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_computer/computer.md
@content/6.maps/_computer/encoding.md
@content/6.maps/_computer/network.md
@content/6.maps/_computer/encoding/emoji.md
@content/6.maps/_computer/encoding/hash-collision.md
@content/6.maps/_computer/segments/http-request-example.md
@content/6.maps/_computer/segments/http-response-example.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _computer domain entry file</name>
  <files>content/6.maps/_computer/computer.md</files>
  <action>
Create content/6.maps/_computer/computer.md as the domain entry file with:
1. YAML frontmatter:
   - title: 计算机
   - description: 计算机科学知识图谱，涵盖组成原理、编码技术和计算机网络
2. ## 子领域 section with links to subdomains:
   * [计算机基础](/maps/_computer/fundamentals/fundamentals) - 进制转换、数字电路、原码反码补码
   * [编码](/maps/_computer/encoding/encoding) - 字符编码、图像编码、哈希算法
   * [计算机网络](/maps/_computer/network/network) - TCP/IP、HTTP、网络安全
3. ## 概述 section with brief domain overview mentioning:
   - Computer science fundamentals for software developers
   - Number systems and digital logic
   - Character encoding and data representation
   - Network protocols and communication
4. No existing content to preserve at domain root (creating new domain entry)
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create fundamentals subdomain and migrate content</name>
  <files>content/6.maps/_computer/fundamentals/fundamentals.md</files>
  <action>
1. Create directory content/6.maps/_computer/fundamentals/
2. Move original content/6.maps/_computer/computer.md to content/6.maps/_computer/fundamentals/fundamentals.md
3. Update frontmatter of moved file:
   - Change title from "Computer Mind Map" to "计算机基础"
   - Keep existing description
   - Add original_path: content/6.maps/_computer/computer.md
4. Preserve all original content including:
   - 进制 section with decimal to binary conversion
   - 数字电路 section with two's complement explanation
   - TODO section with reference link
  </action>
  <verify>
- Directory created
- File moved with content preserved
- Title updated to Chinese, original_path in frontmatter
  </verify>
  <done>Fundamentals subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Formalize encoding subdomain with entry file</name>
  <files>content/6.maps/_computer/encoding/encoding.md, content/6.maps/_computer/encoding/emoji.md, content/6.maps/_computer/encoding/hash-collision.md</files>
  <action>
1. Encoding directory already exists at content/6.maps/_computer/encoding/
2. Move original content/6.maps/_computer/encoding.md to content/6.maps/_computer/encoding/encoding.md
3. Update frontmatter of moved encoding.md to add:
   - original_path: content/6.maps/_computer/encoding.md
4. Update internal links in encoding.md:
   - Change `[Emoji](/maps/_computer/encoding/emoji)` (keep - already correct path)
   - Change `[哈希碰撞](/maps/_computer/encoding/hash-collision)` (keep - already correct path)
   - These links should already work since the target files are in the same directory
5. Preserve all original content in encoding.md including:
   - Encoding overview
   - Links to emoji and hash-collision subtopics
6. Existing emoji.md and hash-collision.md remain in place (no changes needed)
  </action>
  <verify>
- encoding.md moved to encoding/encoding.md
- original_path in encoding.md frontmatter
- Internal links verified
- emoji.md and hash-collision.md unchanged
  </verify>
  <done>Encoding subdomain formalized with entry file and metadata preserved</done>
</task>

<task type="auto">
  <name>Create network subdomain and migrate content with nested segments</name>
  <files>content/6.maps/_computer/network/network.md, content/6.maps/_computer/network/segments/http-request-example.md, content/6.maps/_computer/network/segments/http-response-example.md</files>
  <action>
1. Create directory content/6.maps/_computer/network/
2. Move original content/6.maps/_computer/network.md to content/6.maps/_computer/network/network.md
3. Create directory content/6.maps/_computer/network/segments/
4. Move content/6.maps/_computer/segments/http-request-example.md to content/6.maps/_computer/network/segments/http-request-example.md
5. Move content/6.maps/_computer/segments/http-response-example.md to content/6.maps/_computer/network/segments/http-response-example.md
6. Update frontmatter of moved files to add:
   - original_path: content/6.maps/_computer/network.md (for network.md)
   - original_path: content/6.maps/_computer/segments/http-request-example.md (for http-request-example.md)
   - original_path: content/6.maps/_computer/segments/http-response-example.md (for http-response-example.md)
7. Update internal links in network.md:
   - Change `./segments/http-request-example.html` to `./segments/http-request-example`
   - Change `./segments/http-response-example.html` to `./segments/http-response-example`
   - Remove .html extension (NuxtContent uses clean URLs)
8. Preserve all original content in network.md including:
   - Comprehensive networking guide (TCP/IP, HTTP, HTTPS, TLS, CDN)
   - Security sections
   - References to HTTP examples
9. Preserve all original content in HTTP example files
10. Remove empty content/6.maps/_computer/segments/ directory after files are moved
  </action>
  <verify>
- network/ directory created with network.md
- segments/ nested under network/ with both example files
- original_path in all moved files' frontmatter
- Internal links in network.md updated to remove .html extension
- Original segments/ directory removed
  </verify>
  <done>Network subdomain created with segments nested and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## 计算机 section in 0.index.md to point to new subdomain paths:
- `/maps/_computer/network` -> `/maps/_computer/network/network`
- `/maps/_computer/computer` -> `/maps/_computer/fundamentals/fundamentals`
- `/maps/_computer/encoding` -> `/maps/_computer/encoding/encoding`

Keep the link text (计算机网络, 组成原理, 编码) unchanged.
  </action>
  <verify>All 3 computer-related links in ## 计算机 section updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_computer/computer.md exists as domain entry with ## 子领域 section
- [ ] Domain entry has links to all three subdomains
- [ ] content/6.maps/_computer/fundamentals/fundamentals.md exists with original content
- [ ] content/6.maps/_computer/encoding/encoding.md exists with original content
- [ ] content/6.maps/_computer/encoding/emoji.md exists unchanged
- [ ] content/6.maps/_computer/encoding/hash-collision.md exists unchanged
- [ ] content/6.maps/_computer/network/network.md exists with original content
- [ ] content/6.maps/_computer/network/segments/http-request-example.md exists
- [ ] content/6.maps/_computer/network/segments/http-response-example.md exists
- [ ] All moved files have original_path in frontmatter
- [ ] Internal links in network.md updated (removed .html extension)
- [ ] Original content/6.maps/_computer/segments/ directory removed
- [ ] All 3 links in 0.index.md ## 计算机 section updated
</verification>

<success_criteria>
- _computer domain follows 4-layer structure with 3 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- Existing encoding/ subdirectory formalized with entry file
- segments/ directory successfully nested under network/
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/09-medium-batch-4/09-P04-SUMMARY.md`
</output>
