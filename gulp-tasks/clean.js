module.exports = function(config, gulp, $, path, del) {

  return function() {

    return {
      develop: function() {
        return del.sync(path.join(config.paths.temporary.root, '/**/*.*'), {force: true});
      },
      distribute: function() {
        return del.sync(path.join(config.paths.distribute.root, '/**/*.*'), {force: true});
      }
    };

  };

};
