// https://npmjs.org/package/grunt-contrib
module.exports = function(grunt) {  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>.\n' +
        ' * Licensed under the <%= pkg.license.name %> license.\n */ '
    },


    concat: {
      options: {},

      scripts: {
        src: [
          'src/js/<%= pkg.name %>.prefix',
          'src/js/block.js',
          'src/js/template.js',
          'src/js/init.js',
          'src/js/<%= pkg.name %>.suffix'
        ],

        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      },

      templates: {
        src: [
          'src/templates/*.js',
        ],

        dest: 'dist/compiled-templates-<%= pkg.version %>.js'
      }
    },


    'string-replace': {
      version: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.js': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
        },
        options: {
          replacements: [
            {
              pattern: '@VERSION',
              replacement: '<%= pkg.version %>'
            }
          ]
        }
      }
    },


    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        report: 'gzip',
        compress: true,
        drop_console: true
      },

      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
          'dist/compiled-templates-<%= pkg.version %>.min.js': ['dist/compiled-templates-<%= pkg.version %>.js'],
          'dist/handlebars.runtime-v2.0.0.min.js': ['src/js/handlebars.runtime-v2.0.0.js']
        }
      }
    },


    watch: {
      scripts: {
        files: ['src/js/*.js', 'src/js/<%= pkg.name %>.prefix', 'src/js/<%= pkg.name %>.suffix', 'src/templates/*.js'],
        tasks: ['default'],
        options: { spawn: false }
      }
    },


    connect: {
      dev: {
        options: {
          port: 9000,
          keepalive: true
        }
      }
    }
  });


  [// Load the Grunt plugins.
    'grunt-contrib-concat',
    'grunt-string-replace',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-contrib-connect'
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('server', ['connect:dev']);
  grunt.registerTask('default', ['concat', 'string-replace', 'uglify']);
};
