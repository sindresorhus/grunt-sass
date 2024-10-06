'use strict';
const sass = require('sass');

module.exports = grunt => {
	grunt.initConfig({
		sass: {
			options: {
				implementation: sass
			},
			compile: {
				files: {
					'test/tmp/compile.css': 'test/fixtures/test.scss',
					'test/tmp/compile2.css': 'test/fixtures/test.scss'
				}
			},
			includePaths: {
				options: {
					includePaths: ['test/fixtures']
				},
				files: {
					'test/tmp/include-paths.css': 'test/fixtures/include-paths.scss'
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
					sourceMap: 'test/tmp/source-map.css.map'
				},
				files: {
					'test/tmp/source-map.css': 'test/fixtures/test.scss'
				}
			},
			sourceMapSimple: {
				options: {
					sourceMap: true
				},
				files: {
					'test/tmp/source-map-simple.css': 'test/fixtures/test.scss'
				}
			},
			precision: {
				options: {
					precision: 3
				},
				files: {
					'test/tmp/precision.css': 'test/fixtures/precision.scss'
				}
			}
		},
		nodeunit: {
			tasks: ['test/test.js']
		},
		clean: {
			test: ['test/tmp/**']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['clean', 'sass', 'nodeunit', 'clean']);
};
