const gulp = require('gulp');
const sass = require('gulp-sass');
const rollup = require('rollup');

// rollup plugins.
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

gulp.task('default', ['copy', 'sass', 'rollupOptions', 'watch']);

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['rollupOptions']);
  gulp.watch(['src/options.html'], ['copy']);
  gulp.watch(['src/popup.html'], ['copy']);
});

gulp.task('copy', function() {
  gulp.src([
    './src/options.html',
    './src/popup.html',
    './src/manifest.json',
  ]).pipe(gulp.dest('./build'));

  gulp.src('./src/icons/**/*').pipe(gulp.dest('./build/icons'));
});

gulp.task('sass', () => {
  gulp.src('src/scss/**/*.scss').pipe(sass({
    outputStyle: 'compressed',
  }).on('error', sass.logError)).pipe(gulp.dest('build/css/'));
});

gulp.task('rollupOptions', function() {
  return rollup.rollup({
    entry: 'src/options.js',
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      uglify(),
    ],
  }).then(function(bundle) {
    bundle.write({
      format: 'iife',
      dest: './build/options.js',
      sourceMap: 'inline',
    });
  });
});
