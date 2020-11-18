var gulp = require ('gulp'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();
    autoprefixer = require('gulp-autoprefixer');
    sourcemaps = require('gulp-sourcemaps');


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

gulp.task('default', function () {
    return gulp.src(['./src/css/normalize.css', './src/css/main.css'])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(
            {
                overrideBrowserslist: ['last 2 versions'],
                cascade: false}
        ))
        .pipe(concat('all.css'))
        .pipe(csso())
        .pipe(rename({
            suffix: ".mini",
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'));
});

//объединение стилей, если подключать отдельно
// gulp.task('styles', function() {
//     return gulp.src(['./src/css/normalize.css', './src/css/main.css'])
//         .pipe(concat('all.css'))
//         .pipe(gulp.dest('./dist/css/'));
// });

//автопрефиксер, если подключать в качестве отдельной задачи
// gulp.task('autopref', function () {
//     return gulp.src('./src/css/main.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('./dist/css/'));
// })

//
// gulp.task('default', gulp.parallel('sync', 'styles', 'default'));

gulp.task('default', gulp.parallel('sync','default'));