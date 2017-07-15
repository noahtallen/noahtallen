var gulp = require('gulp');
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');
var showdown = require('gulp-showdown');
gulp.task('build-css', function() {
    gulp.src('./Source/Style/index.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public'));
});

gulp.task('build-css-compress', function() {
    gulp.src('./Source/Style/index.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./public'));
})

gulp.task('build-page', function() {
    gulp.src('./Source/Pages/*.md')
        .pipe(showdown())
        .pipe(gulp.dest('public/pages'));
});