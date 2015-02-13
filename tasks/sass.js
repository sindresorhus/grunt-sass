'use strict';
var path = require('path');
var eachAsync = require('each-async');
var assign = require('object-assign');
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.verbose.writeln('\n' + sass.info() + '\n');

	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		eachAsync(this.files, function (el, i, next) {
			var opts = this.options({
				precision: 10
			});

			var src = el.src[0];

			if (!src || path.basename(src)[0] === '_') {
				next();
				return;
			}

			sass.render(assign({}, opts, {
				file: src,
				outFile: el.dest,
				success: function (res) {
					grunt.file.write(el.dest, res.css);

					if (opts.sourceMap) {
						grunt.file.write(opts.sourceMap === true ? (el.dest + '.map') : path.relative(process.cwd(), opts.sourceMap), res.map);
					}

					next();
				},
				error: function (err) {
					grunt.log.error(err.message + '\n  ' + 'Line ' + err.line + '  Column ' + err.column + '  ' + path.relative(process.cwd(), err.file) + '\n');
					grunt.warn('');
					next(err);
				}
			}));
		}.bind(this), this.async());
	});
};
