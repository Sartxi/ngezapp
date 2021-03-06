// Generated on 2015-03-04 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    var modRewrite = require('connect-modrewrite');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    require('prerender-node').set('prerenderToken', 'nwHIG52XkVIIWHyi6dVP');

    // grunt.loadNpmTasks('grunt-html-snapshot');
    grunt.loadNpmTasks('grunt-relative-root');

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

            // Watches files for changes and runs tasks based on the changed files
            watch: {
                bower: {
                    files: ['bower.json'],
                    tasks: ['wiredep']
                },
                js: {
                    files: [
                        '<%= yeoman.app %>/{,*/}*.js',
                        '<%= yeoman.app %>/scripts/**/{,*/}*.js',
                    ],
                    tasks: ['newer:jshint:all'],
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    }
                },
                jsTest: {
                    files: ['test/spec/{,*/}*.js'],
                    tasks: ['newer:jshint:test', 'karma']
                },
                compass: {
                    files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                    tasks: ['compass:server', 'autoprefixer']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= yeoman.app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            },

            // The actual grunt server settings
            connect: {
                options: {
                    port: 9001,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35727
                },
                livereload: {
                    options: {
                        open: true,
                        middleware: function (connect) {
                            return [
                                modRewrite(['^[^\\.]*$ /index.html [L]']),
                                connect.static('.tmp'),
                                connect().use(
                                    '/bower_components',
                                    connect.static('./bower_components')
                                ),
                                connect.static(appConfig.app)
                            ];
                        }
                    }
                },
                test: {
                    options: {
                        port: 9001,
                        base: [
                            '.tmp',
                            'test',
                            '<%= yeoman.app %>'
                        ],
                        middleware: function (connect) {
                            return [
                                modRewrite(['^[^\\.]*$ /index.html [L]']),
                                connect.static('.tmp'),
                                connect().use(
                                    '/bower_components',
                                    connect.static('./bower_components')
                                ),
                                connect.static('app')
                            ];
                        }
                    }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

    	relativeRoot: {
    		yourTarget: {
    			options: {
    				root: '<%= yeoman.dist %>'
    			},
    			files: [{
    				expand: true,
    				cwd: '<%= yeoman.dist %>',
    				src: ['styles/**/*.css', 'components/**/*.html', 'common/**/*.html'],
    				dest: '<%= yeoman.dist %>'
    			}]
    		}
    	},

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: 'dist/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath:  /\.\.\//
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/assets/images/generated',
                imagesDir: '<%= yeoman.app %>/assets/images',
                javascriptsDir: '<%= yeoman.app %>/common',
                fontsDir: '<%= yeoman.app %>/assets/fonts',
                importPath: './bower_components',
                httpImagesPath: '/assets/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/assets/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/main.css',
                    '<%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.app %>/index.html','<%= yeoman.dist %>/{,*/}*.html','<%= yeoman.dist %>/assets/**/*.html'],
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html','<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/assets/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/vendor.js': [
                        '<%= yeoman.dist %>/scripts/vendor.js'
                    ]
                }
            }
        },

        concat: {
            dist: {}
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/assets/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/assets/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html','views/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

    	ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'assets/images/{,*/}*.{webp}',
                        'assets/fonts/{,*/}*.*',
    			        'views/{,*/}*.{js,html}',
    			        'scripts/**/*.{js,html}',
    			        'config/**/*.{js,html}',
    			        'WEB-INF/**/*.xml',
    			        'video/*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'app/styles',
                    dest: 'dist/styles',
                    src: ['{,*/}*.css']
                }, {
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    dest: 'dist/scripts',
                    src: ['{,*/}*.js']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
    	    options: {
    		    logConcurrentOutput:true,
    		    limit: 5
    	    },
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
               'imagemin',
               'compass:dist',
               'svgmin'
            ]
        },

        htmlSnapshot: {
            all: {
                options: {
                    snapshotPath: 'snapshots/',
                    sitePath: 'http://localhost:9001/',
                    msWaitForPages: 2000,
                    sanitize: function (requestUri) {
                        if (/\/$/.test(requestUri)) {
                            return 'app/index.html';
                        } else {
                            return requestUri.replace(/\//g, 'prefix-');
                        }
                    },
                    removeScripts: true,
                    urls: [
                        '#/merchants'
                    ]
                }
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
	    'ngmin',
        'ngAnnotate',
        'copy:dist',
	    'string-replace:dist',
        'cdnify',
        //'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
	    'relativeRoot',
	    'compress'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
