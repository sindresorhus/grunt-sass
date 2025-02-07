# grunt-sass

> Compile Sass to CSS using [Dart Sass][].

[Dart Sass]: http://sass-lang.com/dart-sass

Before filing an issue with this repository, please consider:

* Asking support questions on [Stack Overflow][].

* Reporting issues with the output on the [Dart Sass][Dart Sass issues] issue tracker.

* Reporting installation issues on the [Dart Sass][Dart Sass issues] issue tracker.

[Stack Overflow]: https://stackoverflow.com/questions/tagged/sass
[Dart Sass issues]: https://github.com/sass/dart-sass/issues/new

## Install

```sh
npm install --save-dev grunt-sass sass
```

## Usage

```js
const sass = require('sass');

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

Files starting with `_` are ignored to match the expected [Sass partial behaviour](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).

## Options

See the Sass [options](https://sass-lang.com/documentation/js-api/interfaces/options/).
