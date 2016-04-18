'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('default', () => {
  console.log("yolo");
});


gulp.task('lint', () => {
  return gulp.src('./src/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
})
