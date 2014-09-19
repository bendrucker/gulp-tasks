'use strict';

var gulp   = require('gulp');
var server = require('./tasks/server');
var bundle = require('./bundle');

module.exports = function (srcMap, options) {
  for (var path in srcMap) {
    var task = srcMap[path];
    if (task !== 'bundle') gulp.watch(path, [srcMap[path]]);
  }

  server.livereload.listen();
  gulp.watch(options.glob, server.livereload.changed);

  bundle.get().on('update', function () {
    bundle.bundle().pipe(gulp.dest(options.build));
  });
};

module.exports.rawSrc = true;
module.exports.dest = false;
