const fs = require('fs')

console.log('Node Env Test : ', process.env.NODE_ENV)

// ! const gistsDir = path.join(baseDir, '../articles/gists')
// ! Do Not Refactor, Static Path to avoid vuepress build error
let env
try {
  env = require('./build-env')
} catch (_) {
  env = 'windows'
}
console.log('USE BUILD ENV: ', env)

let gistsDir, awesomeDir, secretsDir
if (env === 'windows') {
  gistsDir = 'D:/@Github/blog/blogs/articles/gists'
  awesomeDir = 'D:/@Github/blog/blogs/articles/awesome'
  secretsDir = 'D:/@Github/blog/blogs/articles/secrets'
} else {
  gistsDir = '/Users/baixing/@Github/blog/blogs/articles/gists'
  awesomeDir = '/Users/baixing/@Github/blog/blogs/articles/awesome'
  secretsDir = '/Users/baixing/@Github/blog/blogs/articles/secrets'
}

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @todo 按照时间排序
 */
const getSRCs = src => {
  const filenames = []
  const fileTypes = /\.md$/
  const mainFiles = ['index.md', 'README.md']
  if (fs && fs.readdirSync) {
    try {
      fs.readdirSync(src).forEach(file => {
        if (fileTypes.test(file) > 0) {
          if (!mainFiles.includes(file)) {
            filenames.push(file.replace('.md', ''))
          }
        }
      })
    } catch (err) {
      console.error('Error in getSRCs : ', err)
    }
  }
  filenames.sort()
  // console.log('filenames: ', filenames)
  return filenames
}
// console.log('getSRCs Test : ', getSRCs(gistsDir))

/**
 * @param flag 对应文章的 Vue 组件所在 Article 中的文件夹 prefix
 */
const sidebarConfigs = {
  articles: [
    {
      title: '心流思绪 / Heart Flows',
      label: '心流思绪',
      collapsable: false,
      childrenGen: list => list.map(x => 'flow/' + x),
      childrenRaw: [
        'art',
        // 'rss',
        'books',
        'punctuations',
        'misleading-and-assumptions',
        'everything',
        'stolen-time-from-god',
        'expression-and-loneliness',
        'a-letter-of-silience',
        'my-shy',
        'messy-in-two-years',
        'zfold'
      ]
    },
    {
      title: '技术博客 / Coder',
      label: '技术',
      collapsable: false,
      open: true,
      children: [
        // 'windows',
        'design-patterns-and-js-magic-pot',
        'anysort',
        'js-100',
        'helmet-and-security',
        'css-poaa',
        'css-judge-direction',
        'css-interesting',
        'thinking-while-drinking',
        'no-more-if-else',
        'reactive-in-150loc',
        // 'front-end-mind-map',
        // 'css-mind-map',
        'fourty-two',
        'source-code',
        'zfold'
      ]
    },
    {
      title: '绘画系列 / Paint',
      collapsable: false,
      childrenGen: list => list.map(x => 'awesome/' + x),
      childrenRaw: getSRCs(awesomeDir),
      flag: 'C'
    },
    {
      title: '零散笔记',
      collapsable: true,
      childrenGen: list => list.map(x => 'gists/' + x),
      childrenRaw: getSRCs(gistsDir),
      flag: 'G'
    },
    {
      title: '请弹琴',
      collapsable: true,
      open: true,
      children: [
        '163/wait-for-wind',
        '163/promise-ocean',
        '163/wings-you-are-the-hero',
        '163/eva',
        '163/miracle-mountain',
        '163/wu-wei',
        '163/noname'
      ]
    },
    {
      title: 'Secrets',
      collapsable: true,
      childrenGen: list => list.map(x => 'secrets/' + x),
      childrenRaw: getSRCs(secretsDir),
      flag: 'S'
    }
  ]
}

Object.values(sidebarConfigs).map(sections => {
  sections.map(section => {
    if (!section.children) {
      section.children = section.childrenGen ? section.childrenGen(section.childrenRaw) : section.childrenRaw
    }
    if (!section.childrenRaw) {
      section.childrenRaw = section.children
    }
  })
})

module.exports = {
  getSidebar(name) {
    return sidebarConfigs[name] || []
  },
  getRecommends() {
    return {
      '心流思绪': {
        url: '/articles/flow/rss.html',
        label: '自用推流推荐'
      },
      '技术博客': {
        url: '/articles/anysort.html',
        label: 'Anysort：灵活、优雅、无依赖的排序库'
      }
    }
  }
}
