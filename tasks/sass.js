'use strict';
var path = require('path');
var eachAsync = require('each-async');
var assign = require('object-assign');
var chalk = require('chalk');
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		eachAsync(this.files, function (el, i, next) {
			var opts = this.options({
				precision: 10
			});

			var src = el.src[0];

			if (!src || path.basename(src)[0] === '_') {
				return next();
			}

			sass.render(assign({}, opts, {
				// `path.resolve` works around some stupid node-sass issue
				file: path.resolve(src),
				outFile: el.dest,
				success: function (res) {
					grunt.file.write(el.dest, res.css);
					grunt.verbose.writeln('File ' + chalk.cyan(el.dest) + ' created');

					if (res.map) {
						var pth = opts.sourceMap === true ? (el.dest + '.map') : path.relative(process.cwd(), res.map);
						grunt.verbose.writeln('File ' + chalk.cyan(pth) + ' created');
					}

					next();
				},
				error: function (err) {
					grunt.warn(err.message);
					next(err);
				}
			}));
		}.bind(this), this.async());
	});
};
