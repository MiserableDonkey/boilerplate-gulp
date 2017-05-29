module.exports = function(config, gulp, $, _, path, source, browserSync, middleware) {

  return function() {

    return {
      develop: function() {
        browserSync.init({
          browser: 'chrome',
          notify: false,
          port: config.main.env.develop.port,
          cors: true,
          server: {
            baseDir: [config.paths.temporary.root]
          }
        });
      }
    };

  };

};
