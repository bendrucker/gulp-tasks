'use strict';

/*
concatenate vendor scripts
*/

var concat   = require('gulp-concat');
var uglify   = require('uglify');
var rev      = require('gulp-rev');
var env      = require('../utils/env');
var manifest = require('../utils/manifest');

module.exports = function (stream) {
  return stream
    .pipe(concat('vendor.js'));
    .pipe(env.not('development', uglify()))
    .pipe(env.not('development', rev()))
    .pipe(env.not('development', manifest()));
};
