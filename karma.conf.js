// Karma configuration
// Generated on Sat Apr 09 2016 19:51:53 GMT-0300 (CLST)

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/cl-rut.js'
    ],
    exclude: ['test/node.js'],
    preprocessors: {},
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Firefox'],
    singleRun: true,
    concurrency: 1
  });
};
