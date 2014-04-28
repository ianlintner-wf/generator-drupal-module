/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

helpers.verifyGeneratedFiles = function(app, files, fileContent, done) {
  app.options['skip-install'] = true;
  app.run({}, function () {

    if (files.expected) {
      helpers.assertFile(files.expected);
    }

    if (files.unexpected) {
      helpers.assertNoFile(files.unexpected);
    }

    if (fileContent) {
      helpers.assertFileContent(fileContent);
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

    helpers.verifyGeneratedFiles(this.app, files, false, done);
  });
  it('generates without JS scripts', function (done) {
    var files = {
      unexpected: [
        'scripts/test.js'
      ]
    };

    helpers.mockPrompt(this.app, {
      'addScripts': false,
      'moduleName': 'test'
    });

    helpers.verifyGeneratedFiles(this.app, files, false, done);
  });
  it('transforms the module name into filenames correctly', function (done) {
    var files = {
      expected: [
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

    helpers.verifyGeneratedFiles(this.app, files, false, done);
  });
  it('replaces placeholders in meta-data files with appropriate content', function (done) {
    var files = {
      expected: [
        'package.json',
        'test-module.info'
      ]
    };
    var fileContent = [
      ['package.json', /"name": "test-module"/],
      ['test-module.info', /name = Test module/]
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': 'Test module'
    });

    helpers.verifyGeneratedFiles(this.app, files, fileContent, done);
  });
  it('can describe itself', function(done) {
    var files = {
      expected: [
        'package.json',
        'test-module.info',
        'test-module.module'
      ]
    };
    var moduleDescription = 'This module is being tested for the presence of this string';
    var fileContent = [
      ['package.json', new RegExp('"description": "'+ moduleDescription + '"')],
      ['test-module.info', new RegExp('description = ' + moduleDescription + '')],
      ['test-module.module', new RegExp(moduleDescription)]
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': 'Test Module',
      'moduleDescription': moduleDescription
    });

    helpers.verifyGeneratedFiles(this.app, files, fileContent, done);
  });
});
