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
const uglify = require('gulp-uglify');
//
const squoosh = require('gulp-libsquoosh');

//
const path = {
    'javascript': [
        './source/assets/scripts/main.js',
    ],
    'image': [
        './source/images/**/*.{jpg,png,webp}'
    ],
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
    watch(path.javascript, series(javascript));
    watch(path.image, series(images));
    done();
}

//
exports.image = series(images);
exports.js = series(javascript);
exports.watch = series(watching);

//
exports.build = series(images, javascript);
exports.watch = series(watching);

//
