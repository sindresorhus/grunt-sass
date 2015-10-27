'use strict';
var grunt = require('grunt');

/*
 * Read files and normalize line endings.
 * Makes tests work on Windows.
 */
function read(filename) {
	return grunt.file.read(filename).replace(/\r/g, '');
}

exports.sass = {
	compile: function (test) {
		test.expect(2);

		var actual = read('test/tmp/compile.css');
		var actual2 = read('test/tmp/compile2.css');
		var expected = read('test/expected/compile.css');
		test.equal(actual, expected, 'should compile SCSS to CSS');
		test.equal(actual2, expected, 'should compile SCSS to CSS');

		test.done();
	},
	includePaths: function (test) {
		test.expect(1);

		var actual = read('test/tmp/include-paths.css');
		var expected = read('test/expected/include-paths.css');
		test.equal(actual, expected, 'should compile SCSS to CSS with options');

		test.done();
	},
	ignorePartials: function (test) {
		test.expect(1);

		test.ok(!grunt.file.exists('test/tmp/_partial.css'), 'underscore partial files should be ignored');

		test.done();
	},
	sourceMap: function (test) {
		test.expect(2);

		var css = read('test/tmp/source-map.css');
		test.ok(/\/\*\# sourceMappingURL\=source\-map\.css\.map/.test(css), 'should include sourceMapppingUrl');

		var map = read('test/tmp/source-map.css.map');
		test.ok(/test\.scss/.test(map), 'should include the main file in sourceMap at least');
		test.done();
	},
	sourceMapSimple: function (test) {
		test.expect(2);

		var css = read('test/tmp/source-map-simple.css');
		test.ok(/\/\*\# sourceMappingURL\=source\-map-simple\.css\.map/.test(css), 'should include sourceMappingUrl');

		var map = read('test/tmp/source-map-simple.css.map');
		test.ok(/test\.scss\"/.test(map), 'should include the main file in sourceMap at least');
		test.done();
	},
	precision: function (test) {
		test.expect(1);

		var actual = read('test/tmp/precision.css');
		test.ok(/1\.343/.test(actual), 'should support precision option');

		test.done();
	}
};
