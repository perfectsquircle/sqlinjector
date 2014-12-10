module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			files: [ "**/*.js", "!node_modules/**", "!bower_components/**" ]
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-jshint");
	
	grunt.registerTask("default", [ "jshint" ]);
	grunt.registerTask("dev", [ "jshint" ]);
};

