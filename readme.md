# grunt-sass [![Build Status](https://travis-ci.org/sindresorhus/grunt-sass.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-sass)

> Compile SCSS to CSS using [node-sass](https://github.com/andrew/node-sass)

**Bugs with the output should be submitted on the [libsass](https://github.com/hcatlin/libsass) repo which is the actual compiler.**  
Make sure to review its issue tracker for known bugs before using this task as it can bite you later on.


## Overview

This task uses the experimental and superfast Node.js based Sass compiler [node-sass](https://github.com/andrew/node-sass) (which only compiles .scss files).

*Note that node-sass is currently under heavy development and might be unstable, there are also some stuff missing, like a compression option. Check out [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) (based on Ruby Sass) if you want something stable that also supports the old syntax, but in turn much slower.*


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
$ npm install --save-dev grunt-sass
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the [Gruntfile](https://github.com/sindresorhus/grunt-sass/blob/master/Gruntfile.js) in this repo for a full example.

Note: Files that begin with "_" are ignored even if they match the globbing pattern. This is done to match the expected [Sass partial behaviour](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).

### Options

#### includePaths

Type: `Array`  
Default: `[]`

Import paths to include.

#### outputStyle

Type: `String`  
Default: `nested`  
Values: `'nested'`, `'compressed'`

Specify the CSS output style.

#### imagePath

Type: `String`

Represents the public image path. When using the `image-url()` function in a stylesheet, this path will be prepended to the path you supply. eg. Given an `imagePath` of `/path/to/images`, `background-image: image-url('image.png')` will compile to `background-image: url("/path/to/images/image.png")`.

#### sourceComments

Type: `String`  
Default: `'none'`  
Values: `'none'`, `'normal'`, `'map'`

Set what debug information is included in the output file. The `map` option will create the source map file in your CSS destination.

#### sourceMap

Type: `String`

If your `sourceComments` option is set to `map`, `sourceMap` allows setting a new path context for the referenced Sass files. The source map describes a path from your CSS file location, into the the folder where the Sass files are located. In most occasions this will work out-of-the-box but, in some cases, you may need to set a different output.


### Example config

```javascript
grunt.initConfig({
	sass: {									// task
		dist: {								// target
			files: {						// dictionary of files
				'main.css': 'main.scss'		// 'destination': 'source'
			}
		},
		dev: {								// another target
			options: {						// dictionary of render options
				includePaths: [
					'path/to/imports/'
				]
			},
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-sass');
grunt.registerTask('default', ['sass']);
```


### Example usage


#### Compile

```javascript
grunt.initConfig({
	sass: {
		dist: {
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});
```


#### Compile with options

```js
grunt.initConfig({
	sass: {
		dist: {
			options: {
				includePaths: ['imports/are/here/'],
				outputStyle: 'nested'
			},
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});
```


#### Compile multiple files

You can also compile multiple files into multiple destinations.

```js
grunt.initConfig({
	sass: {
		files: {
			'main.css': 'main.scss',
			'widgets.css': 'widgets.scss'
		}
	}
});
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
