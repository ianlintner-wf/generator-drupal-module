/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

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
    var expected = [
      // add files you expect to exist here.
      'Gruntfile.js',
      'package.json',
      'test.info',
      'scripts/test.js'
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': 'test'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
  it('generates without JS scripts', function (done) {
    var expected = [
      // add files you expect to exist here.
      'Gruntfile.js',
      'package.json',
      'test.info'
    ], unexpected = [
      'scripts/test.info'
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': false,
      'addSass': true,
      'moduleName': 'test'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertNoFile(unexpected);
      done();
    });
  });
  it('transforms the module name into filenames correctly', function (done) {
    var expected = [
      // add files you expect to exist here.
      'Gruntfile.js',
      'package.json',
      'test-module.info',
      'scripts/test-module.js'
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': 'Test Module!'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
