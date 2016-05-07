'use strict';


module.exports = function (grunt) {

    var importOnce = require('node-sass-import-once');
    // Project configuration.
    grunt.initConfig({

        clean: {
            css: ['css'],
            bower: ['bower_components'],
            reports: ['reports']
        },

        sass: {
            options: {
                importer: importOnce,
                importOnce: {
                  index: true,
                  bower: true
                }
            },
            timeInput: {
                files: {
                    'css/noprefix/px-time-input-sketch.css': 'sass/px-time-input-sketch.scss',
                    'css/noprefix/px-time-input.css': 'sass/px-time-input-predix.scss'
                }
            },
            timeRangePicker: {
                files: {
                    'css/noprefix/px-time-rangepicker-sketch.css': 'sass/px-time-rangepicker-sketch.scss',
                    'css/noprefix/px-time-rangepicker.css': 'sass/px-time-rangepicker-predix.scss'
                }
            },
            buttons: {
                files: {
                    'css/noprefix/px-datetime-buttons-sketch.css': 'sass/px-datetime-buttons-sketch.scss',
                    'css/noprefix/px-datetime-buttons.css': 'sass/px-datetime-buttons-predix.scss'
                }
            },
            entry: {
                files: {
                    'css/noprefix/px-datetime-entry-sketch.css': 'sass/px-datetime-entry-sketch.scss',
                    'css/noprefix/px-datetime-entry.css': 'sass/px-datetime-entry-predix.scss'
                }
            },
            cell: {
                files: {
                    'css/noprefix/px-datetime-entry-cell-sketch.css': 'sass/px-datetime-entry-cell-sketch.scss',
                    'css/noprefix/px-datetime-entry-cell.css': 'sass/px-datetime-entry-cell-predix.scss'
                }
            },
            presets: {
                files: {
                    'css/noprefix/px-datetime-presets-sketch.css': 'sass/px-datetime-presets-sketch.scss',
                    'css/noprefix/px-datetime-presets.css': 'sass/px-datetime-presets-predix.scss'
                }
            }
        },

        autoprefixer: {
          options: {
            browsers: ['last 2 version']
          },
          multiple_files: {
            expand: true,
            flatten: true,
            src: 'css/noprefix/*.css',
            dest: 'css'
          }
        },

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            bower: {
                command: 'bower install'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    interrupt: true,
                    livereload: false
                }
            },
            htmljs: {
                files: ['*.html', '*.js'],
                options: {
                    interrupt: true,
                    livereload: false
                }
            }
        },

        depserve: {
            options: {
                open: '<%= depserveOpenUrl %>'
            }
        },
        webdriver: {
            options: {
                specFiles: ['test/*spec.js']
            },
            local: {
                webdrivers: ['chrome']
            }
        },
        concurrent: {
            devmode: {
                tasks: ['watch', 'depserve'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dep-serve');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task.
    grunt.registerTask('default', 'Basic build', [
        'sass',
        'autoprefixer'
    ]);

    grunt.registerTask('devmode', 'Development Mode', [
        'concurrent:devmode'
    ]);

    // First run task.
    grunt.registerTask('firstrun', 'Basic first run', function() {
        grunt.config.set('depserveOpenUrl', '/index.html');
        grunt.task.run('default');
        grunt.task.run('depserve');
    });

    // Default task.
    grunt.registerTask('test', 'Test', [
        'jshint',
        'webdriver'
    ]);

    grunt.registerTask('release', 'Release', [
        'clean',
        'shell:bower',
        'default',
        'test'
    ]);

};
