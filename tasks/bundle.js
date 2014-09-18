'use strict';

var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var streamqueue = require('streamqueue');
var uglify      = require('gulp-uglify');
var rev         = require('gulp-rev');
var templates   = require('./templates');
var env         = require('../utils/env');
var manifest    = require('../utils/manifest');

function build (path) {
  var b = browserify()
    .add(path)
    .transform('browserify-shim');

  if (!env.isDev) b.tranform('uglifyify');

  return b
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer());
}

module.exports = function (path, options) {
  var bundle = build(path);
  if (env.isDev) {
    return bundle;
  }
  else {
    return streamqueue({objectMode: true}, bundle, templates.cache(templates, {
      module: options.module
    }))
    .pipe(uglify())
    .pipe(rev())
    .pipe(manifest());
  }
};

module.exports.options = {
  src: 'path'
};
