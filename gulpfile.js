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
  return hash
}
function modify(modifier) {
  return through.obj(function (file, encoding, done) {
    var content = modifier(String(file.contents))
    file.contents = new Buffer(content)
    this.push(file)
    done()
  })
}

const fontHTML = content =>
  `
<html>
<body>
  <!-- normal -->
  <div>
    abcdefghijklmnopqrstuvwxyz 1234567890 -=[];',./\\|<>?:"{}_+"'~\`!@#$%^&*()|
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
  'blogs/articles/test.md'
]

// 移动字体文件到临时目录
gulp.task('move-font-file', () => {
  return gulp.src('blogs/.vuepress/public/fonts/NotoSerifSC-Light.otf')
    .pipe(gulp.dest('tmp'))
})

// 用来写测试的代码
gulp.task('test', () => {
  const nameHash = 3556498
  const subfontDir = 'tmp/subfont'
  // const moveFontDir = `mv "./tmp/${nameHash}" "./blogs/.vuepress/components/subfont/"`
  // cmd.get(moveFontDir, (err) => {
  //   console.log(err)
  // })
  gulp.src(subfontDir + '/*.css')
    .pipe(function () {
      return through.obj(function (file, enc, cb) {
        const isFontsCSS = file.path.includes('fonts-')
        isFontsCSS && this.push(file)
        cb()
      })
    }())
    .pipe($.rename('move.bat'))
    .pipe($.replace(
      /[.\s\S]*/i,
      `
      ren tmp/subfont ${nameHash}
      mv tmp/${nameHash}' 'blogs/.vuepress/components/subfont
      mv tmp/Subfonts-${nameHash}.vue' 'blogs/.vuepress/components
      `
    ))
    .pipe(gulp.dest(''))
  // gulp.src('blogs/**/*.md')
  //   .pipe(function () {
  //     return through.obj(function (file, enc, cb) {
  //       this.push(file)
  //       cb()
  //     })
  //   }())
  //   .pipe(gulp.dest('.tmp'))
  //   .pipe(function () {
  //     return through.obj(function (file, enc, cb) {
  //       console.log(file.path)
  //       // this.push(file)
  //       cb()
  //     })
  //   }())
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
        nameHash = String(hash(name))
        this.push(file)
        cb()
      })
    }())

    // 给 MD 文件替换内容
    .pipe($.replace(/<!-- font -->/i, `<Subfonts-${nameHash} />`))
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
      return fontHTML(match.replace(/\s/g, ''))
    }))
    .pipe($.rename({ extname: '.html' }))
    .pipe(gulp.dest('tmp'))

    .pipe(function () {
      return through.obj(function (file, enc, cb) {
        const name = filename

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
            console.log('| move font dir start : ', name)

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
                mv tmp/${nameHash} blogs/.vuepress/components/subfont
                mv tmp/Subfonts-${nameHash}.vue blogs/.vuepress/components
                `
              ))
              .pipe(gulp.dest('/'))

            console.log('| move font dir done : ', name)

            // const renFontDir = `ren tmp\\subfont ${nameHash}`
            // cmd.get(renFontDir, () => {
            //   const moveFontDir = `mv 'tmp\\${nameHash}' 'blogs\\.vuepress\\components\\subfont'`
            //   cmd.get(moveFontDir, () => {
            //     const moveVueFile = `mv 'tmp\\Subfonts-${nameHash}.vue' 'blogs\\.vuepress\\components'`
            //     cmd.get(moveVueFile, () => {
            //     })
            //   })
            // })
          })
        })
        this.push(file)
        cb()
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