module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		sass: {
			scss: {
				files: {
					'test/sass-scss.css': 'test/fixtures/scss/test.scss',
					'test/sass-scss2.css': [
						'test/fixtures/scss/test.scss',
						'test/fixtures/scss/test2.scss'
					]
				}
			}
		},
		rubysass: {
			scss: {
				options: {
					unixNewlines: true,
					style: 'compact'
				},
				files: {
					'test/rubysass-scss.css': 'test/fixtures/scss/test.scss',
					'test/rubysass-scss2.css': [
						'test/fixtures/scss/test.scss',
						'test/fixtures/scss/test2.scss'
					]
				}
			},
			sass: {
				options: {
					loadPath: 'test/fixtures/sass/'
				},
				files: {
					'test/rubysass-sass.css': 'test/fixtures/sass/test.sass',
					'test/rubysass-sass2.css': [
						'test/fixtures/sass/test.sass',
						'test/fixtures/sass/test2.sass'
					]
				}
			}
		},
		lint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: [
				'grunt.js',
				'tasks/**/*.js'
			]
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', 'sass rubysass');

};