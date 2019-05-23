# grunt-sass [![Build Status](https://travis-ci.org/sindresorhus/grunt-sass.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-sass)

[<img src="https://github.com/sass/sass-site/blob/master/source/assets/img/logos/logo-seal.png" width="150" align="right">](https://sass-lang.com)

> Compile Sass to CSS using [Dart Sass][] or [Node Sass][].

[Dart Sass]: http://sass-lang.com/dart-sass
[Node Sass]: https://github.com/sass/node-sass

Before filing an issue with this repository, please consider:

* Asking support questions on Use [Stack Overflow][].

* Reporting issues with the output on the [Dart Sass][Dart Sass issues] or [LibSass][LibSass issues] issue trackers, depending which implementation you're using.

* Reporting installation issues on the [Dart Sass][Dart Sass issues] or [Node Sass][Node Sass issues] issue trackers, depending on which implementation you're using.

[Stack Overflow]: https://stackoverflow.com/questions/tagged/node-sass
[Dart Sass issues]: https://github.com/sass/dart-sass/issues/new
[LibSass issues]: https://github.com/sass/libsass/issues/new
[Node Sass issues]: https://github.com/sass/node-sass/issues/new


## Install

```
$ npm install --save-dev node-sass grunt-sass
```


## Usage

```js
const sass = require('node-sass');

require('load-grunt-tasks')(grunt);

grunt.initConfig({
	sass: {
		options: {
			implementation: sass,
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

You can choose whether to use [Dart Sass][] or [Node Sass][] by passing the module to the `implementation` option. One implementation or the other *must* be passed.

Note that when using Dart Sass, **synchronous compilation is twice as fast as asynchronous compilation** by default, due to the overhead of asynchronous callbacks. To avoid this overhead, you can use the [`fibers`](https://www.npmjs.com/package/fibers) package to call asynchronous importers from the synchronous code path. To enable this, pass the `Fiber` class to the `fiber` option:

```js
const Fiber = require('fibers');
const sass = require('node-sass');

require('load-grunt-tasks')(grunt);

grunt.initConfig({
	sass: {
		options: {
			implementation: sass,
			fiber: Fiber,
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

See the Node Sass [options](https://github.com/sass/node-sass#options), except for `file`, `outFile`, `success`, `error`.

The default value for the `precision` option is `10`, so you don't have to change it when using Bootstrap.
