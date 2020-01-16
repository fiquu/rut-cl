const source = require('vinyl-source-stream');
const jsdoc2md = require('jsdoc-to-markdown');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babelify = require('babelify');
const gulp = require('gulp');
const del = require('del');
const fs = require('fs');

/**
 * Builds the test browser version.
 *
 * @returns {object} The gulp stream object.
 */
function build () {
  const bundle = browserify({
    entries: 'lib/index.js',
    standalone: 'clRut'
  }).transform(babelify, {
    presets: ['@babel/preset-env']
  }).bundle();

  return bundle
    .pipe(source('bundle.tmp.js'))
    .pipe(buffer())
    .pipe(rename({
      basename: 'cl-rut',
      extname: '.js'
    }))

    // Create bundled dist:
    .pipe(gulp.dest('dist'))

    // Create bundled minified dist:
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
}

/**
 * Cleans up the output directories.
 *
 * @param {Function} done The done callback.
 */
function cleanup (done) {
  del.sync('dist/**/*');
  del.sync('docs/**/*');

  done();
}

/**
 * Generates the docs.
 *
 * @returns {Promise} The promise to the rendered docs.
 */
async function docs () {
  const data = await jsdoc2md.render({ files: 'lib/*.js' });

  fs.writeFileSync('docs/API.md', data);
}

module.exports.default = gulp.series(cleanup, build, docs);
module.exports.cleanup = cleanup;
module.exports.build = build;
module.exports.docs = docs;
