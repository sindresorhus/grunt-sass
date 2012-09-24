var grunt = require('grunt');

exports.sass = {
  compile: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('test/tmp/test.css');
    var expected = grunt.file.read('test/expected/test.css');
    test.equal(actual, expected, 'should compile SCSS to CSS');

    test.done();
  }
};
