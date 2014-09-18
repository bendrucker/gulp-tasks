'use strict';

var rimraf = require('gulp-rimraf');

module.exports = function (stream) {
  return stream.pipe(rimraf());
};

module.exports.options = {
  read: false
};
