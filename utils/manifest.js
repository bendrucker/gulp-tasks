'use strict';

var through = require('through2');
var path    = require('path');

var filenameMap = {};

module.exports = function () {
  return through.obj(function (file, enc, callback) {
    filenameMap[path.basename(file.revOrigPath)] = path.basename(file.path);
    this.push(file);
    callback();
  });
};

module.exports.replace = function () {
  return through.obj(function (file, enc, callback) {
    var body = String(file.contents);
    for (var originalName in filenameMap) {
      body = body.replace(originalName, filenameMap[originalName]);
    }
    file.contents = new Buffer(body);
    this.push(file);
    callback();
  });
};
