var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('../webapp/js'));
});

gulp.task('copy', function() {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('../webapp'));

});

gulp.task('copy-janrain', function() {
    gulp.src('src/js/util/janrain-init.js')
        .pipe(gulp.dest('../webapp/js'));
});

gulp.task('default', ['browserify', 'copy', 'copy-janrain']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
