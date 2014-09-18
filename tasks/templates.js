'use strict';

var htmlmin       = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
var views         = require('../utils/views');
var env           = require('../utils/env');

/*
rewrite template paths for development
*/

module.exports = function (stream) {
  return stream
    .pipe(views.strip())
    .pipe(env.not('development', htmlmin({
      collapseWhitespace: true
    })));
};

/*
generate JS to add the templates to the angular template cache in a run block
*/

module.exports.cache = function (stream, options) {
  return module.exports(stream)
    .pipe(templateCache({
      module: options.module,
      root: '/views'
    }));
};
