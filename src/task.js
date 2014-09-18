'use strict';

var _ = require('lodash');

exports.register = function (gulp, name, src, dest) {
  var task = _.defaults(require('./tasks/' + name), {
    src: true,
    dest: true
  });
  gulp.task(name, function () {
    var input;
    if (task.src === 'path') {
      input = task.src;
    }
    else if (task.src) {
      input = gulp.src(task.src);
    };

    var result = task(input);

    if (task.dest) return result.pipe(gulp.dest(dest));
    return result;
  });
}
