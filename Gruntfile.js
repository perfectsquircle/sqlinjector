module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [ "**/*.js", "!node_modules/**", "!bower_components/**" ]
		},
		clean: {
			dist: [ "dist", "<%= pkg.name %>-<%= pkg.version %>.tgz" ]
		},
		copy: {
			all: {
				src: [ "**/*", "!Gruntfile", "!node_modules/**", "!bower_components/**" ],
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
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-contrib-compress');
	
	grunt.registerTask("default", [ "jshint" ]);
	grunt.registerTask("dist", [ "default", "clean", "copy" ]);
	grunt.registerTask("package", [ "dist", "compress" ]);
};

