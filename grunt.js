module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		sass: {
			compile: {
				files: {
					'test/tmp/test.css': 'test/fixtures/test.scss'
				}
			}
		},
		lint: {
			dev: {
				files: [
					'grunt.js',
					'tasks/**/*.js'
				]
			}
		},
		test: {
			tasks: ['test/*_test.js']
		},
		clean: {
			test: ['test/tmp']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', 'sass test clean');

};
