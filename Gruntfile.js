module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        all: ['Gruntfile.js', 'app/*.js'],
        options: {
          jshintrc: '.jshintrc'
        }
    }
  });

// Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

// Default task(s).
  grunt.registerTask('default', ['jshint']);
};
