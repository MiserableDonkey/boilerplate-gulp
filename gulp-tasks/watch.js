module.exports = function(config, gulp, $, path) {

  return function() {

    return {
      develop: function() {
        gulp.watch([
          path.join(config.paths.develop.data, '/**/*.json')
        ], ['styles:develop', 'scripts:develop', 'images:develop', 'templates:develop']);

        gulp.watch([
          path.join(config.paths.develop.templates, 'layouts', '/**/*.handlebars'),
          path.join(config.paths.develop.templates, 'partials', '/**/*.hbs')
        ], ['templates:develop']);

        gulp.watch([
          path.join(config.paths.develop.scripts, '/**/*.js')
        ], ['scripts:develop']);

        gulp.watch([
          path.join(config.paths.develop.styles, '/**/*.scss')
        ], ['styles:develop']);

        gulp.watch([
          path.join(config.paths.develop.images, '/**/*.*')
        ], ['images:develop']);

      }
    };

  };

};
