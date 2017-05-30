module.exports = function(config, gulp, $, _, path, source, browserSync) {

  return function() {

    return {
      develop: function() {
        browserSync.watch('**/*.html').on('change', browserSync.reload);
        browserSync.watch('css/**/*.css').on('change', browserSync.reload);
        browserSync.watch('js/**/*.js').on('change', browserSync.reload);
        browserSync.watch('img/**/*.{svg,jpg,gif,png}').on('change', browserSync.reload);
        browserSync.watch('fonts/**/*.*').on('change', browserSync.reload);
        browserSync.watch('media/**/*.*').on('change', browserSync.reload);
        browserSync.watch('files/**/*.*').on('change', browserSync.reload);
        browserSync.init({
          browser: "chrome",
          port: 8000,
          server: {
            baseDir: ['.tmp'],
          },
          snippetOptions: {
            rule: {
              match: /<\/body>/i,
              fn: function (snippet, match) {
                return snippet + match;
              }
            }
          },
        });
      }
    };

  };

};
