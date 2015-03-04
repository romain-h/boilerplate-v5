var connect = require('gulp-connect');
var gulp = require('gulp');
var util = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');

// Server task
gulp.task('connect', function() {
  connect.server({
    port: 8765,
    livereload: true
  });
});

// Watch html
gulp.task('html', function () {
  gulp.src('./**/*.html')
  .pipe(connect.reload());
});

var bundler = watchify(browserify('./app/main.js', {
  cache: {},
  packageCache: {},
  fullPaths: true,
  debug: true
}));

bundler.transform(babelify);

var bundle = function () {
  return bundler.bundle()
    // log errors if they happen
    .on('error', util.log.bind(util, 'Browserify Error'))
    .on('log', util.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
};

gulp.task('js', bundle);
bundler.on('update', bundle); // on any dep update, runs the bundler

// Default task to run without params
gulp.task('default', ['connect', 'js'], function() {
  // Watch less files and compile
  gulp.watch('./**/*.html', ['html']);
});
