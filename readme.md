# grunt-sass [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-sass.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-sass)

*Requires grunt 0.4. Use version 0.2.5 for grunt 0.3 compatibility*

[Grunt][grunt] tasks to compile SCSS to CSS using [node-sass](https://github.com/andrew/node-sass)

**Check out [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) (based on Ruby Sass) if you want something stable that also supports the old syntax**


## Overview

This task uses the experimental and superfast Node.js based Sass compiler [node-sass](https://github.com/andrew/node-sass) (which only compiles .scss files).

*Note that node-sass is currently under heavy development and might be unstable, there are also some stuff missing, like compression options and file/folder context, which means you need to specify @import using the relative path from your Gruntfile.*


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-sass --save-dev
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the [Gruntfile](https://github.com/sindresorhus/grunt-sass/blob/master/Gruntfile.js) in this repo for a full example.


### Example config

```javascript
grunt.initConfig({
	sass: {									// Task
		dist: {								// Target
			files: {						// Dictionary of files
				'main.css': 'main.scss',	// 'destination': 'source'
				'widgets.css': [			// Multiple sources will be concatenated
					'button.scss',
					'tab.scss'
				]
			}
		},
		dev: {								// Another target
			options: {						// Dictionary of render options
				includePaths: [
					'path/to/imports/'
				]
			},
			files: {
				'main.css': 'main.scss',
				'widgets.css': [
					'button.scss',
					'tab.scss',
					'debug.scss'			// Maybe you need one extra file in dev
				]
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


#### Compile with render options

If you specify `options`, they will be passed along to the [node-sass](https://github.com/andrew/node-sass) `render` method.

```javascript
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
##### Render options
* `includePaths`: An array of import paths to include.
* `outputStyle`: A string allowing you to specify the CSS output style. According to the [node-sass](https://github.com/andrew/node-sass) documentation, there is currently a problem with lib-sass so this option is best avoided for the time being. Available styles are 'nested', 'expanded', 'compact', 'compressed'.


#### Concat and compile

If you specify an array of `src` paths they will be concatenated. However, in most cases you would want to just `@import` them into `main.scss`.

```javascript
grunt.initConfig({
	sass: {
		files: {
			'main.css': [
				'reset.scss',
				'main.scss'
			]
		}
	}
});
```


#### Compile multiple files

You can also compile multiple files into multiple destinations.

```javascript
grunt.initConfig({
	sass: {
		files: {
			'main.css': 'main.scss',
			'widgets.css': 'widgets.sass'
		}
	}
});
```


## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.


## License

MIT License
(c) [Sindre Sorhus](http://sindresorhus.com)
