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
      'testModule.info',
      'scripts/testModule.js'
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': true,
      'addSass': true,
      'moduleName': 'testModule'
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
      'testModule.info'
    ], unexpected = [
      'scripts/testModule.info'
    ];

    helpers.mockPrompt(this.app, {
      'addScripts': false,
      'addSass': true,
      'moduleName': 'testModule'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertNoFile(unexpected);
      done();
    });
  });
});
