module.exports = function(config, gulp, $, path, del) {

  return function() {

    return {
      develop: function() {
        return del.sync([path.join(config.paths.temporary.root, '/**/*.*'), String('!').concat(config.paths.temporary.root)]);
      },
      distribute: function() {
        return del.sync([path.join(config.paths.distribute.root, '/**/*.*'), String('!').concat(config.paths.distribute.root)]);
      }
    };

  };

};
