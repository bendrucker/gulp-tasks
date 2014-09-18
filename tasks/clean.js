'use strict';

/*
rm -rf a folder, usually a build directory
*/

var rimraf = require('gulp-rimraf');

module.exports = function (stream) {
  return stream.pipe(rimraf());
};

module.exports.options = {
  read: false
};
