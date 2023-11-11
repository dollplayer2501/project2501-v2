'use strict';

import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';


const destination_path = 'product' === process.env.NODE_ENV ? '_production/' : '_develop/';

await imagemin(
    ['source/images/**/*.{jpg,jpeg,png}'], {
        destination: destination_path + 'images/',
        plugins: [
            imageminWebp({quality: 80})
        ]
    }
);

console.log('Images optimized');
