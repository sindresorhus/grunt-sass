module.exports = function(grunt) {
	'use strict';

	// TODO: ditch this when grunt v0.4 is released
	grunt.util = grunt.util || grunt.utils;

	var sass = require('node-sass');
	var path = require('path');

	function renderSCSSContentToCSSFile(scssContent, cssFilepath, cb) {
		sass.render(scssContent, function(err, css) {
			if (err) {
				grunt.warn(err);
			}

			grunt.file.write(cssFilepath, css);
			grunt.helper('min_max_info', css, scssContent);

			cb();
		});
	}

	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function() {
		var helpers = require('grunt-lib-contrib').init(grunt);
		var cb = this.async();
		var async = grunt.util.async;

		// TODO: ditch this when grunt v0.4 is released
		this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

		async.forEachSeries(this.files, function(el, cb2) {
			var dest = el.dest;
			var destWildcardIndex = dest.indexOf('*');
			if (~destWildcardIndex) {
				// this is a wildcard destination. Each file will be rendered into a file of the same name
				// at a path under destination that mirrors the relative path of the source file.
				var destRoot = dest.substring(0, destWildcardIndex);

				// split the src files up into individual patterns and iterate over those patterns
				// each pattern will represent it's own root.
				var sources = (grunt.util._.isArray(el.src) ? el.src : [ el.src ]);
				var srcPatterns = sources.map(function(str) {
						return grunt.template.process(str);
					});
				console.log(srcPatterns);
				async.forEachSeries(srcPatterns, function(srcPattern, next) {

					// for this pattern, determine the root, and iterate over all the files it represents
					var srcWildcardIndex = srcPattern.indexOf('*');
					var srcRoot = ~srcWildcardIndex ?
						srcPattern.substring(0, srcWildcardIndex) :
						process.cwd();
					var srcFiles = grunt.file.expand(srcPattern);
					async.forEachSeries(srcFiles, function(srcFile, next) {

						// read this file, determine its path relative to the pattern's root
						// then write the rendered CSS to the mirror relative path under destination's root.
						var file = grunt.file.read(srcFile);
						var fileDest = path.join(destRoot, path.relative(srcRoot, srcFile));
						fileDest = path.join(
							path.dirname(fileDest),
							path.basename(fileDest, path.extname(fileDest)) + '.css'
						);
						renderSCSSContentToCSSFile(file, fileDest, next);	
					}, next);
				}, cb2);
			} else {
				var files = grunt.file.expand(el.src);
				var max = grunt.helper('concat', files);
				renderSCSSContentToCSSFile(max, dest, cb2);
			}
		}, function(err) {
			cb(!err);
		});
	});
};
