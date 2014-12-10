module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			files: [ "**/*.js", "!node_modules/**", "!bower_components/**" ]
		},
		clean: {
			dist: [ "dist" ]
		},
		copy: {
			all: {
				src: [ "**/*", "!Gruntfile", "!node_modules/**", "!bower_components/**" ],
				dest: "./dist",
				expand: true
			}	
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	
	grunt.registerTask("default", [ "jshint", "clean", "copy" ]);
	grunt.registerTask("dev", [ "jshint" ]);
};

