var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('sass', function() {
    return sass('assets/scss/style.scss', {
        bundleExec: true,
        compass: true
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
    gulp.src('assets/js/functions.js')
        .pipe(uglify())
        .pipe(rename('functions-ck.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
    const watcher = gulp.watch('assets/scss/**/*.scss', ['sass']);
    // watcher.on('change', function(event) {
    //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    // });
});
