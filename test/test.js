'use strict';
var grunt = require('grunt');

function readFile(file) {
	var contents = grunt.file.read(file);
	return process.platform === 'win32' ? contents.replace(/\r\n/g, '\n') : contents;
}

exports.sass = {
	compile: function (test) {
		test.expect(2);

		var actual = readFile('test/tmp/compile.css');
		var actual2 = readFile('test/tmp/compile2.css');
		var expected = readFile('test/expected/compile.css');
		test.equal(actual, expected, 'should compile SCSS to CSS');
		test.equal(actual2, expected, 'should compile SCSS to CSS');

		test.done();
	},
	includePaths: function (test) {
		test.expect(1);

		var actual = readFile('test/tmp/include-paths.css');
		var expected = readFile('test/expected/include-paths.css');
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

		var css = readFile('test/tmp/source-map.css');
		test.ok(/\/\*# sourceMappingURL=source\-map\.css\.map/.test(css), 'should include sourceMapppingUrl');

		var map = readFile('test/tmp/source-map.css.map');
		test.ok(/test\.scss/.test(map), 'should include the main file in sourceMap at least');
		test.done();
	},
	sourceMapSimple: function (test) {
		test.expect(2);

		var css = readFile('test/tmp/source-map-simple.css');
		test.ok(/\/\*# sourceMappingURL=source\-map-simple\.css\.map/.test(css), 'should include sourceMappingUrl');

		var map = readFile('test/tmp/source-map-simple.css.map');
		test.ok(/test\.scss"/.test(map), 'should include the main file in sourceMap at least');
		test.done();
	},
	precision: function (test) {
		test.expect(1);

		var actual = readFile('test/tmp/precision.css');
		test.ok(/1\.343/.test(actual), 'should support precision option');

		test.done();
	}
};
