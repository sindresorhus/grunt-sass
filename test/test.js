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
	},
	ignorePartials: function (test) {
		test.expect(1);

		test.ok(!grunt.file.exists('test/tmp/_partial.css'), 'underscore partial files should be ignored');

		test.done();
	},
	sourceMap: function (test) {
		test.expect(2);

		var css = grunt.file.read('test/tmp/source-map.css');
		test.ok(/\/\*\# sourceMappingURL\=source\-map\.css\.map/.test(css), 'should include sourceMapppingUrl');

		var map = grunt.file.read('test/tmp/source-map.css.map');
		test.ok(/test\.scss/.test(map), 'should include the main file in sourceMap at least');
		test.done();
	},
	sourceMapBySourceComment: function (test) {
		test.expect(3);

		var css = grunt.file.read('test/tmp/source-map-sc.css');
		test.ok(/\/\*\# sourceMappingURL\=source\-map-sc\.css\.map/.test(css), 'should include sourceMapppingUrl');

		var map = grunt.file.read('test/tmp/source-map-sc.css.map');
		test.ok(/test\.scss\"/.test(map), 'should include the main file in sourceMap at least');
		test.ok(/\"sources\"\: \[\"\.\.\/fixtures\/test\.scss\"/.test(map), 'should resolve full path to test.scss');
		test.done();
	},
	sourceMapSimple: function (test) {
		test.expect(3);

		var css = grunt.file.read('test/tmp/source-map-simple.css');
		test.ok(/\/\*\# sourceMappingURL\=source\-map-simple\.css\.map/.test(css), 'should include sourceMappingUrl');

		var map = grunt.file.read('test/tmp/source-map-simple.css.map');
		test.ok(/test\.scss\"/.test(map), 'should include the main file in sourceMap at least');
		test.ok(/\"sources\"\: \[\"\.\.\/fixtures\/test\.scss\"/.test(map), 'should resolve path to test.scss');
		test.done();
	}
};
