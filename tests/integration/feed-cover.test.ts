import { describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const OUTPUT_DIR = resolve('.output/public')

describe('feed cover image integration', () => {
  it('generates RSS feed with enclosure for cover images', { timeout: 300000 }, () => {
    // 触发静态生成以产出 feed 文件
    execSync('pnpm generate', {
      cwd: process.cwd(),
      stdio: 'pipe',
      timeout: 300000
    })

    const feedXmlPath = resolve(OUTPUT_DIR, 'feed.xml')
    expect(existsSync(feedXmlPath)).toBe(true)

    const feedXml = readFileSync(feedXmlPath, 'utf-8')
    expect(feedXml).toContain('<enclosure')
    expect(feedXml).toContain('https://lionad.art/images/cover-placeholder.png')

    // 至少有一篇文章使用了正文图片（project-river 的第一张图）
    expect(feedXml).toContain('https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260423104444299.png')
  })

  it('generates Atom feed with equivalent enclosure links', { timeout: 300000 }, () => {
    const feedAtomPath = resolve(OUTPUT_DIR, 'feed.atom')
    expect(existsSync(feedAtomPath)).toBe(true)

    const feedAtom = readFileSync(feedAtomPath, 'utf-8')
    expect(feedAtom).toContain('rel="enclosure"')
    expect(feedAtom).toContain('https://lionad.art/images/cover-placeholder.png')
  })

  it('generates JSON feed with equivalent image fields', { timeout: 300000 }, () => {
    const feedJsonPath = resolve(OUTPUT_DIR, 'feed.json')
    expect(existsSync(feedJsonPath)).toBe(true)

    const feedJson = readFileSync(feedJsonPath, 'utf-8')
    expect(feedJson).toContain('"image"')
    expect(feedJson).toContain('https://lionad.art/images/cover-placeholder.png')
  })
})
