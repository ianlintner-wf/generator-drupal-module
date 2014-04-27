'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');

var DrupalModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);
    this.log(chalk.magenta('Let\'s make a Drupal module!'));

    var prompts = [{
      name: 'moduleName',
      message: 'What should I name your module?'
    }, {
      type: 'confirm',
      name: 'addScripts',
      message: 'Does your module need any JavaScript?',
      default: true
    }, {
      type: 'confirm',
      name: 'addSass',
      message: 'Does your module need to use Sass?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      var slugName = _s.slugify(this.moduleName);

      this.addScripts = props.addScripts;
      this.scripts = this.addScripts ? 'scripts[] = scripts/' + slugName + '.js': '';

      this.addSass = props.addSass;
      this.stylesheets = this.addSass ? 'stylesheets[all][] = sass/' + slugName + '.sass' : '';
      done();
    }.bind(this));
  },

  app: function () {
    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.template('_module.info', _s.slugify(this.moduleName) + '.info');

    if (this.addScripts) {
      this.copy('scripts/_script.js', 'scripts/' + _s.slugify(this.moduleName)  + '.js');
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = DrupalModuleGenerator;
