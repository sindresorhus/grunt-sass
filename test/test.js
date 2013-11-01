'use strict';
var grunt = require('grunt');

exports.sass = {
	compile: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/compile.css');
		var expected = grunt.file.read('test/expected/compile.css');
		test.equal(actual, expected, 'should compile SCSS to CSS');

		test.done();
	},
	includePaths: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/include-paths.css');
		var expected = grunt.file.read('test/expected/include-paths.css');
		test.equal(actual, expected, 'should compile SCSS to CSS with options');

		test.done();
	},
	sourceComments: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/source-comments.css');
		test.ok(/^\/\* line 1/.test(actual), 'should include sourceComments');

		test.done();
	}
};
