module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                //undef: true
            },
            client: {
                src: ["lib/client/**/*.js"],
                options: {
                    node: true,
                    browser: true,

                    globals: {
                        App: true
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
            dist: ["dist", "<%= pkg.name %>-<%= pkg.version %>.tgz"]
        },
        copy: {
            all: {
                src: ["**/*", "!Gruntfile", "!node_modules/**", "!bower_components/**"],
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
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-jsbeautifier");

    grunt.registerTask("default", ["jshint"]);
    grunt.registerTask("dist", ["default", "clean", "copy"]);
    grunt.registerTask("package", ["dist", "compress"]);

    grunt.registerTask("format", ["jshint", "jsbeautifier"]);
};
