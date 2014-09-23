'use strict';

/*
Starts a superstatic server
*/

var _           = require('lodash');
var Promise     = require('bluebird');
var superstatic = require('superstatic');
var connectLr   = require('connect-livereload');
var livereload  = require('gulp-livereload');
var env         = require('../utils/env');

module.exports = function (src, options) {
  var server = superstatic(_.defaults(options || {}, {
    root: src,
    host: '0.0.0.0',
    port: 8000
  }));

  if (env.is('development')) server.use(livereload());

  return Promise.promisify(server.listen, server)();
};

module.exports.livereload = livereload;

module.exports.rawSrc = true;
module.exports.dest = false;
