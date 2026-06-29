#!/usr/bin/env node
/**
 * Markdown 行长度检查与自动截断脚本。
 *
 * 规则：单行（去除行首缩进后）不超过 120 个字符；超过时优先在中文标点处截断，
 * 其次在英文标点处截断；均无时在长度限制处硬截断。修复会保持原始缩进，
 * 并跳过 frontmatter、代码块、表格、HTML 块等结构化内容。
 */
import { readFile, writeFile } from 'node:fs/promises'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const MAX_LENGTH = 120

// 中文标点优先级高于英文标点
const CHINESE_PUNCTUATION = new Set('，。、；：！？（）「」『』“”‘’【】《》…—～')
const ENGLISH_PUNCTUATION = new Set(',.;:!?()[]"\'')

const args = process.argv.slice(2)
const { flags, files: explicitFiles } = parseArgs(args)
const shouldFix = flags.has('--fix')
const checkAll = flags.has('--all')
const checkStaged = flags.has('--staged')

/**
 * 把命令行参数拆为 flag 集合与文件列表。
 *
 * flag 可出现在任意位置；遇到 `--` 终止符后，其后的 token 一律视为文件路径
 * （即便以 -- 开头），与主流 CLI 约定一致。修复了历史上「文件在前、flag 在后」
 * 时 flag 被错误吞入文件列表的 bug。
 */
export function parseArgs(argv) {
  const flags = new Set()
  const files = []
  let onlyFiles = false

  for (const arg of argv) {
    if (onlyFiles) {
      files.push(arg)
    } else if (arg === '--') {
      onlyFiles = true
    } else if (arg.startsWith('--')) {
      flags.add(arg)
    } else {
      files.push(arg)
    }
  }

  return { flags, files }
}

async function resolveFiles() {
  if (explicitFiles.length > 0) return explicitFiles

  if (checkStaged) {
    const staged = execSync('git diff --name-only --staged', { encoding: 'utf8' })
    return staged.split('\n').filter(f => isMarkdown(f) && !isExcluded(f))
  }

  if (checkAll) {
    const all = execSync('git ls-files', { encoding: 'utf8' })
    return all.split('\n').filter(f => isMarkdown(f) && !isExcluded(f))
  }

  // 默认：检查工作区中新增或修改的 md 文件
  const modified = execSync('git status --short', { encoding: 'utf8' })
  return modified
    .split('\n')
    .map(line => line.slice(3).trim())
    .filter(f => isMarkdown(f) && !isExcluded(f))
}

export function isMarkdown(filePath) {
  return filePath && filePath.endsWith('.md')
}

// 生成产物目录：内容会被工具重建覆盖，lint 它既无意义又会制造噪音 diff
const EXCLUDED_DIRS = ['graphify-out/']

export function isExcluded(filePath) {
  const normalized = filePath.replace(/^\.\//, '')
  return EXCLUDED_DIRS.some(dir => normalized.startsWith(dir))
}

export function isFrontmatterStart(text) {
  return text.trim() === '---'
}

export function isCodeFence(text) {
  return text.startsWith('```')
}

export function isTableRow(text) {
  return text.trim().startsWith('|')
}

export function isHtmlBlock(text) {
  const trimmed = text.trim()
  return /^<[\w-]+/.test(trimmed) || /^<\/[\w-]+>/.test(trimmed)
}

export function isHeading(text) {
  return /^#{1,6}\s/.test(text)
}

// 引用块（> 开头）：内容多为他人原文，断行会丢失 > 前缀并改变渲染，故跳过
export function isBlockquote(text) {
  return /^>/.test(text.trimStart())
}

export function containsUrl(text) {
  return /https?:\/\/[^\s]+/.test(text)
}

/**
 * 提取行首缩进与剩余文本。
 */
export function splitIndent(text) {
  const match = text.match(/^(\s*)/)
  return { indent: match ? match[1] : '', content: text.slice(match ? match[1].length : 0) }
}

/**
 * 在 maxLength 限制内寻找最佳截断位置。
 * 优先中文标点，其次英文标点，最后硬截断。
 */
export function findBreakPoint(text, maxLength) {
  const searchEnd = Math.min(maxLength, text.length)

  // 1. 中文标点
  for (let i = searchEnd - 1; i > 0; i--) {
    if (CHINESE_PUNCTUATION.has(text[i])) return i + 1
  }

  // 2. 英文标点
  for (let i = searchEnd - 1; i > 0; i--) {
    if (ENGLISH_PUNCTUATION.has(text[i])) {
      // 撇号夹在字母之间是单词内部（don't / it's），断开会破坏单词
      if (text[i] === "'" && /\w/.test(text[i - 1]) && /\w/.test(text[i + 1] || '')) continue
      return i + 1
    }
  }

  // 3. 硬截断：尽量避开 ASCII 单词中间；用 ||'' 防止越界访问被 /\w/ 误判
  // （/\w/.test(undefined) 为 true，会使短文本的 hardBreak 错误回退到底）
  let hardBreak = searchEnd
  while (hardBreak > 1 && /\w/.test(text[hardBreak - 1] || '') && /\w/.test(text[hardBreak] || '')) {
    hardBreak--
  }
  // 整段连续无单词边界而回退到底时，在限制处硬切，避免切出退化的单字符行
  return hardBreak <= 1 ? searchEnd : hardBreak
}

/**
 * 将一行文本按规则截断为多行，保持缩进。
 */
export function wrapLine(text, indent) {
  const results = []
  let remaining = text

  while (remaining.length > MAX_LENGTH) {
    const breakPoint = findBreakPoint(remaining, MAX_LENGTH)
    // 防止没有任何进展导致死循环
    if (breakPoint <= 0) {
      results.push(remaining.slice(0, MAX_LENGTH))
      remaining = remaining.slice(MAX_LENGTH)
      continue
    }
    results.push(remaining.slice(0, breakPoint))
    remaining = remaining.slice(breakPoint).trimStart()
  }

  if (remaining.length > 0) results.push(remaining)
  return results.map(part => indent + part)
}

/**
 * 处理单个文件，返回发现的超长行信息；fix 为 true 时同步写回截断结果。
 *
 * fix 通过参数注入而非读取模块级状态，使该函数可被独立测试。
 */
export async function processFile(filePath, { fix = false } = {}) {
  const absolutePath = path.resolve(filePath)
  const content = await readFile(absolutePath, 'utf8')
  const lines = content.split(/\r?\n/)

  let inFrontmatter = false
  let frontmatterClosed = false
  let inCodeBlock = false
  const longLines = []
  const wrappedLines = []

  for (let index = 0; index < lines.length; index++) {
    const raw = lines[index]

    // frontmatter 必须起于文件首行（YAML 约定），避免正文 --- 水平分隔线被误判为边界
    if (!inFrontmatter && !frontmatterClosed && index === 0 && isFrontmatterStart(raw)) {
      inFrontmatter = true
      wrappedLines.push(raw)
      continue
    }

    if (inFrontmatter && isFrontmatterStart(raw)) {
      inFrontmatter = false
      frontmatterClosed = true
      wrappedLines.push(raw)
      continue
    }

    if (inFrontmatter) {
      wrappedLines.push(raw)
      continue
    }

    if (isCodeFence(raw)) {
      inCodeBlock = !inCodeBlock
      wrappedLines.push(raw)
      continue
    }

    if (inCodeBlock || isTableRow(raw) || isHtmlBlock(raw) || isHeading(raw) || isBlockquote(raw) || raw.trim() === '') {
      wrappedLines.push(raw)
      continue
    }

    const { indent, content: lineContent } = splitIndent(raw)

    // 包含 URL 的行无法安全截断，跳过不报告
    if (containsUrl(lineContent)) {
      wrappedLines.push(raw)
      continue
    }

    if (lineContent.length <= MAX_LENGTH) {
      wrappedLines.push(raw)
      continue
    }

    longLines.push({ line: index + 1, length: lineContent.length, text: raw })

    if (fix) {
      wrappedLines.push(...wrapLine(lineContent, indent))
    } else {
      wrappedLines.push(raw)
    }
  }

  if (fix && longLines.length > 0) {
    // 保留文件原始行尾：用 \r?\n 容错读入，写回时按原 EOL 拼接，避免 CRLF 被悄悄改成 LF
    const eol = content.includes('\r\n') ? '\r\n' : '\n'
    const suffix = content.endsWith(eol) ? eol : ''
    await writeFile(absolutePath, wrappedLines.join(eol) + suffix, 'utf8')
  }

  return { filePath, longLines }
}

async function main() {
  const files = await resolveFiles()

  if (files.length === 0) {
    console.log('未发现需要检查的 Markdown 文件。')
    process.exit(0)
  }

  const results = []
  for (const file of files) {
    try {
      results.push(await processFile(file, { fix: shouldFix }))
    } catch (error) {
      console.error(`无法处理 ${file}: ${error.message}`)
      process.exitCode = 1
    }
  }

  const filesWithIssues = results.filter(r => r.longLines.length > 0)
  const totalIssues = filesWithIssues.reduce((sum, r) => sum + r.longLines.length, 0)

  if (totalIssues === 0) {
    console.log(`已检查 ${files.length} 个 Markdown 文件，未发现超长行。`)
    process.exit(0)
  }

  if (shouldFix) {
    console.log(`已修复 ${filesWithIssues.length} 个文件，共 ${totalIssues} 处超长行。`)
  } else {
    console.error(`发现 ${filesWithIssues.length} 个文件存在 ${totalIssues} 处超长行（限制 ${MAX_LENGTH}）：`)
    for (const { filePath, longLines } of filesWithIssues) {
      for (const issue of longLines) {
        console.error(`  ${filePath}:${issue.line} (${issue.length} 字符)`)
      }
    }
    process.exitCode = 1
  }
}

// 守卫：被测试 import 时不自动执行 main，仅作为脚本入口时运行
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
