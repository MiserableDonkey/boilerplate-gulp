module.exports = function(config, gulp, $, _, path, source, browserSync) {

  return function() {

    return {
      develop: function() {
        browserSync.init({
          browser: "chrome",
          port: 8000,
          notify: false,
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
