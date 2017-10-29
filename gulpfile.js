const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const minifyHTML = require('gulp-minify-html');
const livereload = require('gulp-livereload');

gulp.task('default', ['minify-css', 'minify-js', 'minify-html']);

gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(gulp.dest('./scss/css/'));
});

gulp.task('autoprefixer', ['sass'], () => {
    gulp.src('scss/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('scss/css/main.css'))
});

gulp.task('minify-css', ['autoprefixer'], () => {
    return gulp.src('scss/css/main.css')
               .pipe(cleanCSS({compatibility: 'ie11'}))
               .pipe(gulp.dest('build/css'))
});

gulp.task('minify-js', () => {
    return gulp.src('js/*.js')
               .pipe(minify({
                   ext: {
                      min: '.min.js'
                   },
                   exclude: ['tasks'],
                   ignoreFiles: ['-min.js']
               }))
               .pipe(gulp.dest('build/js'))
});

gulp.task('minify-html', () => {
    return gulp.src('static/*.html')
               .pipe(minifyHTML())
               .pipe(gulp.dest('build'))
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('scss/**/*.scss', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('index.html', ['minify-html'])
});