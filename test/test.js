'use strict';
const grunt = require('grunt');

exports.sass = {
	compile(test) {
		test.expect(2);

		const actual = grunt.file.read('test/tmp/compile.css');
		const actual2 = grunt.file.read('test/tmp/compile2.css');
		const expected = grunt.file.read('test/expected/compile.css');
		test.equal(actual, expected, 'should compile SCSS to CSS');
		test.equal(actual2, expected, 'should compile SCSS to CSS');

		test.done();
	},
	sourceMap(test) {
		test.expect(4);

		const css = grunt.file.read('test/tmp/source-map.css');
		test.ok(/\/\*# sourceMappingURL=source-map\.css\.map \*\//.test(css), 'should include sourceMappingURL comment');

		const map = grunt.file.read('test/tmp/source-map.css.map');
		test.ok(/test\.scss/.test(map), 'should include the main file in sourceMap');

		const parsedMap = JSON.parse(map);
		test.ok(parsedMap.sources, 'should have sources property');
		test.ok(parsedMap.mappings, 'should have mappings property');

		test.done();
	},
	sourceMapCustomPath(test) {
		test.expect(3);

		const css = grunt.file.read('test/tmp/source-map-custom.css');
		test.ok(/\/\*# sourceMappingURL=test\/tmp\/custom\.map \*\//.test(css), 'should include custom sourceMappingURL');

		test.ok(grunt.file.exists('test/tmp/custom.map'), 'should create source map at custom path');

		const map = grunt.file.read('test/tmp/custom.map');
		test.ok(/test\.scss/.test(map), 'should include the main file in custom sourceMap');

		test.done();
	},
};
