module.exports = function(yargs) {
  var config = {};
  var process = yargs.argv._[yargs.argv._.indexOf('develop')]
              || yargs.argv._[yargs.argv._.indexOf('default')]
              || 'default';
  var paths = {
    node: 'node_modules',
    bower: 'bower_components',
    data: 'data',
    temporary: {
      root: '.tmp',
      images: '.tmp/img',
      templates: '.tmp',
      scripts: '.tmp/js',
      styles: '.tmp/css',
      fonts: '.tmp/fonts'
    },
    develop: {
      root: 'develop',
      assets: 'develop/assets',
      data: 'develop/data',
      images: 'develop/images',
      templates: 'develop/templates',
      layouts: 'develop/templates/layouts',
      partials: 'develop/templates/partials',
      scripts: 'develop/scripts',
      styles: 'develop/styles',
      fonts: 'develop/fonts'
    },
    distribute: {
      root: 'dist',
      images: 'dist/img',
      scripts: 'dist/js',
      styles: 'dist/css',
      fonts: 'dist/fonts'
    }
  };

  var main = require('../data/main.json');

  return {
    process: process,
    paths: paths,
    main: main
  };
};
