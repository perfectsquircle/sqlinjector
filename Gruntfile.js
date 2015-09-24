module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                funcscope: true,
                latedef: "nofunc",
                maxcomplexity: 10,
                maxdepth: 3,
                maxparams: 7,
                maxstatements: 20,
                nonbsp: true,
                shadow: true,
                undef: true
            },
            client: {
                src: ["client/**/*.js"],
                options: {
                    browserify: true,

                    globals: {
                        App: true,
                        fetch: true
                    }
                }
            },
            server: {
                src: [
                    "**/*.js",
                    "!node_modules/**",
                    "!bower_components/**",
                    "!client/**",
                    "!public/**",
                    "!dist/**"
                ],
                options: {
                    node: true
                }
            }
        },
        clean: {
            dist: [
                "sqlinjector.log",
                "dist",
                "<%= pkg.name %>-<%= pkg.version %>.tgz"
            ]
        },
        copy: {
            all: {
                src: [
                    "client/**",
                    "lib/**",
                    "model/**",
                    "public/**",
                    "routes/**",
                    "views/**",
                    "app.js",
                    "bower.json",
                    "config.js",
                    "config.sessionSecret.js",
                    "LICENSE",
                    "package.json",
                    "README.md",
                ],
                dest: "./dist",
                expand: true
            }
        },
        compress: {
            dist: {
                options: {
                    archive: "<%= pkg.name %>-<%= pkg.version %>.tgz",
                    mode: "tgz"
                },
                expand: true,
                cwd: "dist",
                src: "**/*",
                dest: "."
            }
        },
        jsbeautifier: {
            files: [
                "**/*.js",
                "!node_modules/**",
                "!bower_components/**",
                "!dist/**"
            ],
            options: {}
        },
        nodeunit: {
            all: ["test/**/*.js"]
        },
        shell: {
            bower: {
                command: "bower install --production",
                options: {
                    execOptions: {
                        cwd: "dist"
                    }
                }
            },
            npm: {
                command: "npm install --production",
                options: {
                    execOptions: {
                        cwd: "dist"
                    }
                }
            }
        },
        cssmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: "dist/public/css",
                    src: ["*.css"],
                    dest: "dist/public/css"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    grunt.registerTask("test", ["nodeunit"]);
    grunt.registerTask("default", ["jshint", "test"]);
    grunt.registerTask("dist", ["clean", "default", "copy", "shell", "cssmin"]);
    grunt.registerTask("package", ["dist", "compress"]);

    grunt.registerTask("format", ["jshint", "jsbeautifier"]);
};
