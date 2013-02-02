'use strict';
var grunt = require('grunt');

exports.sass = {
	compile: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/test.css');
		var expected = grunt.file.read('test/expected/test.css');
		test.equal(actual, expected, 'should compile SCSS to CSS');

		test.done();
	},
	concat: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/test2.css');
		var expected = grunt.file.read('test/expected/test2.css');
		test.equal(actual, expected, 'should concat multiple `src` files');

		test.done();
	}
};
