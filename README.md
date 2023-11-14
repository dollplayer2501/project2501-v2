<img src="./screenshot.png" width="600">

[![Netlify Status](https://api.netlify.com/api/v1/badges/e2de09f6-ec8b-4651-9e19-8ee7835cd8d2/deploy-status)](https://app.netlify.com/sites/incandescent-marshmallow-75dd0d/deploys)


# What is this ?


"[project2501](https://project2501.netlify.app)" is [@dollplayer2501](https://github.com/dollplayer2501)'s portal site.

- One page website
- Site template is [Eventually in HTML5 UP!](https://html5up.net/eventually).
- Back end system is [Eleventy](https://www.11ty.dev/) and Gulp.
    - Eleventy
        - [@11ty/eleventy-plugin-directory-output plugin](https://www.npmjs.com/package/@11ty/eleventy-plugin-directory-output)
        - [html-minifier](https://www.npmjs.com/package/html-minifier)
    - Gulp
        - [gulp-sass](https://www.npmjs.com/package/gulp-sass), [sass](https://www.npmjs.com/package/sass), [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
        - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
        - [gulp-webp](https://www.npmjs.com/package/gulp-webp) with [lastrun](https://gulpjs.com/docs/en/api/lastrun/)
        - [gulp-mode](https://www.npmjs.com/package/gulp-mode)
    - npm scripts
        - [cross-env](https://www.npmjs.com/package/cross-env)
        - [npm-run-all](https://www.npmjs.com/package/npm-run-all)
        - [rimraf](https://www.npmjs.com/package/rimraf)
        - [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
        - [npm serve](https://www.npmjs.com/package/serve)
    - Node.js versioning assumes the use of [rtx](https://github.com/jdxcode/rtx)


# Getting started

## 1. `git clone`

    git clone git@github.com:dollplayer2501/project2501-v2.git any-path-name
    cd any-path-name

## 2. Check the Node.js version if necessary

For example in my case. (I use rtx)

    rtx activate fish | source

## 3. Npm and package install

    npm install

## 4. Start up

Check my [`package.json`](https://github.com/dollplayer2501/project2501-v2/blob/main/package.json)'s `scripts` section.


### 4.1 Build and/or watch locally

Output is stored in `./any-path-name/_develop`.  
URL is `http://localhost:8080` (default).

    npm run develop:watch

If you only need to build, use the following.

    npm run develop:build

### 4.2. Build a product version and visual confirmation

Output is stored in `./any-path-name/_production`.  
HTML, JavaScript and CSS are compressed.

    npm run product:build

If you want to visually check using a web browser, please see below.  
URL is `http://localhost:3000` (default).

    npm run product:serve


# Memo

- Automatic reloading after compiling Sass/SCSS doesn't work?  
Do I need to reload manually?
- Locally, I use the automatic reload feature of 11ty/Eleventy, but in production I use [npm serve](https://www.npmjs.com/package/serve).


//
