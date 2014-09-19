'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var streamqueue = require('streamqueue');
var uglify      = require('gulp-uglify');
var rev         = require('gulp-rev');
var concat      = require('gulp-concat');
var templates   = require('./templates');
var env         = require('../utils/env');
var manifest    = require('../utils/manifest');

var b;
function browserify (path, options) {
  if (!b) {
    b = browserify(options.watch && watchify.args)
      .add(path)
      .transform('browserify-shim');

    if (options.watch) watchify(b);
    if (!env.isDev) b.transform(require('uglifyify'));
  }
  return b;
}

function bundle () {
  return browserify.apply(null, arguments)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer());
}

module.exports = function (path, options) {
  var appBundle = bundle(path, options);
  if (env.isDev) {
    return appBundle;
  }
  else {
    return streamqueue({objectMode: true}, appBundle, templates.cache(gulp.src(options.templates), {
      module: options.module
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(manifest());
  }
};

module.exports.get = browserify;
module.exports.bundle = bundle;

module.exports.rawSrc = true;
