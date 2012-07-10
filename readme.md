# grunt-sass

[Grunt][grunt] tasks to compile SASS:

## [`sass` task](https://github.com/sindresorhus/grunt-sass/blob/using-grunt-0-4/docs/sass.md)

Uses the experimental and superfast Node.js based SASS compiler, [node-sass](https://github.com/andrew/node-sass), which uses [libsass](https://github.com/hcatlin/libsass). This task only compiles .scss files.

*Note that node-sass is currently under heavy development and might be unstable, there are also some stuff missing, like compression options and file/folder context, which means you need to specify @import using the relative path from your Gruntfile. You also need to include the extension*


## [`rubysass` task](https://github.com/sindresorhus/grunt-sass/blob/using-grunt-0-4/docs/rubysass.md)

Uses the official Ruby based SASS compiler, which is stable, but also slow and has a Ruby dependency. Currently the recommended one to use in production. It also supports the old Sass syntax (.sass).



## Getting started

Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install grunt-sass`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-sass');
```

And add the tasks you want to `grunt.registerTask`:

```javascript
grunt.registerTask('default', 'lint sass');
// or `rubysass`
// grunt.registerTask('default', 'lint rubysass');
```


## Documentation

- [`sass`](https://github.com/sindresorhus/grunt-sass/blob/using-grunt-0-4/docs/sass.md)
- [`rubysass`](https://github.com/sindresorhus/grunt-sass/blob/using-grunt-0-4/docs/rubysass.md)






## Tests

Grunt currently doesn't have a way to test tasks directly. You can test this task by running `grunt` and manually verify that it works.


## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.


## License

MIT License
(c) [Sindre Sorhus](http://sindresorhus.com)


[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md