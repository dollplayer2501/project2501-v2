> [!IMPORTANT]  
> It is currently undergoing major renovations.  
> The end date is undecided.


<img src="./screenshot.png" width="600">

[![Netlify Status](https://api.netlify.com/api/v1/badges/e2de09f6-ec8b-4651-9e19-8ee7835cd8d2/deploy-status)](https://app.netlify.com/sites/incandescent-marshmallow-75dd0d/deploys)


# What is this ?


[project2501](https://project2501.netlify.app) is [@dollplayer2501](https://github.com/dollplayer2501)'s portal site.

- One page website
- Site template is [Eventually in HTML5 UP!](https://html5up.net/eventually).
- Back end system is [Eleventy](https://www.11ty.dev/) and Gulp.
    - Eleventy
        - [@11ty/eleventy-plugin-directory-output plugin](https://www.npmjs.com/package/@11ty/eleventy-plugin-directory-output)
        - [html-minifier](https://www.npmjs.com/package/html-minifier)
        - ~~[eleventy-sass plugin](https://www.npmjs.com/package/eleventy-sass)~~
    - Gulp  
        > [!NOTE]  
        > I don't plan to use Gulp in the future.  
        > For this reason, I am currently working on a fix.  
        > November 11, 2023
        - [gulp-sass](https://www.npmjs.com/package/gulp-sass), [sass](https://www.npmjs.com/package/sass), [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
        - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
        - ~~[gulp-libsquoosh](https://www.npmjs.com/package/gulp-libsquoosh)~~
        - ~~[gulp-webp](https://www.npmjs.com/package/gulp-webp) with [lastrun](https://gulpjs.com/docs/en/api/lastrun/)~~
        - [gulp-mode](https://www.npmjs.com/package/gulp-mode)
    - npm scripts
        - [cross-env](https://www.npmjs.com/package/cross-env)
        - [npm-run-all](https://www.npmjs.com/package/npm-run-all)
        - [rimraf](https://www.npmjs.com/package/rimraf)
        - [imagemin](https://www.npmjs.com/package/imagemin) and [imagemin-webp](https://www.npmjs.com/package/imagemin-webp) with [onchange](https://www.npmjs.com/package/onchange)
        - [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
    - Node.js versioning assumes the use of [rtx](https://github.com/jdxcode/rtx)


# Getting started


    git clone git@github.com:dollplayer2501/project2501-v2.git any-path-name
    cd any-path-name

    # Check and set your Node.js version, for example in my case
    rtx activate fish | source

    #
    # 1. Local
    #   Data is stored in ./any-path-name/_develop
    #

    npm run develop:watch
    # http://localhost:8081

    #
    # 2. Production
    #   Data is stored in ./any-path-name/_production
    #   HTML and javascript are compressed
    #

    npm run product:build
    # If you want to check production's data
    npm run product:serve
    # http://localhost:3001


//
