'use strict';
const sass = require('sass');

module.exports = grunt => {
	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
			},
			compile: {
				files: {
					'test/tmp/compile.css': 'test/fixtures/test.scss',
					'test/tmp/compile2.css': 'test/fixtures/test.scss',
				},
			},
			sourceMap: {
				options: {
					sourceMap: true,
				},
				files: {
					'test/tmp/source-map.css': 'test/fixtures/test.scss',
				},
			},
			sourceMapCustomPath: {
				options: {
					sourceMap: 'test/tmp/custom.map',
				},
				files: {
					'test/tmp/source-map-custom.css': 'test/fixtures/test.scss',
				},
			},
		},
		nodeunit: {
			tasks: ['test/test.js'],
		},
		clean: {
			test: ['test/tmp/**'],
		},
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['clean', 'sass', 'nodeunit', 'clean']);
};
