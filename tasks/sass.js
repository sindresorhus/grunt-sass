'use strict';
var sass = require('node-sass');
var async = require('async');
var path = require('path');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function () {
		var options = this.options({
			includePaths: [],
			outputStyle: 'nested',
			sourceComments: 'none'
		});

		async.eachSeries(this.files, function (el, next) {
			var src = el.src[0];
			if (path.basename(src)[0] === '_') {
				return next();
			}

			sass.render({
				file: src,
				success: function (css) {
					grunt.file.write(el.dest, css);
					grunt.log.writeln('File "' + el.dest + '" created.');
					next();
				},
				error: function (err) {
					grunt.warn(err);
				},
				includePaths: options.includePaths,
				outputStyle: options.outputStyle,
				sourceComments: options.sourceComments
			});
		}, this.async());
	});
};
