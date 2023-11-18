'use strict';
//
//
//

const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const htmlmin = require('html-minifier');

const isProduction = process.env.NODE_ENV === 'production' ? true: false;

//
//
//

module.exports = function (eleventyConfig) {

    //
    // eleventy-plugin-directory-output
    //
    eleventyConfig.addPlugin(directoryOutputPlugin, {
        columns: {
            filesize: true,
            benchmark: true,
        },
        warningFileSize: 400 * 1000,
    });

    //
    // 11ty Quiet Mode
    //
    eleventyConfig.setQuietMode(true);

    //
    // 11ty Passthrough Copy
    //
    eleventyConfig.addPassthroughCopy({ './source/static/**/*': './' });

    //
    // 11ty Nunjucks Environment Options
    //
    eleventyConfig.setNunjucksEnvironmentOptions({
        throwOnUndefined: true,
        autoescape: false,
    });

    //
    // 11ty Watch Target and tWatch Throttle Wait Time
    //
    eleventyConfig.addWatchTarget('./source/assets/styles/');
    eleventyConfig.addWatchTarget('./source/assets/scripts/');
    eleventyConfig.setWatchThrottleWaitTime(1000);

    //
    if (isProduction) {
        //
        // html-minifier
        //
        eleventyConfig.addTransform('htmlmin', function(content) {
            if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
                let minified = htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true
                });
                return minified;
            }
            return content;
        });
    } else {
        //
        // eleventy-dev-server, included with 11ty's installation
        //
        eleventyConfig.setServerOptions({
            liveReload: true,
            domDiff: true,
            port: 8080,
            watch: [],
            showAllHosts: false,
            https: {},
            encoding: 'utf-8',
            showVersion: false,
          });
    }

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
