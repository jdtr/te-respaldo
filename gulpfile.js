const { src, dest, parallel, watch, series } = require('gulp'),
    includer = require('gulp-html-ssi'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');
    pump = require('pump'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    server = require('gulp-server-livereload'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

const vendors = {
    css: 'app/css/vendors/*.css',
    js: "app/js/vendors/*.js"
};
const pathSrc = {
    html: 'app/html-ssi/*.html',
    scss: 'app/css/src/**/*.scss',
    js: 'app/js/src/*.js'
}
const pathDest = {
    css: 'app/css/public',
    js: 'app/js/public'
};

//Html
function htmlSSI () {
    return src(pathSrc.html)
        .pipe(includer())
        .pipe(dest('./app'));
}

//Sass
function scss () {
    return src(pathSrc.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(dest(pathDest.css));
}

//Js compress
function jsTask (cb) {
    return pump([
        src(pathSrc.js),
            uglify(),
            dest(pathDest.js)
        ],
        cb
    );
}

//Css vendors
function cssVendor () {
    return src(vendors.css)
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(dest(pathDest.css));
} 
//Js vendors
function jsVendor (cb) {
    return pump([
            src(vendors.js),
            concat('vendor.min.js'),
            uglify(),
            dest(pathDest.js)
        ],
        cb
    );
}

//Server
function reload () {
    return src('app')
        .pipe(server({
            port: true,
            directoryListing: true,
            open: true
        }));
}

// BrowserSync
function browsersync(done) {
    browserSync.init({
      server: {
        baseDir: "./app/"
      },
      port: 3000
    });
    done();
  }
  
// BrowserSync Reload
function browserSyncReload(done) {
    browserSync.reload();
    done();
}


//Watch 
function watchFiles () {
    watch('app/*.html', series(browserSyncReload));
    watch('app/css/src/**/*.scss', series(scss, browserSyncReload));
    watch('app/js/src/*.js', series(jsTask, browserSyncReload));
    watch(vendors.css, series(cssVendor, browserSyncReload));
    watch(vendors.js, series(jsVendor, browserSyncReload));
}

const build = series(parallel(watchFiles, browsersync));

// exports.htmlSSI = htmlSSI;
exports.scss = scss;
exports.jsTask = jsTask;
exports.cssVendor = cssVendor;
exports.jsVendor = jsVendor;
exports.browsersync = browsersync;
exports.watchFiles = watchFiles;
exports.default = build;