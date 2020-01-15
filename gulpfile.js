const source = require('vinyl-source-stream');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const jsdox = require('jsdox');
const gulp = require('gulp');
const del = require('del');

const SOURCES = {
  BROWSER: 'src/lib.js'
};

const UGLIFY_OPTS = {
  MIN: {
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    }
  },

  DEV: {
    compress: false,
    mangle: false,
    output: {
      beautify: true
    }
  }
};

/**
 * Builds the browser versions.
 *
 * @param {boolean} min Whether the output should be minified.
 *
 * @returns {object} The gulp stream object.
 */
function browser (min) {
  const b = browserify({
    entries: SOURCES.BROWSER,
    standalone: 'rut',
    debug: true
  });

  return b.bundle()

    .pipe(source('bundle.tmp.js'))

    .pipe(buffer())

    .pipe(uglify(min ? UGLIFY_OPTS.MIN : UGLIFY_OPTS.DEV).on('error', gutil.log))

    .pipe(rename({
      basename: 'fi-rut',
      extname: min ? '.min.js' : '.js'
    }))

    .pipe(gulp.dest('dist'));
}

/**
 * Builds the AngularJS versions.
 *
 * @param {boolean} min Whether the output should be minified.
 *
 * @returns {object} The gulp stream object.
 */
function angular (min) {
  return gulp.src(SOURCES.ANGULAR)

    .pipe(concat('bundle.tmp.js'))

    .pipe(uglify(min ? UGLIFY_OPTS.MIN : UGLIFY_OPTS.DEV).on('error', gutil.log))

    .pipe(rename({
      basename: 'fi-rut-ng',
      extname: min ? '.min.js' : '.js'
    }))

    .pipe(gulp.dest('dist'));
}

/** Distributables */
gulp.task('cleanup', () => {
  del.sync('dist/**/*');
  del.sync('docs/**/*');
  del.sync('lib/**/*');
});

gulp.task('node', () => {
  return gulp.src('src/lib.js')
    .pipe(uglify(UGLIFY_OPTS.DEV).on('error', gutil.log))
    .pipe(rename({
      basename: 'index',
      extname: '.js'
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('browser:dev', browser.bind(null, false));
gulp.task('browser:min', browser.bind(null, true));

gulp.task('angular:dev', ['browser:dev'], angular.bind(null, false));
gulp.task('angular:min', ['browser:min'], angular.bind(null, true));

gulp.task('browser', ['angular:dev', 'angular:min']);

gulp.task('docs', done => {
  return jsdox.generateForDir('./src', './docs', null, done);
});

gulp.task('watch', ['cleanup', 'node', 'browser'], () => {
  gulp.watch('./src/**/*.js', ['cleanup', 'node', 'browser']);
});

gulp.task('default', ['cleanup', 'node', 'browser', 'docs']);
