const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const shell = require('gulp-shell');
const addsrc = require('gulp-add-src');

// SCSS
const sass = require('gulp-sass');

// PostCSS
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const calc = require('postcss-calc');

// JS
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const js_files = [
    'src/js/lib/*.js',
    'src/js/base/define.js',
    'src/js/util/*.js',
    'src/js/modules/*.js',
    'src/js/base/router.js'
];

// Config
const themeName = 'cornell';
const dest = `../`;

// Compile SCSS files to CSS
gulp.task('scss', function() {
    const processors = [
        autoprefixer,
        cssnano,
        calc
    ];

    gulp.src('src/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('custom.css'))
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(browserSync.stream());
});

// Compile JS
gulp.task('js', function() {
    gulp.src(js_files)
        //.pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env', 'stage-3']
        }))
        .pipe(addsrc.prepend(['node_modules/hammerjs/hammer.min.js']))
        .pipe(concat('custom.js'))
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dest + 'js/'))
        .pipe(browserSync.stream());
});

// Template changes
gulp.task('twig', ['refreshCache'], function () {
    console.log('Template changed, reloading.');
    browserSync.reload();
});

gulp.task('refreshCache', shell.task(['lando drush cc render']));

// Watch asset folder for changes
gulp.task('watch', ['scss', 'js'], function() {
    browserSync.init({
        proxy: `https://${themeName}.lndo.site/`,
        open: false
    });

    gulp.watch('src/css/**/*', ['scss']);
    gulp.watch('src/js/**/*', ['js']);
    gulp.watch('../../**/*.twig', ['twig']);
});

// Set watch as default task
gulp.task('default', ['watch']);
