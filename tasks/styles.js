'use strict';

var sass    = require('gulp-sass');
var bourbon = require('node-bourbon');
var rev     = require('gulp-rev');
var minify  = require('gulp-minify-css');

/*
compile sass with bourbon
*/

module.exports = function (stream) {
  return stream
    .pipe(sass({
      includePaths: bourbon.includePaths
    }))
    .pipe(env.not('development', rev()))
    .pipe(env.not('development', minify()));
};
