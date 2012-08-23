[![build status](https://secure.travis-ci.org/sindresorhus/grunt-sass.png)](http://travis-ci.org/sindresorhus/grunt-sass)
# grunt-sass

[Grunt][grunt] task to compile SASS and SCSS using the superfast [libsass](https://github.com/hcatlin/libsass) via [node-sass](https://github.com/andrew/node-sass).

*Note that node-sass is currently under heavy development and might be unstable, there are also some stuff missing, like compression options and file/folder context.*


## Getting started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-sass`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-sass');
```


## Documentation


### Example usage

This grunt task is a [multi task](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md#multi-tasks-%E2%9A%91), which means you can specify multiple subtasks and grunt will iterate over them. The `dist` below is a subtask, you could e.g. create a `dev` subtask to handle stuff while developing.


#### Compile

```javascript
sass: {
	dist: {
		src: 'main.scss',
		dest: 'main.css'
	}
}
```


#### Compile and concat

If you specify an array of files they will be concatenated. However, in most cases you would want to just `@import` them into `main.scss`.

```javascript
sass: {
	dist: {
		src: [
			'reset.scss',
			'main.scss'
		],
		dest: 'combined.css'
	}
}
```


## Tests

Grunt currently doesn't have a way to test tasks directly. You can test this task by running `grunt` and manually verify that it works.


## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.


## License

MIT License
(c) [Sindre Sorhus](http://sindresorhus.com)


[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md