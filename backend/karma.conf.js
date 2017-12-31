// Karma configuration
// Generated on Wed Nov 23 2016 19:36:12 GMT-0500 (EST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        preprocessors: {
            'src/**/*.html': ['ng-html2js'],
            'src/**/!(*.mock|*.spec).js': ['coverage']
        },

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['sinon', 'mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            "node_modules/angular/angular.js",
            "node_modules/angular-route/angular-route.js",
            "node_modules/angular-animate/angular-animate.js",
            "node_modules/angular-touch/angular-touch.min.js",
            "node_modules/angular-sanitize/angular-sanitize.min.js",
            "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
            "node_modules/angular-aria/angular-aria.js",
            "node_modules/angular-material/angular-material.js",
            "node_modules/angular-messages/angular-messages.min.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js",
            'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
            "node_modules/ui-select/dist/select.min.js",

            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.module.js',
            'testing/**/*.js',
            'src/**/*.js',
            'src/**/*.html'


        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9001,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        plugins: [
            require('phantomjs-polyfill'),
            require('karma-mocha'),
            require('karma-phantomjs-launcher'),
            require('karma-chai'),
            require('karma-coverage'),
            require('karma-junit-reporter'),
            require('karma-ng-html2js-preprocessor'),
            require('chai-as-promised'),
            require('karma-sinon'),
            require('karma-chai-as-promised')

        ],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
