const fs = require('fs')

console.log('Node Env Test : ', process.env.NODE_ENV)

// ! const gistsDir = path.join(baseDir, '../articles/gists')
// ! Do Not Refactor, Static Path to avoid vuepress build error
const env = require('./build-env')
let gistsDir, awesomeDir, secretsDir
if (env === 'windows') {
  gistsDir = 'D:/@Github/blogs/blogs/articles/gists'
  awesomeDir = 'D:/@Github/blogs/blogs/articles/awesome'
  secretsDir = 'D:/@Github/blogs/blogs/articles/secrets'
} else {
  gistsDir = '/Users/baixing/@Github/blogs/blogs/articles/gists'
  awesomeDir = '/Users/baixing/@Github/blogs/blogs/articles/awesome'
  secretsDir = '/Users/baixing/@Github/blogs/blogs/articles/secrets'
}

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @todo 按照时间排序
 */
const getSrc = src => {
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
      console.error('Error in getSRC : ', err)
    }
  }
  filenames.sort()
  return filenames
}
// console.log('GetSRC Test : ', getSrc(gistsDir))

const sidebarConfigs = {
  articles: [
    {
      title: '心流 / Heart Flows',
      label: '心流',
      collapsable: false,
      childrenGen: list => list.map(x => 'flow/' + x),
      childrenRaw: [
        'punctuations',
        'misleading-and-assumptions',
        '2019',
        'everything',
        'stolen-time-from-god',
        'expression-and-loneliness',
        'a-letter-of-silience',
        'my-shy',
        'messy-in-two-years',
        'fold'
      ]
    },
    {
      title: '技术博客 / Coder',
      label: '技术',
      collapsable: false,
      open: true,
      children: [
        'helmet-and-security',
        'design-patterns-and-js-magic-pot',
        'css-poaa',
        'css-judge-direction',
        'css-interesting',
        'thinking-while-drinking',
        'no-more-if-else',
        'reactive-in-150loc',
        'front-end-mind-map',
        'css-mind-map',
        'fourty-two',
        'source-code',
        'fold'
      ]
    },
    {
      title: '零散思绪 / Gists',
      collapsable: true,
      childrenGen: list => list.map(x => 'gists/' + x),
      childrenRaw: getSrc(gistsDir),
      flag: 'G'
    },
    {
      title: 'Paint in CSS',
      collapsable: true,
      childrenGen: list => list.map(x => 'awesome/' + x),
      childrenRaw: getSrc(awesomeDir),
      flag: 'C'
    },
    {
      title: 'Play Guitar',
      collapsable: true,
      children: ['163/wait-for-wind', '163/promise-ocean', '163/wings-you-are-the-hero', '163/eva', '163/miracle-mountain', '163/wu-wei', '163/noname']
    },
    {
      title: 'Secrets',
      collapsable: true,
      childrenGen: list => list.map(x => 'secrets/' + x),
      childrenRaw: getSrc(secretsDir),
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
  }
}
