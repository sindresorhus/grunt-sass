module.exports = function( grunt ) {
	'use strict';

	var path = require('path');
	var _ = grunt.util._;

	grunt.registerMultiTask( 'rubysass', 'Compile SASS .scss/.sass using Ruby SASS', function() {
		var cb = this.async();
		var opts = this.options();
		var args = ['--stdin'];

		// Options -> CLI parameters
		Object.keys( opts ).forEach(function( el ) {
			var val = opts[ el ];

			el = el.replace( /[A-Z]/g, function( match ) {
				return '-' + match.toLowerCase();
			});

			if ( val === true ) {
				args.push( '--' + el );
			}

			if ( _.isString( val ) ) {
				args.push( '--' + el, val );
			}
		});

		this.files.forEach(function( el ) {
			var elArgs = [ el.dest ];
			var src = el.src;
			var files = grunt.file.expandFiles( src );
			var max = grunt.helper( 'concat', files );

			if ( path.extname( src ) === '.scss' ) {
				elArgs.push('--scss');
			}

			// Add dirs of specified files to the sass path
			files.forEach(function( el ) {
				elArgs.push( '--load-path', path.dirname( el ) );
			});

			var sass = grunt.util.spawn({
				cmd: 'sass',
				args: elArgs.concat( args )
			}, function( err ) {
				if ( err ) {
					grunt.fail.fatal( err );
				}
				cb();
			});

			sass.stdin.write( new Buffer( max ) );
			sass.stdin.end();
			sass.stdout.pipe( process.stdout );
			sass.stderr.pipe( process.stderr );
		});
	});
};