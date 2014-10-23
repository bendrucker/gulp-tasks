'use strict';

var _    = require('lodash');
var gulp = require('gulp');

exports.use = function (name, src, dest, options) {
  var task = _.defaults(require('../tasks/' + name), {
    src: true,
    dest: true
  });
  options = _.defaults(options || {}, {
    prerequisites: []
  });
  gulp.task(name, options.prerequisites, function () {
    var input;
    if (task.src) input = task.rawSrc ? src : gulp.src(src, task.srcOptions);

    var result = task(input, options);

    if (task.dest) return result.pipe(gulp.dest(dest));
    return result;
  });
};

exports.env = require('../utils/env');
