'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';

const src = './src/**/*.js';

gulp.task('default', ['build', 'watch']);

gulp.task('lint', () => {
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format());
})

gulp.task('webpack', ['lint'],  () => {
  return gulp.src('src/imagine.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('lib/'));
})

gulp.task('build', ['webpack']);

gulp.task('watch', () => {
  gulp.watch(src, ['build']);
})
