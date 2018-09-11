const gulp = require('gulp')
const inline = require('gulp-inline-source')

gulp.task('compileCss', () => {
  return gulp.src('src/index.html')
    .pipe(inline())
    .pipe(gulp.dest('./public'))
})

gulp.task('copyImages', () => {
    return gulp.src(['src/img/**/*']).pipe(gulp.dest('public/img'))
})

gulp.task('copyRootFiles', () => {
    return gulp.src(['src/favicon.ico', 'src/styles/circular-std.woff', 'src/styles/inconsolata.ttf']).pipe(gulp.dest('public/'))
})

gulp.task('compile', ['compileCss', 'copyImages', 'copyRootFiles'])
