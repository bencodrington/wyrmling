var gulp        = require('gulp'),
watch           = require('gulp-watch'),
browserSync     = require('browser-sync').create();

gulp.task('watch', () => {

    browserSync.init({
        notify: false,
        server: '.'
    });

    watch('./scripts/**/*.js', () => {
        gulp.start('scriptsRefresh');
    });

});

gulp.task('scriptsRefresh', ['scripts'], () => {
    browserSync.reload();
});