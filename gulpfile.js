var gulp = require ('gulp'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();


gulp.task('csso', function () {
    return gulp.src('dist/css/all.css')
        .pipe(csso())
        .pipe(rename({
            suffix: ".mini",
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src",
        }});

    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("src/images/*.*").on('change', browserSync.reload);
    gulp.watch("src/js/*.*").on('change', browserSync.reload);

});

gulp.task('styles', function() {
    return gulp.src(['./src/css/normalize.css', './src/css/main.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', gulp.parallel('sync', 'styles', 'csso'));
