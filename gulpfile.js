var gulp = require('gulp');
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');
var showdown = require('gulp-showdown');
var htmlrender = require('gulp-htmlrender');
var wrap = require('gulp-wrap-file');
var min = require('gulp-htmlmin');


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

gulp.task('mdtohtml', function() {
    gulp.src('./Source/Pages/md/*.md')
        .pipe(showdown())
        .pipe(gulp.dest('./Source/Pages/html'))
})

gulp.task('addDiv', function() {
    gulp.src('./Source/Pages/html/*.html')
        .pipe(wrap({wrapper: function(content, file) {
            // For the ID, the filename needs to be the end of the file path.
            return '<div id="'+file.modName.split('\\').slice(-1)[0] + 
            'Page" class="pages">'+content+'</div>'
        }}))
        .pipe(gulp.dest('./Source/Pages/html'))
})

gulp.task('render', function() {
    gulp.src('./Source/index.html', {read: false})
        .pipe(htmlrender.render())
        .pipe(min({collapseWhitespace: true}))
        .pipe(gulp.dest('public'))
})