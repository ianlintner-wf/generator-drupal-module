/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
/**
 * app
 * files:
 *   - expected   -> array[string]
 *   - unexpected -> array[string]
 */
helpers.verifyGeneratedFiles = function(app, files, done) {
  app.options['skip-install'] = true;
  app.run({}, function () {
    helpers.assertFile(files.expected);
    if (files.unexpected) {
      helpers.assertNoFile(files.unexpected);
    }
    done();
  });
};

describe('drupal-module generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('drupal-module:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates all expected files', function (done) {
    var files = {
      expected: [
        'Gruntfile.js',
        'package.json',
        'test.info',
        'scripts/test.js'
      ]
    };

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': 'test'
    });

    helpers.verifyGeneratedFiles(this.app, files, done);
  });
  it('generates without JS scripts', function (done) {
    var files = {
      expected: [
        'Gruntfile.js',
        'package.json',
        'test.info'
      ],
      unexpected: [
        'scripts/test.info'
      ]
    };

    helpers.mockPrompt(this.app, {
      'addScripts': false,
      'addSass': true,
      'moduleName': 'test'
    });

    helpers.verifyGeneratedFiles(this.app, files, done);
  });
  it('transforms the module name into filenames correctly', function (done) {
    var files = {
      expected: [
        // add files you expect to exist here.
        'Gruntfile.js',
        'package.json',
        'test-module.info',
        'scripts/test-module.js'
      ]
    };

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': 'Test Module!'
    });

    helpers.verifyGeneratedFiles(this.app, files, done);
  });
});
