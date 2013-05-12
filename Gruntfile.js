'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			compile: {
				files: {
					'test/tmp/test.css': 'test/fixtures/test.scss'
				}
			},
			include: {
				options: {
					'includePaths': ['./test/fixtures/']
				},
				files: {
					'test/tmp/test3.css': 'test/fixtures/includePaths.scss'
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
