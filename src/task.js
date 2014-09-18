'use strict';

var _    = require('lodash');
var gulp = require('gulp');

exports.register = function (name, src, dest, options) {
  var task = _.defaults(require('../tasks/' + name), {
    src: true,
    dest: true
  });
  gulp.task(name, function () {
    var input;
    if (task.src) input = task.options.rawSrc ? src : gulp.src(src, task.srcOptions);

    var result = task(input, options);

    if (task.dest) return result.pipe(gulp.dest(dest));
    return result;
  });
};
