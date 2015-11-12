'use strict';
var path = require('path');
var async = require('async');
var assign = require('object-assign');
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.verbose.writeln('\n' + sass.info + '\n');

	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		async.eachSeries(this.files, function (el, next) {
			var opts = this.options({
				precision: 10
			});

			var src = el.src[0];

			if (!src || path.basename(src)[0] === '_') {
				async.setImmediate(function () {
					next();
				});
				return;
			}

			sass.render(assign({}, opts, {
				file: src,
				outFile: el.dest
			}), function (err, res) {
				if (err) {
					grunt.log.error(err.formatted + '\n');
					grunt.warn('');
					async.setImmediate(function () {
						next(err);
					});
					return;
				}

				grunt.file.write(el.dest, res.css);

				if (opts.sourceMap) {
					grunt.file.write(this.options.sourceMap, res.map);
				}

				async.setImmediate(function () {
					next();
				});
			});
		}.bind(this), this.async());
	});
};
