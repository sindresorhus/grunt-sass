'use strict';
var path = require('path');
var eachAsync = require('each-async');
var assign = require('object-assign');
var chalk = require('chalk');
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		var options = this.options({
			precision: 10
		});

		eachAsync(this.files, function (el, i, next) {
			var src = el.src[0];

			if (path.basename(src)[0] === '_') {
				return next();
			}

			if (!grunt.file.exists(el.dest)) {
				grunt.file.write(el.dest, '');
			}

			sass.renderFile(assign({}, options, {
				file: src,
				outFile: el.dest,
				success: function (css, map) {
					grunt.log.writeln('File ' + chalk.cyan(el.dest) + ' created.');

					if (options.sourceMap) {
						var pth = options.sourceMap === true ? (el.dest + '.map') : path.relative(process.cwd(), map);
						grunt.log.writeln('File ' + chalk.cyan(pth) + ' created.');
					}

					next();
				},
				error: function (error) {
					grunt.warn(error);
					next(error);
				}
			}));
		}, this.async());
	});
};
