'use strict';

import gulpMode from 'gulp-mode';


export const mode = gulpMode({
    modes: ['production', 'develop'],
    default: 'develop',
    verbose: false
});

export const outputPath = mode.production() ? './_production' : './_develop';

export const path = {
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
