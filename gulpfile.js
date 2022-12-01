const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssCompressor = require(`gulp-clean-css`),
    cssValidator = require(`gulp-stylelint`),
    jsValidator = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;


let compressHTML = () => {   
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/styles`));
};

let compressJS = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let validateCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssValidator({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};

let validateJS = () => {
    return src([`js/main.js`,`gulpfile.js`])
        .pipe(jsValidator());
};

let transpileJSForDev = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `./`
            ]
        }
    });

    watch(`index.html`).on(`change`, reload);
    watch(`styles/main.css`, validateCSS).on(`change`, reload);
    watch(`js/main.js`, series(validateJS)).on(`change`, reload);

};



exports.validateJS = validateJS;
exports.validateHTML = validateHTML;
exports.validateCSS = validateCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateCSS,
    validateJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    transpileJSForProd,
    compressHTML,
    compressCSS
);
