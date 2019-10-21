const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')

const del = require('del')
// const imagemin = require('gulp-imagemin')
const through = require('through2')

const $ = gulpLoadPlugins()

function swallowError(error) {
  console.error(error.toString())
  this.emit('end')
}

const mdFileDir = 'blogs/articles/**/*.md'

gulp.task('font', () => {
  gulp.src([mdFileDir])
    .pipe($.changed('dist/template', { hasChanged: $.changed.compareSha1Digest }))
    .pipe($.replace(/<!-- font -->/ig, function (match, group, offset, filecontent) {
      return `<!-- font replaced -->`
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('.tmp'))
})

gulp.task('clean', () => del(['.tmp', 'dist'], { dot: true }))

gulp.task('watch', () => {
  gulp.watch([mdFileDir], ['font'])
})

gulp.task('default', ['clean'], () => {
  gulp.start('watch')
})