const gulp = require('gulp');

const plumber = require('gulp-plumber');

const uglify = require('gulp-uglify');

const uglifyCss = require('gulp-uglifycss');

const concat = require('gulp-concat');

const concatCss = require('gulp-concat-css');



let js_input_files = './src/js/*.js';

let js_output_dir = './js/';

let js_output_name = "script.js";


let css_input_files = './src/css/*.css';

let css_output_dir = './style/';

let css_output_name = "style.css";


gulp.task('scripts', () => {
    return gulp.src(js_input_files)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(js_output_name))
        .pipe(gulp.dest(js_output_dir));
});

gulp.task('styles', () => {
    return gulp.src(css_input_files)
        .pipe(plumber())
        .pipe(uglifyCss())
        .pipe(concatCss(css_output_name))
        .pipe(gulp.dest(css_output_dir));
});

gulp.task('watch', () => {
    gulp.watch(js_input_files, gulp.series('scripts'));
    gulp.watch(css_input_files, gulp.series('styles'));
});