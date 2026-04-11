import { codeToHtml } from 'shiki'

interface HighlightRequest {
  code: string
  language?: string
  theme?: 'github-light' | 'github-dark'
  highlightLines?: number[]
}

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const body = await readBody<HighlightRequest>(event)
  if (!body?.code) {
    throw createError({ statusCode: 400, statusMessage: 'Missing code' })
  }

  const lines = new Set(body.highlightLines || [])
  const theme = body.theme || 'github-light'

  try {
    const html = await codeToHtml(body.code, {
      lang: body.language || 'text',
      theme,
      transformers: [
        {
          line(node, lineNumber) {
            if (lines.has(lineNumber)) {
              node.properties.class = `${node.properties.class || ''} line-highlight`.trim()
            }
            node.children.unshift({
              type: 'element',
              tagName: 'span',
              properties: { class: 'line-number' },
              children: [{ type: 'text', value: String(lineNumber) }],
            })
            return node
          },
        },
      ],
    })

    return { html }
  }
  catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Highlight failed: ${err?.message || 'unknown error'}`,
    })
  }
})
