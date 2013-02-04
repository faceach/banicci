module.exports = function( grunt ) {
  'use strict';

  var EMPTY = "empty:";
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/components'
    },

    // Coffee to JS compilation
    coffee: {
      compile: {
        files: {
          'temp/scripts/*.js': 'app/scripts/**/*.coffee' 
        },
        options: {
          basePath: 'app/scripts'
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/styles',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }
      }
    },

    // generate application cache manifest
    manifest:{
      dest: ''
    },

    // headless testing through PhantomJS
    mocha: {
      all: ['test/**/*.html']
    },

    // default watch configuration
    watch: {
      coffee: {
        files: 'app/scripts/**/*.coffee',
        tasks: 'coffee reload'
      },
      compass: {
        files: [
          'app/styles/**/*.{scss,sass}'
        ],
        tasks: 'compass reload'
      },
      reload: {
        files: [
          'app/*.html',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/images/**/*'
        ],
        tasks: 'reload'
      }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'Gruntfile.js',
        'app/scripts/**/*.js',
        'spec/**/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    clean: {
      build: ["dist/"]
    },
    copy: {
      dist:{
        files: {
          "dist/images/": "app/images/**/*",
          "dist/scripts/vendor/": [
            "app/scripts/vendor/require.js",
            "app/scripts/vendor/jquery-1.8.3.min.js",
            "app/scripts/vendor/jquery-ui-1.10.0.custom.min.js",
            "app/scripts/vendor/modernizr.min.js"
          ],
          "dist/scripts/fancybox/source/": [
            "app/scripts/fancybox/source/jquery.fancybox.css",
            "app/scripts/fancybox/source/jquery.fancybox.js"
          ],
          "dist/": "app/index.html"
        }
      }
    },
    mincss: {
      compress: {
        files: {
          "dist/styles/main.min.css": [
            "app/styles/reset.css",
            "app/styles/base.css",
            "app/styles/main.css"
          ]
        }
      }
    },
    requirejs: {
        "app": {
            options: {
                baseUrl: "./app",
                include: ["scripts/app"],
                exclude: [],
                out: "dist/scripts/app.js",
                paths: {
                  "jquery": 'scripts/vendor/jquery-1.8.3.min',
                  "jquery-ui": 'scripts/vendor/jquery-ui-1.10.0.custom.min',
                  "fancybox": "scripts/fancybox/source/jquery.fancybox"
                },
                map: {}
            }
        },
        "app-debug": {
            options: {
                baseUrl: "./app",
                include: ["scripts/app"],
                exclude: [],
                out: "dist/scripts/app.debug.js",
                paths: {
                  "jquery": EMPTY,
                  "jquery-ui": EMPTY,
                  "fancybox": EMPTY
                },
                optimize: 'none',
                map: {}
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');

  // Default task.
  grunt.registerTask('default', 'clean:build copy:dist mincss requirejs');

  // Alias the `test` task to run the `mocha` task instead
  //grunt.registerTask('test', 'server:phantom mocha');

};
