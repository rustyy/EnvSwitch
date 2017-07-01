const gulp = require('gulp');
const sass = require('gulp-sass');
const rollup = require('rollup');

// rollup plugins.
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

gulp.task('default', ['copy', 'sass', 'rollupOptions', 'rollupPopUp', 'watch']);

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/options.js', ['rollupOptions']);
  gulp.watch('src/popup.js', ['rollupPopUp']);
  gulp.watch(['src/options.html'], ['copy']);
  gulp.watch(['src/popup.html'], ['copy']);
});

const filesToCopy = [
  './src/options.html',
  './src/popup.html',
  './src/manifest.json',
];

gulp.task('copy', function() {
  gulp.src(filesToCopy).pipe(gulp.dest('./build'));
  gulp.src('./src/icons/**/*').pipe(gulp.dest('./build/icons'));
});

gulp.task('sass', () => {
  gulp.src('src/scss/**/*.scss').pipe(sass({
    outputStyle: 'compressed',
  }).on('error', sass.logError)).pipe(gulp.dest('build/css/'));
});

/* ---------------------------------------------------------------------------
 * Rollup setup
 --------------------------------------------------------------------------- */

const rollupPlugins = [
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
];

gulp.task('rollupOptions', function() {
  return rollup.rollup({
    entry: 'src/options.js',
    plugins: rollupPlugins,
  }).then(function(bundle) {
    bundle.write({
      format: 'iife',
      dest: './build/options.js',
      sourceMap: 'inline',
    });
  });
});

gulp.task('rollupPopUp', function() {
  return rollup.rollup({
    entry: 'src/popup.js',
    plugins: rollupPlugins,
  }).then(function(bundle) {
    bundle.write({
      format: 'iife',
      dest: './build/popup.js',
      sourceMap: 'inline',
    });
  });
});

