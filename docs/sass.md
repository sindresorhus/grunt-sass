# sass task


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