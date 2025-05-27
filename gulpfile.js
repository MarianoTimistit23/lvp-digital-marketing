const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const path = require('path');

// Define the 'compileSass' function
function compileSass() {
    return gulp.src('./style.scss') // Adjust the path as necessary
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify the CSS
        .pipe(gulp.dest('./'));
}

function minifyJS() {
    return gulp.src('./static/js/*.js') // Modify the source to select all JS files
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) // Change extname to suffix to keep the original filename
        .pipe(gulp.dest('./static/js/prod'));
}

// Define the 'watchFiles' function
function watchFiles() {
    gulp.watch('./style.scss', compileSass);
    // gulp.watch('./static/js/*.js', minifyJS);
}

// Use 'exports' to define Gulp tasks
exports.compileSass = compileSass;
exports.watch = watchFiles;
// exports.minifyJS = minifyJS;

// Default task that runs 'compileSass' and 'watch' in series
exports.default = gulp.series(compileSass, watchFiles /*, minifyJS*/);
