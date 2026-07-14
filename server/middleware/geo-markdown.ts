import { createError, defineEventHandler, getRequestHeader, getRequestURL, send, setHeader, type H3Event } from 'h3'

interface AcceptMedia {
  type: string
  subtype: string
  q: number
}

/**
 * 解析 HTTP Accept 头为带 q 值的媒体类型列表。
 *
 * 支持显式类型（text/html）、子类型通配（text/星号）和全局通配（星号/星号）。
 */
function parseAccept(accept: string): AcceptMedia[] {
  if (!accept.trim()) return []

  return accept.split(',').map((part) => {
    const [media = '', ...params] = part.trim().split(';')
    const [rawType = '', rawSubtype = ''] = media.split('/')
    const type = rawType.trim().toLowerCase()
    const subtype = rawSubtype.trim().toLowerCase()
    let q = 1
    for (const param of params) {
      const [key = '', value = ''] = param.split('=')
      const normalizedKey = key.trim().toLowerCase()
      const normalizedValue = value.trim().toLowerCase()
      if (normalizedKey === 'q') {
        q = Number.parseFloat(normalizedValue)
        if (Number.isNaN(q)) q = 0
      }
    }
    return { type, subtype, q }
  })
}

/**
 * 计算指定 MIME 类型在 Accept 头中的有效 q 值。
 *
 * 匹配顺序：显式类型 > 子类型通配 > 全局通配。
 */
function effectiveQ(parsed: AcceptMedia[], targetType: string, targetSubtype: string): number {
  let q = -1
  for (const media of parsed) {
    if (media.type === targetType && media.subtype === targetSubtype) {
      q = Math.max(q, media.q)
    } else if (media.type === targetType && media.subtype === '*') {
      q = Math.max(q, media.q)
    } else if (media.type === '*' && media.subtype === '*') {
      q = Math.max(q, media.q)
    }
  }
  return q
}

/**
 * 根据请求路径与 Accept 头判断客户端是否想要 Markdown 响应。
 */
function wantsMarkdown(event: H3Event): { wants: boolean, unsupported: boolean } {
  const pathname = getRequestURL(event).pathname

  // 1. 直接请求 .md 路由：始终返回 Markdown
  if (pathname.endsWith('.md')) {
    return { wants: true, unsupported: false }
  }

  // 2. 基于 Accept 头内容协商
  const accept = getRequestHeader(event, 'accept') || ''
  const trimmedAccept = accept.trim()

  // Accept 头为空或未指定可接受类型时，默认返回 HTML
  if (!trimmedAccept) {
    return { wants: false, unsupported: false }
  }

  const parsed = parseAccept(trimmedAccept)
  const mdQ = effectiveQ(parsed, 'text', 'markdown')
  const htmlQ = effectiveQ(parsed, 'text', 'html')

  if (mdQ >= 0 || htmlQ >= 0) {
    return { wants: mdQ >= 0 && mdQ >= htmlQ, unsupported: false }
  }

  // 客户端既不接受 text/html 也不接受 text/markdown
  return { wants: false, unsupported: true }
}

/**
 * 将内容页路径转换为对应的 Markdown 同源 URL。
 */
function getMarkdownUrl(pathname: string): string {
  const base = pathname === '/' ? '/index' : pathname.replace(/\/$/, '')
  return `${base}.md`
}

/**
 * GEO Markdown 中间件：为每个 Nuxt Content 页面提供 .md 同源路由，
 * 并基于 Accept 头实现 text/markdown 与 text/html 的内容协商。
 */
export default defineEventHandler(async (event) => {
  // 只处理 GET/HEAD 请求
  if (!['GET', 'HEAD'].includes(event.method)) return

  const pathname = getRequestURL(event).pathname

  // 跳过 API、内部路由、静态 feeds 与 LLMs 索引本身
  if (
    pathname.startsWith('/api/')
    || pathname.startsWith('/_')
    || pathname.startsWith('/__')
    || pathname.startsWith('/raw/')
    || pathname === '/robots.txt'
    || pathname === '/sitemap.xml'
    || pathname === '/llms.txt'
    || pathname === '/llms-full.txt'
    || pathname.startsWith('/feed')
  ) {
    return
  }

  const { wants, unsupported } = wantsMarkdown(event)

  // 所有响应都声明随 Accept 变化
  setHeader(event, 'Vary', 'Accept')

  if (unsupported) {
    throw createError({
      statusCode: 406,
      statusMessage: 'Not Acceptable',
      message: 'This resource is available as text/html or text/markdown only.'
    })
  }

  if (!wants) {
    // 返回 HTML：声明 Markdown 同源版本，再交由 Nuxt 页面渲染管线继续处理
    const mdUrl = getMarkdownUrl(pathname)
    setHeader(event, 'Link', `<${mdUrl}>; rel="alternate"; type="text/markdown"`)
    return
  }

  // 构造 /raw 路径，复用 Nuxt Content 的 markdown 序列化
  const mdPath = pathname.endsWith('.md') ? pathname : `${pathname}.md`
  const rawPath = `/raw${mdPath}`

  try {
    const markdown = await event.$fetch(rawPath) as string
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    return send(event, markdown)
  } catch (err) {
    if (isH3Error(err) && err.statusCode === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
    throw err
  }
})

function isH3Error(err: unknown): err is { statusCode: number } {
  return typeof err === 'object'
    && err !== null
    && 'statusCode' in err
    && typeof (err as { statusCode: unknown }).statusCode === 'number'
}
