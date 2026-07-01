import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  parseArgs,
  splitIndent,
  findBreakPoint,
  wrapLine,
  isFrontmatterStart,
  isCodeFence,
  isTableRow,
  isHtmlBlock,
  isHeading,
  containsUrl,
  isExcluded,
  processFile
} from '../../scripts/lint-md.mjs'

const MAX_LENGTH = 120

// 构造超过长度限制的中文段落：默认产出一段远超 120 字符、含中文逗号的文本
const longChinese = (chunks = 50) => `${'字'.repeat(100)}，${'字'.repeat(chunks)}`

let dir: string
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), 'lint-md-'))
})
afterEach(async () => {
  await rm(dir, { recursive: true, force: true })
})

async function writeMd(name: string, content: string): Promise<string> {
  const filePath = path.join(dir, name)
  await writeFile(filePath, content, 'utf8')
  return filePath
}

describe('parseArgs', () => {
  it('flag 出现在文件之前', () => {
    expect(parseArgs(['--fix', 'a.md'])).toEqual({ flags: new Set(['--fix']), files: ['a.md'] })
  })

  it('flag 出现在文件之后（历史 bug 回归守护）', () => {
    // 旧实现会把 --fix 吞进文件列表；修复后 flag 可在任意位置
    expect(parseArgs(['a.md', '--fix'])).toEqual({ flags: new Set(['--fix']), files: ['a.md'] })
  })

  it('多个文件与 flag 交替出现', () => {
    expect(parseArgs(['a.md', '--fix', 'b.md', '--all'])).toEqual({
      flags: new Set(['--fix', '--all']),
      files: ['a.md', 'b.md']
    })
  })

  it('仅 flag 无文件', () => {
    expect(parseArgs(['--all'])).toEqual({ flags: new Set(['--all']), files: [] })
  })

  it('空参数', () => {
    expect(parseArgs([])).toEqual({ flags: new Set(), files: [] })
  })

  it('-- 终止符之后的 token 一律视为文件（即便以 -- 开头）', () => {
    expect(parseArgs(['a.md', '--', '--fix', '--weird-name.md'])).toEqual({
      flags: new Set(),
      files: ['a.md', '--fix', '--weird-name.md']
    })
  })
})

describe('splitIndent', () => {
  it('提取空格缩进', () => {
    expect(splitIndent('  text')).toEqual({ indent: '  ', content: 'text' })
  })

  it('提取 tab 缩进', () => {
    expect(splitIndent('\ttext')).toEqual({ indent: '\t', content: 'text' })
  })

  it('无缩进', () => {
    expect(splitIndent('text')).toEqual({ indent: '', content: 'text' })
  })
})

describe('findBreakPoint', () => {
  it('优先在中文标点后断开', () => {
    const text = `${'字'.repeat(100)}，${'字'.repeat(50)}`
    // 中文逗号位于 index 100，断点应在逗号之后（101）
    expect(findBreakPoint(text, MAX_LENGTH)).toBe(101)
  })

  it('无中文标点时在英文标点后断开', () => {
    const text = `${'a'.repeat(115)},${'b'.repeat(40)}`
    expect(findBreakPoint(text, MAX_LENGTH)).toBe(116)
  })

  it('中英文标点皆无时走硬截断', () => {
    const text = '字'.repeat(200)
    // 纯中文不匹配 \w，硬截断直接落在长度限制处
    expect(findBreakPoint(text, MAX_LENGTH)).toBe(MAX_LENGTH)
  })

  it('文本短于限制时返回文本长度', () => {
    expect(findBreakPoint('short', MAX_LENGTH)).toBe(5)
  })
})

describe('wrapLine', () => {
  it('将超长中文行断为多行，每行不超过限制且保持缩进', () => {
    const text = longChinese(100)
    const result = wrapLine(text, '  ')
    expect(result.length).toBeGreaterThan(1)
    for (const line of result) {
      expect(line.startsWith('  ')).toBe(true)
      expect(line.slice(2).length).toBeLessThanOrEqual(MAX_LENGTH)
    }
  })

  it('在中文标点处优先断句', () => {
    const text = `${'字'.repeat(100)}，${'字'.repeat(100)}`
    const result = wrapLine(text, '')
    // 第一行应在首个中文逗号后断开
    expect(result[0]).toBe(`${'字'.repeat(100)}，`)
  })

  it('长度恰好等于限制时不拆分', () => {
    const text = '字'.repeat(MAX_LENGTH)
    expect(wrapLine(text, '')).toEqual([text])
  })

  it('长度恰好等于限制加一时拆分为两行', () => {
    const text = '字'.repeat(MAX_LENGTH + 1)
    const result = wrapLine(text, '')
    expect(result.length).toBe(2)
    expect(result[0]).toBe('字'.repeat(MAX_LENGTH))
  })

  it('结果是幂等的：对输出再次 wrap 不会继续拆分', () => {
    const text = longChinese(100)
    const once = wrapLine(text, '')
    const twice = once.flatMap(line => wrapLine(line, ''))
    expect(twice).toEqual(once)
  })

  it('不会死循环：连续 ASCII 无标点长串在限制处硬切，不退化成单字符行', () => {
    // 历史缺陷：整段连续 \w 无边界时硬截断会回退到底，切出 200 个单字符行
    const result = wrapLine('a'.repeat(200), '')
    expect(result.length).toBeLessThanOrEqual(2)
    for (const line of result) {
      expect(line.length).toBeLessThanOrEqual(MAX_LENGTH)
    }
  })
})

describe('行类型判定', () => {
  it('isFrontmatterStart', () => {
    expect(isFrontmatterStart('---')).toBe(true)
    expect(isFrontmatterStart('--- ')).toBe(true)
    expect(isFrontmatterStart('----')).toBe(false)
    expect(isFrontmatterStart('# title')).toBe(false)
  })

  it('isCodeFence', () => {
    expect(isCodeFence('```js')).toBe(true)
    expect(isCodeFence('```')).toBe(true)
    expect(isCodeFence('const x = 1')).toBe(false)
  })

  it('isTableRow', () => {
    expect(isTableRow('| a | b |')).toBe(true)
    expect(isTableRow('  | a |')).toBe(true)
    expect(isTableRow('plain text')).toBe(false)
  })

  it('isHtmlBlock', () => {
    expect(isHtmlBlock('<div>')).toBe(true)
    expect(isHtmlBlock('</div>')).toBe(true)
    expect(isHtmlBlock('<my-tag attr="x">')).toBe(true)
    expect(isHtmlBlock('plain text')).toBe(false)
  })

  it('isHeading', () => {
    expect(isHeading('# title')).toBe(true)
    expect(isHeading('###### deep')).toBe(true)
    expect(isHeading('####### too many')).toBe(false)
    expect(isHeading('plain text')).toBe(false)
    expect(isHeading('#无空格')).toBe(false)
  })

  it('containsUrl', () => {
    expect(containsUrl('see http://example.com')).toBe(true)
    expect(containsUrl('https://x.com/y')).toBe(true)
    expect(containsUrl('plain text')).toBe(false)
  })
})

describe('isExcluded', () => {
  it('排除生成产物目录 graphify-out', () => {
    expect(isExcluded('graphify-out/GRAPH_REPORT.md')).toBe(true)
    expect(isExcluded('./graphify-out/x.md')).toBe(true)
  })

  it('不排除正常内容目录', () => {
    expect(isExcluded('content/a.md')).toBe(false)
    expect(isExcluded('docs/plans/x.md')).toBe(false)
  })
})

describe('processFile', () => {
  it('fix 关闭时报告超长行但不写回', async () => {
    const file = await writeMd('a.md', `---\ntitle: t\n---\n\n${longChinese(100)}\n`)
    const before = await import('node:fs/promises').then(m => m.readFile(file, 'utf8'))
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(1)
    const after = await import('node:fs/promises').then(m => m.readFile(file, 'utf8'))
    expect(after).toBe(before) // 未写回
  })

  it('fix 开启时写回截断结果，且每行不超过限制', async () => {
    const file = await writeMd('a.md', `${longChinese(100)}\n`)
    await processFile(file, { fix: true })
    const { readFile } = await import('node:fs/promises')
    const lines = (await readFile(file, 'utf8')).split(/\r?\n/)
    for (const line of lines) {
      if (line.length > 0) expect(line.length).toBeLessThanOrEqual(MAX_LENGTH)
    }
  })

  it('跳过 frontmatter 内的超长行', async () => {
    const file = await writeMd('a.md', `---\n${'字'.repeat(200)}\n---\n\nshort\n`)
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(0)
  })

  it('跳过代码块内的超长行', async () => {
    const file = await writeMd('a.md', '```js\n' + 'a'.repeat(200) + '\n```\n')
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(0)
  })

  it('跳过表格、HTML 块、标题、含 URL 的超长行', async () => {
    const file = await writeMd('a.md', [
      '| ' + 'x'.repeat(200) + ' |',
      '<div ' + 'a'.repeat(200) + '>',
      '# ' + '字'.repeat(200),
      'see ' + 'http://example.com/' + 'x'.repeat(200),
      ''
    ].join('\n'))
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(0)
  })

  it('列表项超长行被修复且缩进保持，续行缩进到标记宽度以维持列表结构', async () => {
    const file = await writeMd('a.md', `- ${'字'.repeat(200)}\n`)
    await processFile(file, { fix: true })
    const { readFile } = await import('node:fs/promises')
    const lines = (await readFile(file, 'utf8')).split(/\r?\n/).filter(l => l.length > 0)
    expect(lines[0].startsWith('- ')).toBe(true)
    // 续行须缩进到列表标记后的内容列，否则脱离列表变普通段落
    for (let i = 1; i < lines.length; i++) {
      expect(lines[i].startsWith('  ')).toBe(true)
    }
    // 按脚本语义校验：去行首缩进后的内容不超过限制（续行缩进不计入）
    for (const line of lines) {
      expect(splitIndent(line).content.length).toBeLessThanOrEqual(MAX_LENGTH)
    }
  })

  it('幂等：修复后再次检查不再报告超长行', async () => {
    const file = await writeMd('a.md', `${longChinese(100)}\n${longChinese(80)}\n`)
    await processFile(file, { fix: true })
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(0)
  })

  it('无 frontmatter 文件中，正文 --- 不被误判为 frontmatter 边界', async () => {
    // 历史缺陷：正文首个 --- 被当成 frontmatter 开始，其后超长行被整段跳过
    const file = await writeMd('a.md', `intro\n\n---\n\n${longChinese(100)}\n`)
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(1)
  })

  it('CRLF 行尾在 fix 写回时被保留', async () => {
    const file = await writeMd('a.md', `${longChinese(100)}\r\n`)
    await processFile(file, { fix: true })
    const { readFile } = await import('node:fs/promises')
    const after = await readFile(file, 'utf8')
    expect(after).toContain('\r\n')
    for (const line of after.split('\r\n')) {
      if (line.length > 0) expect(line.length).toBeLessThanOrEqual(MAX_LENGTH)
    }
  })

  it('blockquote（> 开头）超长行被跳过，不破坏引用结构', async () => {
    // 引用原文断行会丢失 > 前缀、改变渲染，故跳过
    const file = await writeMd('a.md', `> ${'word '.repeat(40)}end\n`)
    const { longLines } = await processFile(file, { fix: false })
    expect(longLines).toHaveLength(0)
  })

  it('含撇号的超长行 fix 后，撇号不在单词中间被断开', async () => {
    // don't 落在前 120 字符内且为唯一英文标点，迫使断点决策面对撇号
    const text = `${'x'.repeat(110)} don't ${'word '.repeat(10)}`
    const file = await writeMd('a.md', `${text}\n`)
    await processFile(file, { fix: true })
    const { readFile } = await import('node:fs/promises')
    const after = await readFile(file, 'utf8')
    expect(after).toContain('don\'t')
    expect(after).not.toMatch(/don'\s*\r?\n/)
  })
})
