# rubysass task

This task requires you to have Ruby and SASS installed `gem install sass`.


This grunt task is a [multi task](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md#multi-tasks-%E2%9A%91), which means you can specify multiple subtasks and grunt will iterate over them. The `dist` below is a subtask, you could e.g. create a `dev` subtask to handle stuff while developing.

See the [Gruntfile](https://github.com/sindresorhus/grunt-sass/blob/master/Gruntfile.js) in this repo for a full example.


### Example config

```javascript
grunt.initConfig({
	rubysass: {									// Task
		options: {								// Task options
			style: 'compact'
		},
		dist: {									// Target
			files: {							// Dictionary of files
				'main.css': 'main.scss',		// 'destination': 'source'
				'widgets.css': 'widgets.scss'
			}
		},
		dev: {									// Another target
			options: {							// Target options
				style: 'expanded'				// Overrides the task `style` option
			},
			files: {
				'main.css': 'main.scss',
				'widgets.css': [
					'button.scss',
					'tab.scss',
					'debug.scss'				// Maybe you need one extra file in dev
				]
			}
		}
	}
});

grunt.loadNpmTasks('grunt-sass');

grunt.registerTask('default', 'lint rubysass');
```


### Example usage


#### Compile

```javascript
grunt.initConfig({
	rubysass: {
		files: {
			'main.css': 'main.scss'
		}
	}
});
```


#### Concat and compile

If you specify an array of `src` paths they will be concatenated. However, in most cases you would want to just `@import` them into `main.scss`.

```javascript
grunt.initConfig({
	rubysass: {
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

You can specify multiple `destination: source` items in `files`.

```javascript
grunt.initConfig({
	rubysass: {
		files: {
			'main.css': 'main.scss',
			'widgets.css': 'widgets.scss'
		}
	}
});
```


### Options

Specify the options without the `--` and in camelCase. `--unix-newlines` becomes `unixNewlines`


```shell
    --trace                      Show a full traceback on error
    --unix-newlines              Use Unix-style newlines in written files.
    --scss                       Use the CSS-superset SCSS syntax.
    --update                     Compile files or directories to CSS.
                                 Locations are set like --watch.
    --stop-on-error              If a file fails to compile, exit immediately.
                                 Only meaningful for --watch and --update.
-f, --force                      Recompile all Sass files, even if the CSS file is newer.
                                 Only meaningful for --update.
-c, --check                      Just check syntax, don't evaluate.
-t, --style NAME                 Output style. Can be nested (default), compact, compressed, or expanded.
    --precision NUMBER_OF_DIGITS How many digits of precision to use when outputting decimal numbers. Defaults to 3.
-q, --quiet                      Silence warnings and status messages during compilation.
    --compass                    Make Compass imports available and load project configuration.
-g, --debug-info                 Emit extra information in the generated CSS that can be used by the FireSass Firebug plugin.
-l, --line-numbers               Emit comments in the generated CSS indicating the corresponding source line.
    --line-comments
-I, --load-path PATH             Add a sass import path.
-r, --require LIB                Require a Ruby library before running Sass.
    --cache-location PATH        The path to put cached Sass files. Defaults to .sass-cache.
-C, --no-cache                   Don't cache to sassc files.
```