# grunt-sass [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-sass.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-sass)

[Grunt][grunt] tasks to compile SCSS to CSS using [node-sass](https://github.com/andrew/node-sass)

**Check out [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass), which is based on Ruby Sass, if you want something stable that also supports the old syntax**


## Overview

This task uses the experimental and superfast Node.js based Sass compiler, [node-sass](https://github.com/andrew/node-sass). This task only compiles .scss files.

*Note that node-sass is currently under heavy development and might be unstable, there are also some stuff missing, like compression options and file/folder context, which means you need to specify @import using the relative path from your Gruntfile.*


## Getting started

Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install grunt-sass`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-sass');
```

And add the tasks you want to `grunt.registerTask`:

```javascript
grunt.registerTask('default', 'lint sass');
```


## Documentation

This grunt task is a [multi task](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md#multi-tasks-%E2%9A%91), which means you can specify multiple subtasks and grunt will iterate over them. The `dist` below is a subtask, you could e.g. create a `dev` subtask to handle stuff while developing.

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

grunt.registerTask('default', 'lint sass');
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


[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
