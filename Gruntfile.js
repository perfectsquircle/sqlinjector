module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                undef: true
            },
            client: {
                src: ["lib/client/**/*.js"],
                options: {
                    node: true,
                    browser: true,

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
                    "!lib/client/**",
                    "!public/**"
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
                    "lib",
                    "model",
                    "public",
                    "routes",
                    "views",
                    "app.js",
                    "config.js",
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
                cwd: "dist",
                src: "**",
                dest: "."
            }
        },
        jsbeautifier: {
            files: ["**/*.js", "!node_modules/**", "!bower_components/**"],
            options: {}
        },
        browserify: {
            dist: {
                files: {
                    'dist/public/js/console.js': ['lib/client/console.js'],
                }
            }
        },
        uglify: {
            dist: {
                files: [{
                    cwd: "dist/public/js",
                    expand: true,
                    src: "**/*.js",
                    dest: "dist/public/js"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["jshint"]);
    grunt.registerTask("dist", ["clean", "default", "copy", "browserify", "uglify"]);
    grunt.registerTask("package", ["dist", "compress"]);

    grunt.registerTask("format", ["jshint", "jsbeautifier"]);
};
