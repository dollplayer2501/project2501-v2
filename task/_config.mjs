'use strict';

import gulpMode from 'gulp-mode';


export const mode = gulpMode({
    modes: ['product', 'develop'],
    default: 'develop',
    verbose: false
});

export const outputPath = mode.product() ? './_product' : './_develop';

export const path = {
    'stylesheet': {
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
