'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';


const src = './src/**/*.js';
const test = './spec/**/*.js';
const config = ['gulpfile.babel.js', 'karma.conf.js', 'webpack.config.js'];

gulp.task('default', ['lintconfig', 'build', 'watch']);

gulp.task('lint', () => {
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lintconfig', () => {
  return gulp.src(config)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('linttests', () => {
  return gulp.src(test)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack', ['lint'],  () => {
  return gulp.src('src/imagine.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('lib/'));
});

gulp.task('build', ['webpack']);
gulp.task('watch', () => {
  gulp.watch(src, ['build']);
  gulp.watch(config, ['lintconfig']);
  gulp.watch(test, ['linttests']);
});
