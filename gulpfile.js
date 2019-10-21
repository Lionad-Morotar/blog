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

const mdFileDirs = [
  'blogs/articles/README.md'
]

// 移动字体文件到临时目录
gulp.task('move-font-file', () => {
  return gulp.src('blogs/.vuepress/public/fonts/NotoSerifSC-Light.otf')
    .pipe(gulp.dest('tmp'))
})


gulp.task('font', ['move-font-file'], () => {
  gulp.src([...mdFileDirs])

    // 将 MD 文件内容拼接到 HTML 中
    .pipe($.replace(/[.\s\S]*/i, function (match, group, offset, filecontent) {
      return fontHTML(match.replace(/\s/g, ''))
    }))
    .on('error', swallowError)
    .pipe($.rename({ extname: '.html' }))
    .pipe(gulp.dest('tmp/'))

    // 打包字体
    .pipe(function () {
      return through.obj(function (file) {
        const { name } = path.parse(file.path)
        console.log('do file font : ', name)
        const cmdSubFont = `subfont ${file.path} -o ${path.join(file.base, name)}`
        cmd.get(cmdSubFont, () => {
          console.log('done file font : ', name)
        })
        this.push(file)
      })
    }())

})

gulp.task('clean', () => del(['tmp', 'dist'], { dot: true }))

// gulp.task('watch', () => {
//   gulp.watch([...mdFileDirs], ['font'])
// })

gulp.task('default', ['clean'], () => {
  gulp.start('font')
})