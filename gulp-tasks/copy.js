module.exports = function(config, gulp, $, path, del, browserSync) {

  return function() {

    function _fileCopy(_copyFileData, _destPath) {
      var fileGroup = [];
      var relPath = path.join(__dirname, '..');
      for(var group in _copyFileData) {
        var copyGroup = _copyFileData[group];
        for(var fileGlob in copyGroup.files) {
          var fileData = copyGroup.files[fileGlob];
          var fileSrc = path.join(relPath, fileData);
          var fileDest = path.join(relPath, _destPath, copyGroup.dest);
          fileGroup.push(
            gulp.src(fileSrc)
              .pipe(gulp.dest(fileDest))
              .pipe(browserSync.stream())
          );
        }
      }
      return fileGroup;
    }

    return {
      develop: function() {
        return _fileCopy(config.main.copy['develop'], config.paths.temporary.root);
      },
      distribute: function() {
        return _fileCopy(config.main.copy['distribute'], config.paths.distribute.root);
      }
    };

  };

};
