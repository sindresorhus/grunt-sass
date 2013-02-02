'use strict';
module.exports = function (grunt) {
	function concat(files) {
		return files ? files.map(function (filePath) {
			return grunt.file.read(filePath);
		}).join(grunt.util.linefeed) : '';
	}

	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function () {
		var helpers = require('grunt-lib-contrib').init(grunt);
		var sass = require('node-sass');
		var cb = this.async();

		grunt.util.async.forEachSeries(this.files, function (el, cb2) {
			var dest = el.dest;
			var max = concat(el.src);

			sass.render(max, function (err, css) {
				if (err) {
					grunt.warn(err);
				}

				grunt.file.write(dest, css);
				helpers.minMaxInfo(css, max);
				cb2();
			});
		}, function (err) {
			cb(!err);
		});
	});
};
