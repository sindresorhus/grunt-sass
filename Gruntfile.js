'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			compile: {
				files: {
					'test/tmp/compile.css': 'test/fixtures/test.scss'
				}
			},
			includePaths: {
				options: {
					'includePaths': ['./test/fixtures']
				},
				files: {
					'test/tmp/include-paths.css': 'test/fixtures/include-paths.scss'
				}
			},
			sourceComments: {
				options: {
					sourceComments: 'normal'
				},
				files: {
					'test/tmp/source-comments.css': 'test/fixtures/test.scss'
				}
			},
			ignorePartials: {
				cwd: 'test/fixtures/partials',
				src: '*.scss',
				dest: 'test/tmp',
				expand: true,
				ext: '.css'
			},
			sourceMap: {
				options: {
					sourceComments: 'map',
					sourceMap: '.lib/stuff/source-map.css.map'
				},
				files: {
					'test/tmp/source-map.css': 'test/fixtures/test.scss'
				}
			},
		},
		nodeunit: {
			tasks: ['test/test.js']
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
