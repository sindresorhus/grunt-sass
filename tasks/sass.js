'use strict';
const util = require('util');
const path = require('path');
const sass = require('node-sass');

module.exports = grunt => {
	grunt.verbose.writeln(`\n${sass.info}\n`);

	grunt.registerMultiTask('sass', 'Compile Sass to CSS', async function () {
		const done = this.async();

		const options = this.options({
			precision: 10
		});

		await Promise.all(this.files.map(async item => {
			const [src] = item.src;

			if (!src || path.basename(src)[0] === '_') {
				return;
			}

			const result = await util.promisify(sass.render)(Object.assign({}, options, {
				file: src,
				outFile: item.dest
			}));

			grunt.file.write(item.dest, result.css);

			if (options.sourceMap) {
				const filePath = options.sourceMap === true ? `${item.dest}.map` : options.sourceMap;
				grunt.file.write(filePath, result.map);
			}
		}));

		done();
	});
};
