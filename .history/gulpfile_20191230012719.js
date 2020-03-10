const path = require('path')
const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const cmd = require('node-cmd')
const del = require('del')
// const imagemin = require('gulp-imagemin')
const through = require('through2')

const $ = gulpLoadPlugins()

function swallowError(error) {
  console.error(error.toString())
  this.emit('end')
}
function hash(s) {
  var hash = 0
  if (s.length === 0) return hash
  for (var i = 0; i < s.length; i++) {
    var character = s.charCodeAt(i)
    hash = ((hash << 5) - hash) + character
    // Convert to 32bit integer
    hash = hash & hash
  }
  return String(hash).replace('-', '')
}
function modify(modifier) {
  return through.obj(function (file, encoding, done) {
    var content = modifier(String(file.contents))
    file.contents = new Buffer(content)
    this.push(file)
    done()
  })
}

// TODO 将 sidebar 配置化
const fontHTML = content =>
  `
<html>
<body>
  <!-- normal -->
  <div>
    abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890 -=[];',./\\|<>?:"{}_+"'~\`!@#$%^&*()|
  </div>
  <!-- content -->
  ${content}
</body>

<style>
  body {
    font-family: 'Noto Serif SC';
  }
  @font-face {
    font-family: 'Noto Serif SC';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Noto Serif SC Light'), local('NotoSerifSC-Light'),
      url('./NotoSerifSC-Light.otf') format('woff2');
  }
</style>
</html>
`
const fontVueHTML = name =>
  `
<template>
  <div class="placeholder"></div>
</template>

<script>
export default {}
</script>

<style>
@import './subfont/${name}/index.css';

.placeholder {
  content: 'import fonts';
}
</style>
`

const mdFileDirs = [
  'blogs/articles/flow/2019.md'
]

// 移动字体文件到临时目录
gulp.task('move-font-file', () => {
  return gulp.src('blogs/.vuepress/public/fonts/NotoSerifSC-Light.otf')
    .pipe(gulp.dest('tmp'))
})

// 给 MD 文件自动添加字体子集
gulp.task('font', ['move-font-file'], () => {
  let filename = ''
  let nameHash = ''

  gulp.src([...mdFileDirs])

    // 处理文件名和文件名哈希
    .pipe(function () {
      return through.obj(function (file, enc, cb) {
        const { name } = path.parse(file.path)
        filename = name
        nameHash = String(hash(name + '' + file.path))
        this.push(file)
        cb()
      })
    }())

    // 给 MD 文件替换内容
    .pipe($.replace(/<!-- font -->/i, function () {
      console.log('nameHash : ', nameHash)
      return `<Font-Subfonts-${nameHash} />`
    }))
    .pipe(gulp.dest('tmp'))
    // TODO 替换原文件
    // .pipe(function () {
    //   return through.obj(function (file, enc, cb) {
    //     const moveVueFile = `mv tmp\Subfonts-${nameHash}.vue blogs\.vuepress\components`
    //     cmd.get(moveVueFile, () => {
    //       console.log('| move font dir done : ', name)
    //     })
    //     this.push(file)
    //     cb()
    //   })
    // }())

    // 将 MD 文件内容拼接到 HTML 中
    .pipe($.replace(/[.\s\S]*/i, function (match, group, offset, filecontent) {
      return fontHTML(
        match
          .replace(/\s/g, '')
          .replace(/[a-zA-Z0-9]|[`/\\]/g, '')
      )
    }))
    .pipe($.rename({ extname: '.html' }))
    .pipe(gulp.dest('tmp'))

    .pipe(function () {
      return through.obj(function (file, enc, cb) {
        const name = filename
        const thisMD = this

        // 打包字体
        console.log('| subfont start : ', name)
        const cmdSubFont = `subfont ${file.path} -o ${path.join(file.base)}`
        cmd.get(cmdSubFont, () => {
          console.log('| subfont done : ', name)
          console.log('| subfont contents edit start : ', name)
          const subfontDir = path.join(file.base, 'subfont')

          // 更改 CSS 引用文件的内容和名称
          const changeCSSContentAndName = new Promise(resolve => {
            gulp.src(subfontDir + '/*.css')
              .pipe(function () {
                return through.obj(function (file, enc, cb) {
                  const isFontsCSS = file.path.includes('fonts-')
                  isFontsCSS && this.push(file)
                  cb()
                })
              }())
              .pipe($.rename('index.css'))
              .pipe($.replace(/unicode-range[^}]*/g, ''))
              .pipe($.replace(/__subset/g, ''))
              .pipe($.replace(/\/subfont/g, '.'))
              .pipe(gulp.dest(subfontDir))
              .pipe(function () {
                return through.obj(function (file) {
                  resolve()
                })
              }())
          })

          // 创建一个 Vue 组件，引用 CSS 文件
          const createVueComponents = new Promise(resolve => {
            gulp.src(subfontDir + '/*.css')
              .pipe(function () {
                return through.obj(function (file, enc, cb) {
                  const isFontsCSS = file.path.includes('fonts-')
                  isFontsCSS && this.push(file)
                  cb()
                })
              }())
              .pipe($.rename(`Subfonts-${nameHash}.vue`))
              .pipe($.replace(/[.\s\S]*/i, fontVueHTML(nameHash)))
              .pipe(gulp.dest('tmp'))
              .pipe(function () {
                return through.obj(function (file) {
                  resolve()
                })
              }())
          })

          Promise.all([
            changeCSSContentAndName,
            createVueComponents
          ]).then(() => {
            console.log('| subfont contents edit done : ', name)
            console.log('| create move command start : ', name)

            gulp.src(subfontDir + '/*.css')
              .pipe(function () {
                return through.obj(function (file, enc, cb) {
                  const isFontsCSS = file.path.includes('fonts-')
                  isFontsCSS && this.push(file)
                  cb()
                })
              }())
              .pipe($.rename('move.ps1'))
              .pipe($.replace(
                /[.\s\S]*/i,
                `
                ren tmp/subfont ${nameHash}
                mv tmp/${nameHash} blogs/.vuepress/components/Font/subfont
                mv tmp/Subfonts-${nameHash}.vue blogs/.vuepress/components/Font
                `
              ))
              .pipe(gulp.dest(''))
              .pipe(function () {
                return through.obj(function (file) {
                  console.log('| create move command done : ', name)
                  console.log('| move font dir start : ', name)

                  cmd.run('move.ps1', err => {
                    err
                      ? console.error(err)
                      : console.log('| move font dir done : ', name)

                    thisMD.push(file)
                    cb()
                  })
                })
              }())
          })
        })
      })
    }())

})

gulp.task('clean', () => del(['.tmp', 'tmp', 'dist'], { dot: true }))

// gulp.task('watch', () => {
//   gulp.watch([...mdFileDirs], ['font'])
// })

gulp.task('default', ['clean'], () => {
  gulp.start('font')
})