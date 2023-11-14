'use strict';


const { src, dest, series, parallel, watch, lastRun } = require('gulp');
//
var mode = require('gulp-mode')({
    modes: ['production', 'develop'],
    default: 'develop',
    verbose: false
});
const outputPath = mode.production() ? './_production' : './_develop';

//
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const webp = require('gulp-webp');
//
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');


//
const path = {
    'scss': {
        'source': [
            './source/assets/styles/main.scss',
        ],
        'watch': './source/assets/styles/**/*.{scss,sass}',
    },
    'javascript': [
        './source/assets/scripts/main.js',
    ],
    'image': [
        './source/images/**/*.{jpg,jpeg,png,webp}'
    ],
};

//
function scss(done) {
    console.log('[00:00:00] Sass/SCSS');

    src(path.scss.source)
        .pipe(mode.develop(sourcemaps.init()))
        .pipe(sass({
            outputStyle: mode.production() ? 'compressed' : 'expanded'
        }))
        .pipe(mode.develop(sourcemaps.write()))
        .pipe(dest(outputPath + '/assets/styles'));
    done();
};

//
function javascript(done) {
    console.log('[00:00:00] JavaScript');

    src(path.javascript)
        .pipe(gulpif(mode.production() ? true: false,
            terser({
                compress: {
                    drop_console: true
                },
                mangle: true
        })))
        .pipe(dest(outputPath + '/assets/scripts'));
    done();
}

//
function image(done) {
    console.log('[00:00:00] Image');

    src(path.image, {
        since: lastRun(image)
    })
        .pipe(webp())
        .pipe(dest(outputPath + '/images'));
    done();
}

//
function watching(done) {
    watch(path.scss.watch, series(scss));
    watch(path.javascript, series(javascript));
    watch(path.image, series(image));
    done();
}

//
exports.css = series(scss);
exports.js = series(javascript);
exports.webp = series(image);
//
exports.build = parallel(image, scss, javascript);
exports.watch = series(watching);
//
