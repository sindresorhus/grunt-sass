/*
 * grunt-sass
 * 0.1.0 - 2012-06-12
 * github.com/sindresorhus/grunt-sass
 *
 * (c) Sindre Sorhus
 * sindresorhus.com
 * MIT License
 */
module.exports = function( grunt ) {
	'use strict';

	grunt.registerMultiTask( 'sass', 'Compile SASS and SCSS', function() {
		var sass = require('node-sass');
		var done = this.async();
		var dest = this.file.dest;
		var files = grunt.file.expand( this.file.src );
		var max = grunt.helper( 'concat', files );

		sass.render( max, function( err, css ) {
			grunt.file.write( dest, css );
			grunt.helper( 'min_max_info', css, max );

			if ( err ) {
				grunt.fail.fatal( 'Compile error:', err );
			}

			done();
		});
	});
};