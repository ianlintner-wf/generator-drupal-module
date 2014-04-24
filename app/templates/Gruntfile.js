module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        all: ['Gruntfile.js', 'scripts/*.js'],
        options: {
          jshintrc: true
        }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          outputStyle: 'compressed'
        }
      },
      dev: {
        option: {
          config: 'config.rb',
          outputStyle: 'expanded'
        }
      }
    },
    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: 'images/src',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    watch: {
      js: {
        files: ['Gruntfile.js', 'scripts/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['sass/*.sass'],
        tasks: ['compass:dist']
      }
    }
  });

// Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-notify');

// Default task(s).
  grunt.registerTask('default', ['jshint', 'compass:dist']);
  grunt.registerTask('debug', ['jshint', 'compass:dev']);
  grunt.registerTask('images', ['newer:imagemin:all']);
};
