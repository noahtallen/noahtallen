const gulp = require('gulp')
const inline = require('gulp-inline-source')
const concat = require('gulp-concat')
const sass = require('gulp-sass')

gulp.task('sass', () => {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./src/styles/'))
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
})

gulp.task('compileCss', ['sass'], () => {
  return gulp.src('src/index.html')
    .pipe(inline())
    .pipe(gulp.dest('./public'))
})

gulp.task('copyImages', () => {
    return gulp.src(['src/img/**/*']).pipe(gulp.dest('public/img'))
})

gulp.task('copyRootFiles', () => {
    return gulp.src(['src/favicon.ico', 'src/styles/circular-std.woff', 'src/styles/inconsolata.ttf', 'src/robots.txt']).pipe(gulp.dest('public/'))
})

gulp.task('compile', ['compileCss', 'copyImages', 'copyRootFiles'])