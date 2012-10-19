module.exports = function(grunt) {
	'use strict';

	// TODO: ditch this when grunt v0.4 is released
	grunt.util = grunt.util || grunt.utils;

	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function() {
		var helpers = require('grunt-lib-contrib').init(grunt);
		var cb = this.async();
		var sass = require('node-sass');
		var async = grunt.util.async;

		// TODO: ditch this when grunt v0.4 is released
		this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

		async.forEachSeries(this.files, function(el, cb2) {
			var files = grunt.file.expand(el.src);
			var dest = el.dest;
			var max = grunt.helper('concat', files);

			sass.render(max, function(err, css) {
				if (err) {
					grunt.warn(err);
				}

				grunt.file.write(dest, css);
				grunt.helper('min_max_info', css, max);

				cb2();
			});
		}, function(err) {
			cb(!err);
		});
	});
};
