const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    postRequireTransforms: {
        sass: function(sass) {
            return sass(require('sass'));
        },
    },
});
const log = require('fancy-log');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
//const path = require('path');
const changed = require('gulp-changed');
const config = {
    'src': 'src/',
    'dest': 'build/',
    'scripts': 'build/js/components',
    'live': '../',
    'minify': false,
};
const packageJson = require('./package.json');
const nodeDependencies = Object.keys(packageJson.dependencies).
    map(function(dependency) {
        return 'node_modules/' + dependency + '/' +
            packageJson.dependenciesSrc[dependency];
    });

// Compile twig files
function templates() {
    return gulp.src(config.src + 'templates/pages/*.twig').
        pipe($.twig()).
        on('error', function(error) {
            log.error(error.message);
            this.emit('end');
        }).
        pipe($.htmlBeautify({
            indentSize: 4,
        })).
        pipe(gulp.dest(config.dest)).
        pipe(browserSync.stream());
}

// Validate HTML
function validateHtml() {
    return gulp.src(config.dest + '*.html').
        pipe($.w3cHtmlValidator()).
        pipe($.w3cHtmlValidator.reporter());
}

// Compile and autoprefix stylesheet files
function styles() {
    return gulp.src(config.src + 'styles/*.scss').
        pipe($.sassGlob()).
        pipe($.sass({
            precision: 8,
            outputStyle: 'expanded',
        }).on('error', $.sass.logError)).
        pipe($.postcss([
            autoprefixer(),
        ])).
        pipe(gulp.dest(config.dest + 'css')).
        pipe(browserSync.stream()).
        pipe($.if(config.minify, $.cleanCss())).
        pipe($.if(config.minify, $.rename({suffix: '.min'}))).
        pipe($.if(config.minify, gulp.dest(config.dest + 'css'))).
        pipe(browserSync.stream());
}

// Function stylelint
function stylelint() {
    return gulp.src(config.src + 'styles/**/*.scss').pipe($.postcss([
        require('stylelint')({fix: true}),
    ], {
        syntax: require('postcss-scss'),
    })).pipe(gulp.dest(config.src + 'styles'));
}

// Compile javascript files
function scripts() {
    return gulp.src(config.src + 'scripts/**/!(_)*.js').
        pipe($.include().on('error', function(error) {
            log.error(error.message);
            this.emit('end');
        })).
        pipe(gulp.dest(config.dest + 'js')).
        pipe(browserSync.stream()).
        pipe($.if(config.minify, $.uglify().on('error', function(error) {
            log.error(error.message);
            this.emit('end');
        }))).
        pipe($.if(config.minify, $.rename({suffix: '.min'}))).
        pipe($.if(config.minify, gulp.dest(config.dest + 'js'))).
        pipe(browserSync.stream());
}

// Function copy changes
function copyChanges(src, dest) {
    return gulp.src(src).pipe(changed(dest)).pipe(gulp.dest(dest));
}

// Copy node_modules files to build
//function copyNodeModuleDependencies() {
//    return gulp.src(nodeDependencies).
//        pipe(changed(config.scripts)).
//        pipe(gulp.dest(config.scripts));
//}

// Copy assets to build
function copyAssets() {
    copyChanges('assets/fonts/**/*', config.dest + 'fonts');
    copyChanges('assets/images/**/*', config.dest + 'images');
    return copyChanges('assets/icons/**/*', config.dest + 'icons');
    //return copyChanges('assets/contents/**/*', config.dest + 'Contents');
}

// Publish files to koch_theme
function publish() {
    copyChanges(config.dest + 'fonts/**/*', config.live + 'Fonts');
    copyChanges(config.dest + 'images/**/*', config.live + 'Images');
    copyChanges(config.dest + 'icons/**/*', config.live + 'Icons');
    copyChanges(config.dest + 'js/**/*', config.live + 'Javascript');
    copyChanges(config.dest + '/*.html', config.live + '');
    return copyChanges(config.dest + 'css/**/*', config.live + 'Css');
}

// Serve files
function serve(done) {
    browserSync.init({
        server: config.dest,
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
            },
        },
    });
    done();
}

// Watch files for changes
function watch(done) {
    gulp.watch(config.src + 'assets/**/*', gulp.series(copyAssets, publish));
    gulp.watch(config.src + 'templates/**/*.twig', templates);
    gulp.watch(config.src + 'styles/**/*.scss', gulp.series(styles, publish));
    gulp.watch(config.src + 'scripts/**/*.js', gulp.series(scripts, publish));
    done();
}

const build = gulp.series(templates, styles, scripts, copyAssets, publish);

gulp.task('default', gulp.series(build, gulp.parallel(serve, watch)));

gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('lint', stylelint);
gulp.task('validate', validateHtml);
//gulp.task('copyNodeModuleDependencies', copyNodeModuleDependencies);
gulp.task('copyAssets', copyAssets);
gulp.task('publish', publish);
