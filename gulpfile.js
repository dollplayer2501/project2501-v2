'use strict';


const { src, dest, series, parallel, watch } = require('gulp');
//
var mode = require('gulp-mode')({
    modes: ['production', 'develop'],
    default: 'develop',
    verbose: false
});
const outputPath = mode.production() ? './_production' : './_develop';

//
const rename = require('gulp-rename');

//
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
//
const uglify = require('gulp-uglify');
//
const squoosh = require('gulp-libsquoosh');

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
        './source/images/**/*.{jpg,png,webp}'
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
        .pipe(mode.production(uglify({
            output:{
              comments: /^!/
            }
          })))
        .pipe(dest(outputPath + '/assets/scripts'));
    done();
}

//
function images(done) {
    console.log('[00:00:00] Images ');

    src(path.image)
        .pipe(rename(function (path) {
            path.dirname = '/images';
        }))
        .pipe(mode.production(squoosh()))
        .pipe(dest(outputPath));
    done();
}

//
function watching(done) {
    watch(path.scss.watch, series(scss));
    watch(path.javascript, series(javascript));
    watch(path.image, series(images));
    done();
}

//
exports.css = series(scss);
exports.js = series(javascript);
exports.image = series(images);
//
exports.build = parallel(images, scss, javascript);
exports.watch = series(watching);
//
