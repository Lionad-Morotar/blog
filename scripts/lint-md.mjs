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

const MAX_LENGTH = 120

// 中文标点优先级高于英文标点
const CHINESE_PUNCTUATION = new Set('，。、；：！？（）「」『』“”‘’【】《》…—～')
const ENGLISH_PUNCTUATION = new Set(',.;:!?()[]"\'')

const args = process.argv.slice(2)
const shouldFix = args.includes('--fix')
const checkAll = args.includes('--all')
const checkStaged = args.includes('--staged')
const fileArgsStart = args.findIndex(arg => !arg.startsWith('--'))
const explicitFiles = fileArgsStart >= 0 ? args.slice(fileArgsStart) : []

async function resolveFiles() {
  if (explicitFiles.length > 0) return explicitFiles

  if (checkStaged) {
    const staged = execSync('git diff --name-only --staged', { encoding: 'utf8' })
    return staged.split('\n').filter(isMarkdown)
  }

  if (checkAll) {
    const all = execSync('git ls-files', { encoding: 'utf8' })
    return all.split('\n').filter(isMarkdown)
  }

  // 默认：检查工作区中新增或修改的 md 文件
  const modified = execSync('git status --short', { encoding: 'utf8' })
  return modified
    .split('\n')
    .map(line => line.slice(3).trim())
    .filter(isMarkdown)
}

function isMarkdown(filePath) {
  return filePath && filePath.endsWith('.md')
}

function isFrontmatterStart(text) {
  return text.trim() === '---'
}

function isCodeFence(text) {
  return text.startsWith('```')
}

function isTableRow(text) {
  return text.trim().startsWith('|')
}

function isHtmlBlock(text) {
  const trimmed = text.trim()
  return /^<[\w-]+/.test(trimmed) || /^<\/[\w-]+>/.test(trimmed)
}

function isHeading(text) {
  return /^#{1,6}\s/.test(text)
}

function containsUrl(text) {
  return /https?:\/\/[^\s]+/.test(text)
}

/**
 * 提取行首缩进与剩余文本。
 */
function splitIndent(text) {
  const match = text.match(/^(\s*)/)
  return { indent: match ? match[1] : '', content: text.slice(match ? match[1].length : 0) }
}

/**
 * 在 maxLength 限制内寻找最佳截断位置。
 * 优先中文标点，其次英文标点，最后硬截断。
 */
function findBreakPoint(text, maxLength) {
  const searchEnd = Math.min(maxLength, text.length)

  // 1. 中文标点
  for (let i = searchEnd - 1; i > 0; i--) {
    if (CHINESE_PUNCTUATION.has(text[i])) return i + 1
  }

  // 2. 英文标点
  for (let i = searchEnd - 1; i > 0; i--) {
    if (ENGLISH_PUNCTUATION.has(text[i])) return i + 1
  }

  // 3. 硬截断：尽量避开 ASCII 单词中间
  let hardBreak = searchEnd
  while (hardBreak > 1 && /\w/.test(text[hardBreak - 1]) && /\w/.test(text[hardBreak])) {
    hardBreak--
  }
  return hardBreak
}

/**
 * 将一行文本按规则截断为多行，保持缩进。
 */
function wrapLine(text, indent) {
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
 * 处理单个文件，返回是否成功以及发现的超长行信息。
 */
async function processFile(filePath) {
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

    if (!frontmatterClosed && isFrontmatterStart(raw)) {
      if (!inFrontmatter) {
        inFrontmatter = true
        wrappedLines.push(raw)
        continue
      }
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

    if (inCodeBlock || isTableRow(raw) || isHtmlBlock(raw) || isHeading(raw) || raw.trim() === '') {
      wrappedLines.push(raw)
      continue
    }

    const { indent, content } = splitIndent(raw)

    // 包含 URL 的行无法安全截断，跳过不报告
    if (containsUrl(content)) {
      wrappedLines.push(raw)
      continue
    }

    if (content.length <= MAX_LENGTH) {
      wrappedLines.push(raw)
      continue
    }

    longLines.push({ line: index + 1, length: content.length, text: raw })

    if (shouldFix) {
      wrappedLines.push(...wrapLine(content, indent))
    } else {
      wrappedLines.push(raw)
    }
  }

  if (shouldFix && longLines.length > 0) {
    await writeFile(absolutePath, wrappedLines.join('\n') + (content.endsWith('\n') ? '\n' : ''), 'utf8')
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
      results.push(await processFile(file))
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

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
