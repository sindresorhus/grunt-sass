/* eslint-disable prefer-object-spread, promise/prefer-await-to-then */
'use strict';
const util = require('util');
const path = require('path');

module.exports = grunt => {
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		const done = this.async();

		const options = this.options({
			precision: 10
		});

		if (!options.implementation) {
			grunt.fatal('The implementation option must be passed to the Sass task');
		}
		grunt.verbose.writeln(`\n${options.implementation.info}\n`);

		(async () => {
			await Promise.all(this.files.map(async item => {
				const [src] = item.src;

				if (!src || path.basename(src)[0] === '_') {
					return;
				}

				const result = await util.promisify(options.implementation.render)(Object.assign({}, options, {
					file: src,
					outFile: item.dest
				}));

				grunt.file.write(item.dest, result.css);

				if (options.sourceMap) {
					const filePath = options.sourceMap === true ? `${item.dest}.map` : options.sourceMap;
					grunt.file.write(filePath, result.map);
				}
			}));
		})().catch(error => {
			grunt.fatal(error.formatted || error);
		}).then(done);
	});
};
