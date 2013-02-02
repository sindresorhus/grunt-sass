'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			compile: {
				files: {
					'test/tmp/test.css': 'test/fixtures/test.scss'
				}
			},
			concat: {
				files: {
					'test/tmp/test2.css': [
						'test/fixtures/test.scss',
						'test/fixtures/imported.scss'
					]
				}
			}
		},
		nodeunit: {
			tasks: ['test/*_test.js']
		},
		clean: {
			test: ['test/tmp']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['clean', 'sass', 'nodeunit', 'clean']);
};
