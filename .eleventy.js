//
//
//

const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const fs = require('fs');
const htmlmin = require('html-minifier');

const isProduction = process.env.NODE_ENV === 'production' ? true: false;

//
//
//

module.exports = function (eleventyConfig) {

    console.log('--- process.env.NODE_ENV: ' + process.env.NODE_ENV + ' ---');

    //
    //
    //

    eleventyConfig.setQuietMode(true);
    eleventyConfig.addPlugin(directoryOutputPlugin, {
        columns: {
            filesize: true,
            benchmark: true,
        },
        warningFileSize: 400 * 1000,
    });

    //
    //
    //

    // kentaroi/eleventy-sass https://github.com/kentaroi/eleventy-sass
    // "eleventy-sass": "^1.3.1",
    // const eleventySass = require('eleventy-sass');
    // const path = require('path');

    const sass_options = {
        compileOptions: {
            permalink: function (contents, inputPath) {
                return path.format({
                    dir: './assets/styles',
                    name: path.basename(inputPath, path.extname(inputPath)),
                    ext: '.css'
                });
            }
        },
        sass: {
            loadPaths: ['./source/assets/styles'],
            style: isProduction ? 'compressed': 'expanded',
            sourceMap: isProduction ? false: true,
        },
        defaultEleventyEnv: isProduction ? 'production': 'development'
    };
    // eleventyConfig.addPlugin(eleventySass, sass_options);

    //
    //
    //

    eleventyConfig.addPassthroughCopy({ './source/static/**/*': './' });

    //
    //
    //

    eleventyConfig.setNunjucksEnvironmentOptions({
        throwOnUndefined: true,
        autoescape: false,
    });

    //
    //
    //

    eleventyConfig.addWatchTarget('./source/assets/styles/**/*.{scss,sass}');
    eleventyConfig.addWatchTarget('./source/assets/scripts/**/*.js');
    eleventyConfig.addWatchTarget('./source/images/**/*.{jpg,png,webp}');
    eleventyConfig.setWatchThrottleWaitTime(999);

    //
    //
    //

    if (isProduction) {
        eleventyConfig.addTransform('htmlmin', htmlminTransform);
    } else {
        eleventyConfig.setBrowserSyncConfig({
            callbacks: { ready: browserSyncReady },
        });
    }

    //
    //
    //

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: './source',
            layouts: './_includes',
            output: isProduction ? './_production' : './_develop'
        }
    };
};

//
//
//

function browserSyncReady(err, bs) {
    bs.addMiddleware('*', (req, res) => {
        const content_404 = fs.readFileSync('./_develop/404.html');
        // Provides the 404 content without redirect.
        res.write(content_404);
        // Add 404 http status code in request header.
        // res.writeHead(404, { 'Content-Type": "text/html' });
        res.writeHead(404);
        res.end();
    });
}

function htmlminTransform(content, outputPath) {
    if (!outputPath) {
        return content;
    }

    if (outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
        });
        return minified;
    }
    return content;
}
