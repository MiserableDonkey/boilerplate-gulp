var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var path = require('path');
var del = require('del');
var yargs = require('yargs');
var decache = require('decache');
var fs = require('vinyl-fs');
var parallel = require('concurrent-transform');
var merge = require('merge2');
var runSequence = require('run-sequence');
var util = require('util');
var source = require('vinyl-source-stream');

var _ = require('underscore');
var $ = plugins;
var config = require('./gulp-tasks/config')(yargs);

// Processes
var _clean = require('./gulp-tasks/clean')(config, gulp, $, path, del);
var _browserSync = require('./gulp-tasks/browser-sync')(config, gulp, $, _, path, source, browserSync);
var _watch = require('./gulp-tasks/watch')(config, gulp, $, path, browserSync);
var _templates = require('./gulp-tasks/templates')(config, gulp, $, path, del, merge, decache, browserSync);
var _styles = require('./gulp-tasks/styles')(config, gulp, $, path, del, browserSync);
var _scripts = require('./gulp-tasks/scripts')(config, gulp, $, path, del, merge, browserSync);
var _images = require('./gulp-tasks/images')(config, gulp, $, path, del);
var _copy = require('./gulp-tasks/copy')(config, gulp, $, path, del, browserSync);

gulp.task('templates:develop', _templates().develop);
gulp.task('styles:develop', _styles().develop);
gulp.task('scripts:develop', _scripts().develop);
gulp.task('images:develop', _images().develop);
gulp.task('browserSync:develop', _browserSync().develop);
gulp.task('watch:develop', _watch().develop);
gulp.task('clean:develop', _clean().develop);
gulp.task('copy:develop', _copy().develop);

gulp.task('templates:distribute', _templates().distribute);
gulp.task('styles:distribute', _styles().distribute);
gulp.task('scripts:distribute', _scripts().distribute);
gulp.task('images:distribute', _images().distribute);
gulp.task('clean:distribute', _clean().distribute);
gulp.task('copy:distribute', _copy().distribute);

gulp.task('default', ['develop']);
gulp.task('dev', ['develop']);
gulp.task('distribute', ['distribute']);

gulp.task('develop', function() {
  runSequence(
    'clean:develop',
    'templates:develop',
    'scripts:develop',
    'styles:develop',
    'images:develop',
    'copy:develop',
    'browserSync:develop',
    'watch:develop'
  );
});

gulp.task('distribute', function() {
  runSequence(
    'clean:distribute',
    'styles:distribute',
    'scripts:distribute',
    'images:distribute',
    'templates:distribute',
    'copy:distribute'
  );
});
