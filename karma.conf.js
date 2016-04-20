// Karma configuration

var webpackConf = require('./webpack.config.js');
delete webpackConf.entry;
webpackConf.module.loaders[0].loader = 'isparta'; //instrument

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],//, 'fixture'


    // list of files / patterns to load in the browser
    files: [
    // {pattern: 'spec/fixtures/*.html', watched: true, included: false, served: true},
      // "bower_components/jquery/dist/jquery.js",
      // "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
      // 'spec/fixtures/*.html',
      // 'lib/imagine.js',
      // 'spec/**/*.spec.js',
      // 'spec/**/*.spec.coffee'
      'spec/imagine.spec.js',
      'spec/imagine/utils.spec.js',
      'spec/imagine/object.spec.js',
      'spec/imagine/time.spec.js',
      'spec/imagine/input.spec.js',
      'spec/polyfill.spec.js',
      'spec/test.spec.js',
      // 'spec/imagine/engine.spec.js'
    ],


    // list of files to exclude
    exclude: [
      'spec/imagine/engine.spec.js' //fuck that guy
      // 'spec/component/collider.spec.js',
      // 'spec/imagine/input/mouse.spec.coffee'
      // 'spec/component/element.spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // '**/*.coffee': ['coffee'],
        // '**/*.html': ['html2js'],
        // '**/*.json': ['html2js']
        '**/*spec.js': ['webpack']
        // '**/*.js': ['coverage']
    },

    webpack: webpackConf,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters:[
        {type: 'text'},
        {
          type : 'html',
          dir : 'coverage/'
        }
      ]
    },
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['Chrome'],
    // browsers: ['Chrome', 'Firefox'],

    singleRun: false
  });
};
