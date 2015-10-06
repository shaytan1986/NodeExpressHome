module.exports = function(grunt) {
	// LOAD PLUGINS
	// Doing this in a loop just saves some keystrokes, but you could also run all these manually
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// CONFIGURE PLUGINS
	// This section runs plugin-specific logic to set up each plugin
	grunt.initConfig({
		cafemocha: {
			all: {
				src: 'qa/tests-*.js', 
				options: {
					ui: 'tdd' 
				}, 
			}
		}, jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		},
		exec: {
			linkchecker: {
				cmd: 'linkchecker http://localhost:3000' 
			}
		},
	});

	// register tasks
	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};