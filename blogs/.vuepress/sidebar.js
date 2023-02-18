const fs = require('fs')
const path = require('path')

console.log('USE NODE_ENV:', process.env.NODE_ENV)

// let gistsDir = path.join(__dirname, '../gists')
// let awesomeDir = path.join(__dirname, '../awesome')
// let secretsDir = path.join(__dirname, '../secrets')
// let mapsDir = path.join(__dirname, '../maps')

let gistsDir = 'D:\\@Github\\blog\\blogs\\gists'
let awesomeDir = 'D:\\@Github\\blog\\blogs\\awesome'
let secretsDir = 'D:\\@Github\\blog\\blogs\\secrets'
let mapsDir = 'D:\\@Github\\blog\\blogs\\maps'

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @param {String} prefix 给返回值添加前缀
 * @todo 按照时间排序
 */
const getSRCs = (src, prefix = '') => {
  const filenames = []
  const fileTypes = /\.md$/
  const mainFiles = ['index.md', 'README.md']
  try {
    fs.readdirSync(src).forEach(file => {
      if (fileTypes.test(file) > 0) {
        if (!mainFiles.includes(file)) {
          filenames.push(file.replace('.md', ''))
        }
      }
    })
  } catch (err) {
    // 在 Build 时会碰到这个莫名奇妙的错误，
    // 和 __dirname node 执行路径有关，
    // 可以不用管
    console.error('Error in getSRCs : ', err)
  }
  filenames.sort()
  return filenames.map(x => prefix + x)
}

const sidebars = [
  {
    title: '心流思绪 / Heart Flows',
    label: '心流思绪',
    collapsable: false,
    open: true,
    path: '/flows/',
    children: [
      // 'flows/brain-history',
      // 'flows/rss',
      'flows/books',
      'flows/long-night-dream',
      'flows/everything',
      'flows/stolen-time-from-god',
      'flows/expression-and-loneliness',
      'flows/my-shy',
      'flows/drinking-while-thinking',
      'flows/escape-from-mysticism',
      'flows/zfold',
    ],
  },
  {
    title: '技术博客 / Coder',
    label: '技术',
    collapsable: false,
    open: true,
    path: '/articles/',
    children: [
      'articles/use-scrollbars',
      // 'articales/even-more-modern-error-handling',
      // 'articles/image-format',
      'articles/zindex-manager',
      // 'articles/windows',
      'articles/crack-the-slider',
      'articles/css-light-travel',
      'articles/design-patterns-and-js-magic-pot',
      'articles/anysort-2th',
      'articles/js-100',
      'articles/helmet-and-security',
      'articles/css-poaa',
      'articles/css-judge-direction',
      'articles/css-interesting',
      'articles/no-more-if-else',
      // 'articles/front-end-mind-map',
      // 'articles/css-mind-map',
      'articles/fourty-two',
      'articles/source-code',
      'articles/zfold',
    ],
  },
  {
    title: '玩乐广场 / Paint',
    collapsable: true,
    open: false,
    path: '/awesome/',
    children: getSRCs(awesomeDir, 'awesome/'),
  },
  {
    title: '等待整理',
    collapsable: true,
    open: false,
    path: '/gists/',
    children: getSRCs(gistsDir, 'gists/'),
  },
  {
    title: '知识骨架',
    collapsable: true,
    open: false,
    path: '/maps/',
    children: getSRCs(mapsDir, 'maps/'),
  },
  {
    title: '吉他剧场',
    collapsable: true,
    open: false,
    path: '/music/',
    children: [
      'music/wait-for-wind',
      'music/promise-ocean',
      'music/wings-you-are-the-hero',
      'music/eva',
      'music/miracle-mountain',
      'music/wu-wei',
      'music/noname',
    ],
  },
  {
    title: 'Secrets',
    collapsable: true,
    open: true,
    path: '/secrets/',
    children: getSRCs(secretsDir, 'secrets/'),
  },
]

module.exports = {
  getSidebar() {
    return sidebars
  },
  getRecommends() {
    return {
      心流: {
        url: '/flows/long-night-dream.html',
        label: '长夜梦'
      },
      技术: {
        url: '/articles/zindex-manager.html',
        label: '一统多组件库的层叠顺序'
      }
    }
  }
}
