module.exports = function(config, gulp, $, path, del, browserSync) {

  return function() {

    function _styleFile(_styleConfig, _destPath) {
      var _folderDest = _styleConfig.dirname;
      var _fileDest = _styleConfig.basename + _styleConfig.extname;
      var _sassConfig = {};
      _sassConfig.outputStyle = _styleConfig.outputStyle;
      _sassConfig.errLogToConsole = true;
      if(_styleConfig.sourceMap) {
        _sassConfig.sourceMap = true;
        _sassConfig.sourceMapEmbed = true;
        _sassConfig.outFile = path.join(_folderDest, _fileDest);
      }

      switch(_styleConfig.dirname) {
        case '.':
        case '':
        case '/':
        case '\\':
          _folderDest = _destPath;
          break;
        default:
          _folderDest = path.join(_destPath, _styleConfig.dirname);
          break;

      };

      var _file = gulp.src(_styleConfig.files)
        .pipe($.sass(_sassConfig))
        .on('error', _onError)
        .pipe($.autoprefixer())
        .pipe(gulp.dest(_folderDest))
        .on('end', browserSync.reload);
      return _file;
    };

    function _styleFiles(_styleFileData, _destPath) {
      var _files = [];
      for(var group in _styleFileData) {
        var styleConfig = _styleFileData[group];
        _files.push(_styleFile(styleConfig, _destPath));
      }
      return _files;
    };

    function _onError(err) {
      console.log(err.status);
      console.log(err.message);
      this.emit('end');
    }

    return {
      develop: function(){
        del.sync(path.join(config.paths.temporary.styles, '/**/*.*'));
        return _styleFiles(config.main.styles['develop'], config.paths.temporary.styles);
      },
      distribute: function(){
        del.sync(path.join(config.paths.distribute.styles, '/**/*.*'));
        return _styleFiles(config.main.styles['distribute'], config.paths.distribute.styles);
      }
    };

  };

};
