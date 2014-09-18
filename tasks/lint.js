'use strict';

/*
* lint code
* print failures with stylish
* emit an 'error' if failures
*/

var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function (stream) {
  return stream
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
};
