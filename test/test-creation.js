/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

var defaultSpecs = {
  'moduleName': 'Test Module!',
  'slugName': 'test-module'
};

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
        'package.json',
        defaultSpecs.slugName + '.info',
        'scripts/' + defaultSpecs.slugName + '.js'
      ]
    };

    var fileContent = [
      ['package.json', new RegExp('"name": "' + defaultSpecs.slugName + '"')],
      ['test-module.info', new RegExp('name = ' + defaultSpecs.moduleName)]
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': defaultSpecs.moduleName
    });

    helpers.verifyGeneratedFiles(this.app, files, fileContent, done);
  });
  it('replaces placeholders in meta-data files with appropriate content', function (done) {
    var files = {
      expected: [
        'package.json',
        defaultSpecs.slugName + '.info'
      ]
    };
    var fileContent = [
      ['package.json', new RegExp('"name": "' + defaultSpecs.slugName + '"')],
      ['test-module.info', new RegExp('name = ' + defaultSpecs.moduleName)]
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': defaultSpecs.moduleName
    });

    helpers.verifyGeneratedFiles(this.app, files, fileContent, done);
  });
  it('can describe itself', function(done) {
    var files = {
      expected: [
        'package.json',
        defaultSpecs.slugName + '.info',
        defaultSpecs.slugName + '.module'
      ]
    };
    var moduleDescription = 'This module is being tested for the presence of this string';
    var fileContent = [
      ['package.json', new RegExp('"description": "'+ moduleDescription + '"')],
      [defaultSpecs.slugName + '.info', new RegExp('description = ' + moduleDescription + '')],
      [defaultSpecs.slugName + '.module', new RegExp(moduleDescription)]
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': defaultSpecs.moduleName,
      'moduleDescription': moduleDescription
    });

    helpers.verifyGeneratedFiles(this.app, files, fileContent, done);
  });
});
