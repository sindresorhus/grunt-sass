module.exports = function(grunt) {
	'use strict';

	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function() {
		var helpers = require('grunt-lib-contrib').init(grunt);
		var legacyHelpers = require('grunt-lib-legacyhelpers').init(grunt);
		var cb = this.async();
		var sass = require('node-sass');
		var async = grunt.util.async;

		// TODO: ditch this when grunt v0.4 is released
		this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

		async.forEachSeries(this.files, function(el, cb2) {
			var files = grunt.file.expand(el.src);
			var dest = el.dest;
			var max = legacyHelpers.concat(files);

			sass.render(max, function(err, css) {
				if (err) {
					grunt.warn(err);
				}

				grunt.file.write(dest, css);
				legacyHelpers.min_max_info(css,max);

				cb2();
			});
		}, function(err) {
			cb(!err);
		});
	});
};
