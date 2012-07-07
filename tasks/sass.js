module.exports = function( grunt ) {
	'use strict';

	grunt.registerMultiTask( 'sass', 'Compile SASS .scss using node-sass', function() {
		var sass = require('node-sass');

		this.files.forEach(function( el ) {
			var files = grunt.file.expand( el.src );
			var dest = el.dest;
			var max = grunt.helper( 'concat', files );

			sass.render( max, function( err, css ) {
				if ( err ) {
					grunt.fail.fatal( err );
				}
				grunt.file.write( dest, css );
				grunt.helper( 'min_max_info', css, max );
			});
		});
	});
};