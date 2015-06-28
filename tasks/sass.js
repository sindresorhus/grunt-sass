'use strict';
var path = require('path');
var eachAsync = require('each-async');
var assign = require('object-assign');
var sass = require('node-sass');
var fs = require('fs');
var glob = require('glob');
var util = require('util');

module.exports = function (grunt) {

	function isDirectory(filePath) {
		var isDir = false;
		try {
			var absolutePath = path.resolve(filePath);
			isDir = fs.lstatSync(absolutePath).isDirectory();
		} catch (e) {
			isDir = e.code === 'ENOENT';
		}
		return isDir;
	}

	function globPattern(options) {
		return options.recursive ? '**/*.{sass,scss}' : '*.{sass,scss}';
	}

	function renderDir(options, renderDirNext) {
		var sassDir = path.resolve(options.directory);
		var globPath = path.resolve(options.directory, globPattern({recursive: true}));
		var cssDir = path.resolve(options.dest);

		glob(globPath, {ignore: '**/_*'}, function (err, files) {
			if (err) {
				throw util.format('You do not have permission to access this path: %s.', err.path);
			} else if (!files.length) {
				grunt.log.writeln(util.format('No sass file(s) found for path %s', options.directory));
				renderDirNext();
				return;
			}

			eachAsync(files, function (file, i, next) {
				var fileName = path.relative(sassDir, file);
				var outFile = options.dest = path.join(cssDir, fileName).replace(path.extname(fileName), '.css');
				renderFile(assign({}, options, {
					file: file,
					outFile: outFile
				}), next);
			}, renderDirNext);
		});
	}

	function renderFile(options, next) {
		sass.render(options, function (err, res) {
			if (err) {
				grunt.log.error(err.message + '\n ' + 'Line ' + err.line + ' Column ' + err.column + ' ' + path.relative(process.cwd(), err.file) + '\n');
				grunt.warn('');
				next(err);
				return;
			}
			grunt.file.write(options.outFile, res.css);
			if (options.sourceMap) {
				grunt.file.write(this.options.sourceMap, res.map);
			}
			next();
		});
	}

	function compileSass() {
		eachAsync(this.files, function (el, i, next) {
			var opts = this.options({
				precision: 10
			});

			var src = el.src[0];

			if (!src || path.basename(src)[0] === '_') {
				next();
				return;
			}

			if (isDirectory(src)) {
				opts.directory = src;
				opts.dest = el.dest;
				renderDir(opts, next);
			} else {
				renderFile(assign({}, opts, {
					file: src,
					outFile: el.dest
				}), next);
			}
		}.bind(this), this.async());
	}

	grunt.verbose.writeln('\n' + sass.info + '\n');
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', compileSass);
};
