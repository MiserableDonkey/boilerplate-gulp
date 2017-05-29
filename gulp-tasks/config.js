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
      scripts: 'develop/scripts',
      styles: 'develop/styles',
      fonts: 'develop/fonts'
    }
  };

  var main = require('../data/main.json');

  return {
    process: process,
    paths: paths,
    main: main
  };
};
