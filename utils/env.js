'use strict';

/*
utilities for acting on an --env flag
*/

var util = require('gulp-util');
var iff  = require('gulp-if');

exports.env = util.env.env || 'development';

exports.is = function (environments) {
  environments = Array.isArray(environments) ? environments : [].slice.call(arguments, 0);
  return environments.indexOf(exports.env) !== -1;
};

exports.isDev = exports.is('development');

exports.if = function (environments) {
  return iff.apply(null, [exports.is(environments)].concat([].slice.call(arguments, 1)));
};
exports.not = function (environments) {
  return iff.apply(null, [!exports.is(environments)].concat([].slice.call(arguments, 1)));
};
