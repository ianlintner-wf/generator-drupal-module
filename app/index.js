'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');

var DrupalModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function() {
            this.log(chalk.magenta('Your module is ready for development. Use "grunt watch" and hack away!'));
          }.bind(this)
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);
    this.log(chalk.magenta('Before we begin making your module, let\'s double check we\'re in the right place:'));
    this.log(chalk.yellow(process.cwd()));

    this.log(chalk.magenta('If you do NOT want this directory to contain your module files, press Ctrl/CMD + C now.'));

    var prompts = [{
      name: 'moduleName',
      message: 'What should I name your module?'
    }, {
      name: 'moduleDescription',
      message: 'Describe your module'
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
    }, {
      when: function(response) {
        return response.addSass;
      },
      type: 'list',
      name: 'sassSyntax',
      message: 'Which syntax would you prefer?',
      choices: ['sass', 'scss'],
      default: 'sass'
    },{
      type: 'confirm',
      name: 'addSettings',
      message: 'Does your module need an admin settings form?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      var slugName = _s.slugify(this.moduleName);

      this.moduleDescription = props.moduleDescription;

      this.addScripts = props.addScripts;

      this.scripts = this.addScripts ? 'scripts[] = scripts/' + slugName + '.js': '';

      this.addSass = props.addSass;
      this.sassSyntax = props.sassSyntax;

      this.stylesheets = this.addSass ? 'stylesheets[all][] = sass/' + slugName + '.' + this.sassSyntax : '';
      this.addSettings = props.addSettings;
      this.slugName = slugName;
      done();
    }.bind(this));
  },

  app: function () {
    var slugName = _s.slugify(this.moduleName);

    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.template('_module.info', slugName + '.info');
    this.template('_module.module', slugName + '.module');

    if (this.addScripts) {
      this.copy('scripts/_script.js', 'scripts/' + slugName  + '.js');
    }

    if (this.addSass) {
      this.copy('css/_module.css', 'css/' + slugName + '.css');
      this.copy('config.rb', 'config.rb');
      this.copy('sass/_module.' + this.sassSyntax,
                'sass/' + slugName + '.' + this.sassSyntax);
    }

    if(this.addSettings) {
      this.copy('_module.admin.inc', slugName + '.admin.inc');
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = DrupalModuleGenerator;
