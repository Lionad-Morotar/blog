const fs = require('fs')

console.log('Node Env Test : ', process.env.NODE_ENV)
// ! const gistsDir = path.join(baseDir, '../articles/gists')
// ! Do Not Refactor, Static Path to avoid vuepress build error
const gistsDir = 'D:/@Github/blogs/blogs/articles/gists'
const awesomeDir = 'D:/@Github/blogs/blogs/articles/awesome'
const secretsDir = 'D:/@Github/blogs/blogs/articles/secrets'

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @todo 按照时间排序
 */
const getSrc = src => {
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
        console.error('Error in getSRC : ', err)
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
                '隐秘',
                '追寻自由与满怀希望',
                '表达和孤独',
                '文字与情绪',
                '一封沉默',
                '我的腼腆'
            ]
        },
        {
            title: '技术 / Coder',
            label: '技术',
            collapsable: false,
            open: true,
            children: [
                'CSSAA',
                '你可以用纯CSS判断鼠标进入的方向吗',
                '9种CSS图案解析',
                '用JS实现一些造型构成',
                '从一张CSS风景画中学到的东西',
                '有关CSS的一些极有趣的东西',
                '近来的新工作，及喝饮料时的一些思考',
                '聊聊聊此次离职毕业及其它杂乱的事情',
                '你本可以少写些if-else',
                '150行代码带你实现小程序中的数据侦听',
                '从一个越写越慢的编辑器中聊聊优化思路',
                '探索Scoped-CSS实现原理',
                '听说你还在手写懒加载'
            ]
        },
        {
            title: 'Memo / Gists',
            collapsable: true,
            childrenGen: list => list.map(x => 'gists/' + x),
            childrenRaw: getSrc(gistsDir),
            flag: 'G'
        },
        {
            title: 'Awesome',
            collapsable: true,
            childrenGen: list => list.map(x => 'awesome/' + x),
            childrenRaw: getSrc(awesomeDir),
            flag: 'C'
        },
        {
            title: '吉他 / Plays',
            collapsable: true,
            children: [
                '163/等待的风',
                '163/约定的海洋',
                '163/Wings',
                '163/EVA',
                '163/奇迹之山',
                '163/WuWei',
                '163/无题'
            ]
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
