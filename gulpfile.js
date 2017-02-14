// --------------------------------------------------------------------
// Define Plugins
// --------------------------------------------------------------------

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    // needed to load non-gulp-plugins
    pattern: '*',
});

// --------------------------------------------------------------------
// Task: clean
// delete production folder
// --------------------------------------------------------------------

gulp.task('clean', function() {
    return $.del.sync('dist');
});

// --------------------------------------------------------------------
// Task: sass
// compile scss-files into one css-file
// --------------------------------------------------------------------

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'scss/nav-and-footer',
    'scss/content'
];

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe($.sass({includePaths: sassPaths}).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(gulp.dest('css'));
});

// --------------------------------------------------------------------
// Task: mincss
// minify the css-file generated with sass
// --------------------------------------------------------------------

gulp.task('mincss', ['sass'], function () {
    return gulp.src('css/*.css')
        .pipe($.csso())
        .pipe(gulp.dest('dist/css'));
});

// --------------------------------------------------------------------
// Task: concat
// take all js-files and generate a singel one out of them
// --------------------------------------------------------------------

// order of files -> order in final js
var jsFiles = [
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/dist/foundation.js',
    'js/jquery.easing.1.3.js',
    'plugins/remodal/remodal.js',
    'plugins/owl-carousel/owl.carousel.js',
    'bower_components/maplace-js/dist/maplace.js',
    'bower_components/scrollreveal/dist/scrollreveal.js',
    'js/script.js'
];

gulp.task('concat', function () {
    return gulp.src(jsFiles)
        .pipe($.concat('app.js'))
        .pipe(gulp.dest('js'));
});

// --------------------------------------------------------------------
// Task: minjs
// minify the js-file generated with concat
// --------------------------------------------------------------------

gulp.task('minjs', ['concat'], function () {
    return gulp.src('js/app.js')
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'));
});

// --------------------------------------------------------------------
// Task: copy
// copy specific files to the 'dist'-folder
// --------------------------------------------------------------------

gulp.task('copy:dev', function() {
    var cpjquery = gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('js'));
    
    return $.mergeStream(cpjquery);
});

gulp.task('copy:dist', function() {
    var cphtml = gulp.src('*.html')
        .pipe(gulp.dest('dist'));
    
    var cpimgs = gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img'));
    
    var cpplugins = gulp.src(['plugins/**/*', '!plugins/**/*.js'])
        .pipe(gulp.dest('dist/plugins'));
    
    var cpjquery = gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
    
    return $.mergeStream(cphtml, cpimgs, cpplugins, cpjquery);
});

// --------------------------------------------------------------------
// Task: build
// delete 'dist'-folder and make a new one with optimized files
// --------------------------------------------------------------------

gulp.task('build', function(callback) {
    $.runSequence('clean', ['mincss', 'minjs'], 'copy:dist', callback);
});

// --------------------------------------------------------------------
// default Task
// watch for file changes and override generated files
// --------------------------------------------------------------------

gulp.task('default', ['sass', 'concat', 'copy:dev'], function() {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['js/**/*.js'], ['concat']);
});