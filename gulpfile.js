'use strict';
const {src, dest, watch, series} = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

exports.less = function () {
    return src('./src/less/main.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/styles'));
};

exports.watch = function () {
    watch('./src/less/*.less', series('less'));
};
