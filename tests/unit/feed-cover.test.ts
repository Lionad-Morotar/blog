import { describe, expect, it } from 'vitest'
import {
  extractFirstImage,
  inferImageMimeType,
  resolveCoverImage,
  toAbsoluteUrl
} from '../../server/utils/feed-cover'

const BASE_URL = 'https://lionad.art'
const DEFAULT_COVER = '/images/cover-placeholder.png'

const ABSOLUTE_DEFAULT_COVER = 'https://lionad.art/images/cover-placeholder.png'

describe('inferImageMimeType', () => {
  it('returns image/jpeg for jpg', () => {
    expect(inferImageMimeType('https://example.com/foo.jpg')).toBe('image/jpeg')
  })

  it('returns image/jpeg for jpeg', () => {
    expect(inferImageMimeType('https://example.com/foo.jpeg')).toBe('image/jpeg')
  })

  it('returns image/png for png', () => {
    expect(inferImageMimeType('/images/foo.png')).toBe('image/png')
  })

  it('returns image/webp for webp', () => {
    expect(inferImageMimeType('foo.webp')).toBe('image/webp')
  })

  it('returns image/gif for gif', () => {
    expect(inferImageMimeType('foo.gif')).toBe('image/gif')
  })

  it('returns image/svg+xml for svg', () => {
    expect(inferImageMimeType('foo.svg')).toBe('image/svg+xml')
  })

  it('returns image/avif for avif', () => {
    expect(inferImageMimeType('foo.avif')).toBe('image/avif')
  })

  it('returns image/jpeg for unknown extension', () => {
    expect(inferImageMimeType('https://example.com/foo.bmp')).toBe('image/jpeg')
  })

  it('ignores query string when inferring extension', () => {
    expect(inferImageMimeType('/images/foo.png?v=123')).toBe('image/png')
  })
})

describe('toAbsoluteUrl', () => {
  it('keeps absolute URL unchanged', () => {
    expect(toAbsoluteUrl('https://cdn.example.com/foo.jpg', BASE_URL)).toBe('https://cdn.example.com/foo.jpg')
  })

  it('adds leading slash to relative path without slash', () => {
    expect(toAbsoluteUrl('images/foo.jpg', BASE_URL)).toBe('https://lionad.art/images/foo.jpg')
  })

  it('joins relative path with leading slash', () => {
    expect(toAbsoluteUrl('/images/foo.jpg', BASE_URL)).toBe('https://lionad.art/images/foo.jpg')
  })

  it('trims trailing slash from baseUrl', () => {
    expect(toAbsoluteUrl('/images/foo.jpg', 'https://lionad.art/')).toBe('https://lionad.art/images/foo.jpg')
  })

  it('resolves protocol-relative URL to https', () => {
    expect(toAbsoluteUrl('//cdn.example.com/foo.jpg', BASE_URL)).toBe('https://cdn.example.com/foo.jpg')
  })
})

describe('extractFirstImage', () => {
  it('extracts first Markdown image', () => {
    const body = '# Title\n\n![alt text](/images/cover.png)\n\nSome text\n\n![second](/images/second.png)'
    expect(extractFirstImage(body)).toBe('/images/cover.png')
  })

  it('extracts first HTML image', () => {
    const body = '<p>Hello</p>\n<img src="/images/cover.png" alt="cover">\n<img src="/images/second.png">'
    expect(extractFirstImage(body)).toBe('/images/cover.png')
  })

  it('prefers Markdown image over HTML image', () => {
    const body = '![md](/images/md.png)\n<img src="/images/html.png">'
    expect(extractFirstImage(body)).toBe('/images/md.png')
  })

  it('returns null when no image exists', () => {
    expect(extractFirstImage('# Title\n\nJust text')).toBeNull()
  })

  it('extracts first image from remark AST', () => {
    const body = {
      type: 'root',
      children: [
        { type: 'heading', children: [{ type: 'text', value: 'Title' }] },
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'Hello ' },
            { type: 'image', url: '/images/ast-cover.png', alt: 'cover' },
            { type: 'text', value: ' world' }
          ]
        }
      ]
    }
    expect(extractFirstImage(body)).toBe('/images/ast-cover.png')
  })

  it('extracts first image from hast AST', () => {
    const body = {
      type: 'element',
      tag: 'p',
      children: [
        { type: 'text', value: 'Hello' },
        { type: 'element', tag: 'img', props: { src: '/images/hast-cover.webp', alt: 'cover' } }
      ]
    }
    expect(extractFirstImage(body)).toBe('/images/hast-cover.webp')
  })

  it('extracts first image from minimark AST (Nuxt Content v3)', () => {
    const body = {
      type: 'minimark',
      value: [
        ['p', {}, 'Hello world'],
        ['p', {}, ['img', { alt: '', src: 'https://cdn.example.com/minimark-cover.png' }]],
        ['p', {}, ['img', { alt: '', src: '/images/second.png' }]]
      ]
    }
    expect(extractFirstImage(body)).toBe('https://cdn.example.com/minimark-cover.png')
  })

  it('returns null for AST without images', () => {
    const body = {
      type: 'root',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'No images here' }] }]
    }
    expect(extractFirstImage(body)).toBeNull()
  })

  it('returns null for empty body', () => {
    expect(extractFirstImage('')).toBeNull()
    expect(extractFirstImage(undefined)).toBeNull()
  })
})

describe('resolveCoverImage', () => {
  it('uses frontmatter image (raw.image) as first priority', () => {
    const raw = {
      body: '![body](/images/body.png)',
      image: '/images/frontmatter.png',
      meta: {}
    }
    const result = resolveCoverImage(raw, DEFAULT_COVER, BASE_URL)
    expect(result).toEqual({
      url: 'https://lionad.art/images/frontmatter.png',
      type: 'image/png'
    })
  })

  it('falls back to meta.image when raw.image is missing', () => {
    const raw = {
      body: '![body](/images/body.png)',
      meta: { image: '/images/meta-image.png' }
    }
    const result = resolveCoverImage(raw, DEFAULT_COVER, BASE_URL)
    expect(result).toEqual({
      url: 'https://lionad.art/images/meta-image.png',
      type: 'image/png'
    })
  })

  it('uses first body image when no frontmatter image', () => {
    const raw = {
      body: '# Title\n\n![cover](/images/body.webp)\n\nText',
      meta: {}
    }
    const result = resolveCoverImage(raw, DEFAULT_COVER, BASE_URL)
    expect(result).toEqual({
      url: 'https://lionad.art/images/body.webp',
      type: 'image/webp'
    })
  })

  it('uses first HTML body image when no frontmatter image', () => {
    const raw = {
      body: '<p>Text</p>\n<img src="/images/body.jpg">',
      meta: {}
    }
    const result = resolveCoverImage(raw, DEFAULT_COVER, BASE_URL)
    expect(result).toEqual({
      url: 'https://lionad.art/images/body.jpg',
      type: 'image/jpeg'
    })
  })

  it('falls back to default cover when no other source', () => {
    const raw = { body: '# Title\n\nText', meta: {} }
    const result = resolveCoverImage(raw, DEFAULT_COVER, BASE_URL)
    expect(result).toEqual({
      url: ABSOLUTE_DEFAULT_COVER,
      type: 'image/png'
    })
  })

  it('returns null when no cover source at all', () => {
    const raw = { body: '', meta: {} }
    const result = resolveCoverImage(raw, '', BASE_URL)
    expect(result).toBeNull()
  })

  it('keeps absolute frontmatter image unchanged', () => {
    const raw = {
      meta: { image: 'https://cdn.example.com/cover.jpg' }
    }
    const result = resolveCoverImage(raw, DEFAULT_COVER, BASE_URL)
    expect(result).toEqual({
      url: 'https://cdn.example.com/cover.jpg',
      type: 'image/jpeg'
    })
  })
})
