# grunt-sass [![Build Status](https://travis-ci.org/sindresorhus/grunt-sass.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-sass)

[<img src="https://rawgit.com/sass/node-sass/master/media/logo.svg" width="200" align="right">](https://github.com/sass/node-sass)

> Compile Sass to CSS using [node-sass](https://github.com/sass/node-sass)

*Issues with the output should be reported on the libsass [issue tracker](https://github.com/hcatlin/libsass/issues).*

This task uses [libsass](http://libsass.org) which is an experimental Sass compiler in C++. In contrast to the original Ruby compiler, this one is much faster, but is missing some features, though improving quickly. It also doesn't support Compass. Check out [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) if you prefer something more stable, but slower.


## Install

```sh
$ npm install --save-dev grunt-sass
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	sass: {
		options: {
			sourceMap: true
		},
		dist: {
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});

grunt.registerTask('default', ['sass']);
```

Files starting with `_` are ignored to match the expected [Sass partial behaviour](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).


## Options

### includePaths

Type: `array`  
Default: `[]`

Additional paths to look for `@import`'ed files.

### outputStyle

Type: `string`  
Default: `nested`  
Values: `'nested'`, `'compressed'`

Specify the CSS output style.

### imagePath

Type: `string`

Represents the public image path. When using the `image-url()` function in a stylesheet, this path will be prepended to the path you supply. Example: Given an `imagePath` of `/path/to/images`, `background-image: image-url('image.png')` will compile to `background-image: url("/path/to/images/image.png")`.

### sourceMap

Type: `boolean`, `string`  
Default: `false`

Set it to `true` to output a Source Map to the same location as the CSS *(output.css.map)*, or specify a path relative to the CSS file to where you want the Source Map.


### precision

Type: `number`  
Default: `10`

Number of digits to preserve after the dot. With the number 1.23456789 and a precision of 3, the result will be 1.234 in the final CSS.

### silent

Type: `boolean`
Default: `false`

Set it to `true` if you don't want to output when a file and source map has been created. 

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
