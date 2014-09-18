'use strict';

var htmlmin  = require('gulp-htmlmin');
var manifest = require('../utils/manifest');
var env      = require('../utils/env');

/*
minify index.html and replace revved assets
*/

module.exports = function (stream) {
  return stream
    .pipe(env.not('development', manifest.replace()));
    .pipe(env.not('development', htmlmin({
      collapseWhitespace: true
    })));
};
