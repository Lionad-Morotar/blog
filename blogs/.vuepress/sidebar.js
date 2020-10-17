const fs = require('fs')

console.log('Node Env Test : ', process.env.NODE_ENV)

// ! const gistsDir = path.join(baseDir, '../articles/gists')
// ! Do Not Refactor, Static Path to avoid vuepress build error
const env = 'windows' // 'mac'
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
        '关于标点的那些事儿',
        '权力斗争中的误导与假设',
        '2019',
        '万物联结与幸福感',
        '偷取时间',
        '表达和孤独',
        '一封沉默',
        '我的腼腆',
        '聊聊此次离职毕业及其它杂乱的事情',
        'fold'
      ]
    },
    {
      title: '技术博客 / Coder',
      label: '技术',
      collapsable: false,
      open: true,
      children: [
        'Helmet & Security',
        '设计模式与JS魔法锅',
        'CSSAA',
        '你可以用纯CSS判断鼠标进入的方向吗',
        '有关CSS的一些极有趣的东西',
        '喝饮料时的一些思考',
        '你本可以少写些if-else',
        '150行代码带你实现小程序中的数据侦听',
        'front-end-mind-map',
        'CSS-Mind-Map',
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
      children: ['163/等待的风', '163/约定的海洋', '163/Wings', '163/EVA', '163/奇迹之山', '163/WuWei', '163/无题']
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
