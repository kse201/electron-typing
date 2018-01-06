const gulp = require('gulp')
const gulpIf = require('gulp-if')
const eslint = require('gulp-eslint')
const del = require('del')
let jest = require('gulp-jest').default

const isFixed = (file) => {
  return file.eslint != null && file.eslint.fixed
}

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!**/bundle.js'])
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('.')))
    .pipe(eslint.failAfterError())
})

gulp.task('unit', () => {
  return gulp.src('__test__')
    .pipe(jest({coverage: true}))
})

gulp.task('unit-watch', () => {
  return gulp.src('__test__')
    .pipe(jest({
      watch: true,
      coverage: true
    }))
})

gulp.task('clean', (cb) => {
  del(['dist', 'tmp', '__test__/coverage'], cb)
})

gulp.task('test', ['lint', 'unit'])
