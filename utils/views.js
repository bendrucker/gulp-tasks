'use strict';

var through = require('through2');

exports.strip = function () {
  return through.obj(function (file, enc, callback) {
    file.path = file.path.replace('/views', '');
    this.push(file);
    callback();
  });
};
