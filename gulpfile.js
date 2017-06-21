const gulp = require('gulp');
const rollup = require('rollup');

// rollup plugins.
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

gulp.task('default', ['copy', 'rollupOptions', 'watch']);

gulp.task('watch', () => {
  gulp.watch('src/options/**/*.js', ['rollupOptions']);
  gulp.watch(['src/options/options.html'], ['copy']);
});

gulp.task('copy', function() {
  gulp.src([
    './src/options/options.html',
    './src/manifest.json',
  ]).pipe(gulp.dest('./build'));

  gulp.src('./src/icons/**/*').pipe(gulp.dest('./build/icons'));
});

gulp.task('rollupOptions', function() {
  return rollup.rollup({
    entry: 'src/options/options.js',
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

