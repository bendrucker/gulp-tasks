'use strict';

var gulp   = require('gulp');
var server = require('./server');
var bundle = require('./bundle');

module.exports = function (srcMap, options) {
  for (var path in srcMap) {
    var task = srcMap[path];
    if (task !== 'bundle') {
      gulp.watch(path, [task]);
    }
    else {
      bundle.get(path, {
        watch: true
      })
      .on('update', writeBundle);
    }
  }

  function writeBundle () {
    bundle.bundle().pipe(gulp.dest(options.build + '/scripts'));
  }

  server.livereload.listen();
  gulp.watch(options.build + '/**/*', server.livereload.changed);

  return writeBundle();  
};

module.exports.rawSrc = true;
module.exports.dest = false;
