// Karma configuration

var webpackConf = require('./webpack.config.js');
delete webpackConf.entry;
webpackConf.module.loaders[0].loader = 'isparta'; //instrument

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine', 'fixture'],//

    // list of files / patterns to load in the browser
    files: [
    // {pattern: 'spec/fixtures/*.html', watched: true, included: false, served: true},
      'spec/fixtures/*.html',
      'spec/**/*.spec.js',
    ],

    // list of files to exclude
    exclude: [
      'spec/imagine.component.spec.js', //he should be put somewhere else
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*spec.js': ['webpack']
    },

    webpack: webpackConf,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'screenshot'], //

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

    singleRun: false,

    customLaunchers:{
      'screenshot': {
        base: 'Chrome',

      }
    }

    // //screenshot mode
    // browsers: ['PhantomJS_custom'],
    // customLaunchers: {
    //   'PhantomJS_custom': {
    //     base: 'PhantomJS',
    //     options: {
    //       windowName: 'my-window',
    //       settings: {
    //         webSecurityEnabled: false
    //       },
    //     },
    //     flags: ['--load-images=true'],
    //     // debug: true
    //   }
    // },
    //
    // phantomjsLauncher: {
    //   // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    //   exitOnResourceError: true
    // }

  });
};
