/* eslint-disable promise/prefer-await-to-then */
'use strict';
const path = require('node:path');
const {fileURLToPath} = require('node:url');

module.exports = grunt => {
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		const done = this.async();

		const options = this.options();

		if (!options.implementation) {
			grunt.fatal('The implementation option must be passed to the Sass task');
		}

		grunt.verbose.writeln(`\n${options.implementation.info}\n`);

		(async () => {
			await Promise.all(this.files.map(async item => {
				const [source] = item.src;

				if (!source || path.basename(source)[0] === '_') {
					return;
				}

				const result = await options.implementation.compileAsync(source, options);

				if (options.sourceMap) {
					const mapFileName = options.sourceMap === true ? `${path.basename(item.dest)}.map` : options.sourceMap;
					const mapFilePath = options.sourceMap === true ? `${item.dest}.map` : options.sourceMap;
					const mapDirectory = path.dirname(path.resolve(mapFilePath));

					// The Sass JS API returns absolute file:// URLs in source maps.
					// Convert them to relative paths for portability.
					for (const [index, sourceUrl] of result.sourceMap.sources.entries()) {
						if (sourceUrl.startsWith('file:')) {
							result.sourceMap.sources[index] = path.relative(mapDirectory, fileURLToPath(sourceUrl)).replaceAll('\\', '/');
						}
					}

					grunt.file.write(item.dest, `${result.css}\n/*# sourceMappingURL=${mapFileName} */`);
					grunt.file.write(mapFilePath, JSON.stringify(result.sourceMap));
				} else {
					grunt.file.write(item.dest, result.css);
				}
			}));
		})().catch(error => {
			grunt.fatal(error.formatted || error);
		}).then(done);
	});
};
