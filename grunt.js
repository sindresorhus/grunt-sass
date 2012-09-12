module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		sass: {
			test: {
				src: [
					'test/fixtures/test.scss',
					'test/fixtures/test2.scss'
				],
				dest: 'test/compiled.css'
			},
			includes: {
				src : 'test-imports.scss',
				dest : '../compiled-imports.css',
				cwd : 'test/fixtures'
			}
		},
		lint: {
			files: [
				'grunt.js',
				'tasks/**/*.js'
			]
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		},
		jshint: {
			options: {
				es5: true,
				esnext: true,
				bitwise: true,
				curly: true,
				eqeqeq: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				regexp: true,
				undef: true,
				strict: true,
				trailing: true,
				smarttabs: true,
				node: true
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', 'lint sass');

};
