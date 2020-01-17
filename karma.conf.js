module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/cl-rut.min.js',
      'test/tests.spec.js'
    ],
    reporters: ['progress'],
    port: 9876,  // Karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome', 'Firefox', 'FirefoxDeveloper', 'Opera'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    plugins: [
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-opera-launcher'),
      require('karma-mocha'),
      require('karma-chai')
    ],
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};
