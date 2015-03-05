'use strict';

var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var rev         = require('gulp-rev');
var env         = require('../utils/env');
var manifest    = require('../utils/manifest');

var b;
function bro (path, options) {
  if (!b) {
    b = browserify(options.watch && watchify.args)
      .add(path);

    if (options.watch) watchify(b);
    if (!env.isDev) b.transform(require('uglifyify'));
  }
  return b;
}

function bundle () {
  return bro.apply(null, arguments)
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
    return appBundle
      .pipe(uglify())
      .pipe(rev())
      .pipe(manifest());
  }
};

module.exports.get = bro;
module.exports.bundle = bundle;

module.exports.rawSrc = true;
