'use strict';
var path = require('path');
var async = require('async');
var chalk = require('chalk');
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function () {
		var cwd = process.cwd();

		var options = this.options({
			includePaths: [],
			outputStyle: 'nested',
			sourceComments: 'none'
		});

		// Set the sourceMap path if the sourceComment was 'map', but set source-map was missing
		if (options.sourceComments === 'map' && !options.sourceMap) {
			options.sourceMap = true;
		}

		// set source map file and set sourceComments to 'map'
		if (options.sourceMap) {
			options.sourceComments = 'map';
		}

		async.eachSeries(this.files, function (el, next) {
			var src = el.src[0];

			if (path.basename(src)[0] === '_') {
				return next();
			}

			var renderOpts = {
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
				sourceComments: options.sourceComments
			};

			if (options.sourceMap) {
				if (options.sourceMap === true) {
					renderOpts.sourceMap = el.dest + '.map';
				} else {
					renderOpts.sourceMap = path.resolve(cwd, options.sourceMap);
				}
			}

			sass.render(renderOpts);

		}, this.async());
	});
};
