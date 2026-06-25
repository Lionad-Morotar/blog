/**
 * 解析 RSS feed 封面图相关的工具函数
 *
 * 优先级：
 * 1. frontmatter 中的 image 字段
 * 2. 正文内容中第一张图片的 src
 * 3. 站点默认封面图（og:image）
 */

export interface CoverSource {
  url: string
  type: string
}

export interface ParsedContentLike {
  body?: string | Record<string, unknown> | unknown[]
  image?: string
  meta?: {
    image?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

const IMAGE_MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  avif: 'image/avif'
}

const DEFAULT_MIME_TYPE = 'image/jpeg'

/**
 * 根据图片 URL 的扩展名推断 MIME 类型
 * @param url 图片 URL
 * @returns MIME 类型
 */
export function inferImageMimeType(url: string): string {
  const match = url.match(/\.(\w+)(?:\?.*)?$/i)
  if (!match?.[1]) return DEFAULT_MIME_TYPE
  const ext = match[1].toLowerCase()
  return IMAGE_MIME_TYPES[ext] ?? DEFAULT_MIME_TYPE
}

/**
 * 将相对路径转换为绝对 URL
 * @param url 图片 URL，可能是相对路径或绝对 URL
 * @param baseUrl 站点 baseUrl，例如 https://lionad.art
 * @returns 绝对 URL
 */
export function toAbsoluteUrl(url: string, baseUrl: string): string {
  if (!url) return baseUrl
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url
  // protocol-relative URL: //cdn.example.com/foo.jpg -> https://cdn.example.com/foo.jpg
  if (url.startsWith('//')) {
    return `https:${url}`
  }
  const base = baseUrl.replace(/\/$/, '')
  const path = url.startsWith('/') ? url : `/${url}`
  return `${base}${path}`
}

interface AstNode {
  type?: string
  url?: string
  tag?: string
  props?: Record<string, unknown>
  children?: AstNode[]
  [key: string]: unknown
}

/**
 * 从 AST 节点中递归提取第一张图片的 src
 * 支持的格式：
 * - remark: { type: 'image', url: '...' }
 * - hast: { type: 'element', tag: 'img', props: { src: '...' } }
 * - minimark (Nuxt Content v3): { type: 'minimark', value: [['img', { src: '...' }], ...] }
 * @param node AST 节点
 * @returns 第一张图片的 src，如果没有则返回 null
 */
function extractFirstImageFromAst(node: AstNode | AstNode[] | unknown): string | null {
  if (!node) return null

  if (Array.isArray(node)) {
    // minimark 元素：['tag', { props }, ...children]
    // 需要与数组容器区分开：容器第一个元素通常也是数组
    if (node.length >= 2) {
      const [tag, props, ...children] = node as unknown[]
      const looksLikeElement = typeof tag === 'string'
        && (props !== null && typeof props === 'object' && !Array.isArray(props))

      if (looksLikeElement) {
        if (tag === 'img' && typeof (props as Record<string, unknown>).src === 'string') {
          return (props as Record<string, unknown>).src as string
        }
        // 否则递归子节点
        for (const child of children) {
          const found = extractFirstImageFromAst(child)
          if (found) return found
        }
        return null
      }
    }

    // 普通数组容器：逐个遍历
    for (const child of node) {
      const found = extractFirstImageFromAst(child)
      if (found) return found
    }
    return null
  }

  if (typeof node !== 'object') return null

  const n = node as AstNode

  // minimark root: { type: 'minimark', value: [...] }
  if (n.type === 'minimark' && Array.isArray(n.value)) {
    return extractFirstImageFromAst(n.value)
  }

  // remark image node: { type: 'image', url: '...' }
  if (n.type === 'image' && typeof n.url === 'string') {
    return n.url
  }

  // hast img element: { type: 'element', tag: 'img', props: { src: '...' } }
  if (n.type === 'element' && n.tag === 'img' && typeof n.props?.src === 'string') {
    return n.props.src
  }

  // 递归遍历 children
  if (n.children) {
    const found = extractFirstImageFromAst(n.children)
    if (found) return found
  }

  return null
}

/**
 * 从 Markdown/HTML 字符串或 AST 中提取第一张图片的 src
 * @param body 正文内容字符串或 AST
 * @returns 第一张图片的 src，如果没有则返回 null
 */
export function extractFirstImage(body: string | Record<string, unknown> | unknown[] | undefined): string | null {
  if (!body) return null

  // 字符串：使用正则匹配 Markdown 和 HTML 图片
  if (typeof body === 'string') {
    // 匹配 Markdown 图片语法 ![alt](src "title")
    const markdownMatch = body.match(/!\[[^\]]*\]\(([^\s")]+)(?:\s+["'][^"']*["'])?\)/)
    if (markdownMatch?.[1]) return markdownMatch[1]

    // 匹配 HTML img 标签
    const htmlMatch = body.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
    if (htmlMatch?.[1]) return htmlMatch[1]

    return null
  }

  // 对象或数组：按 AST 递归遍历
  return extractFirstImageFromAst(body as AstNode | AstNode[])
}

/**
 * 按优先级解析文章封面图
 * @param raw Nuxt Content 解析后的内容对象
 * @param defaultCover 站点默认封面 URL
 * @param baseUrl 站点 baseUrl
 * @returns 封面图源对象，如果没有任何来源则返回 null
 */
export function resolveCoverImage(
  raw: ParsedContentLike,
  defaultCover: string,
  baseUrl: string
): CoverSource | null {
  const candidates = [
    raw.image,
    raw.meta?.image,
    extractFirstImage(raw.body)
  ].filter(Boolean) as string[]

  const url = candidates[0] ?? defaultCover
  if (!url) return null

  const absoluteUrl = toAbsoluteUrl(url, baseUrl)
  return {
    url: absoluteUrl,
    type: inferImageMimeType(absoluteUrl)
  }
}
