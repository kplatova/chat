/*
 * Load plugins
 */
const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');

/*
 * Styles
 */
gulp.task('styles', function() {
    return sass('public/style.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('public'))
        .pipe(notify({ message: 'Styles task complete' }));
});

/*
 * Clean
 */
// gulp.task('clean', function() {
//     return del(['public']);
// });

/*
 * Default task
 */
gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});

/*
 * Watch
 */
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('public/*.scss', ['styles']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in public/, reload on change
    gulp.watch(['public/**']).on('change', livereload.changed);

});