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
