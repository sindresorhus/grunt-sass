'use strict';
var path = require('path');
var async = require('async');
var chalk = require('chalk');
var sass = require('node-sass');

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
				success: function (css, map) {
					grunt.file.write(el.dest, css);
					grunt.log.writeln('File ' + chalk.cyan(el.dest) + ' created.');

					if (map) {
						grunt.file.write(el.dest + '.map', map)
						grunt.log.writeln('File ' + chalk.cyan(el.dest + '.map') + ' created.');
					}

					next();
				},
				error: function (err) {
					grunt.warn(err);
				},
				includePaths: options.includePaths,
				outputStyle: options.outputStyle,
				sourceComments: options.sourceComments,
				sourceMap: options.sourceMap
			});
		}, this.async());
	});
};
