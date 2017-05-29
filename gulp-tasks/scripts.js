module.exports = function(config, gulp, $, path, del, merge, browserSync) {

  return function() {
    
    function _scriptFile(scriptConfig, _destPath) {
      var _folderDest;
      var _file;
      var _fileName = scriptConfig.basename + scriptConfig.extname;
      switch(scriptConfig.dirname) {
        case '.':
        case '':
        case '/':
        case '\\':
          _folderDest = _destPath;
          break;
        default:
          _folderDest = path.join(_destPath, scriptConfig.dirname);
          break;
      }

      if(scriptConfig.concat && scriptConfig.uglify && scriptConfig.sourceMap) {
        _file = gulp.src(scriptConfig.files)
          .pipe($.sourcemaps.init())
          .pipe($.concat(_fileName))
          .pipe($.uglify())
          .pipe($.sourcemaps.write())
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }else if(scriptConfig.concat && scriptConfig.uglify && !scriptConfig.sourceMap) {
        _file = gulp.src(scriptConfig.files)
          .pipe($.concat(_fileName))
          .pipe($.uglify())
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }else if(scriptConfig.concat && !scriptConfig.uglify && scriptConfig.sourceMap) {
        _file = gulp.src(scriptConfig.files)
          .pipe($.sourcemaps.init())
          .pipe($.concat(_fileName))
          .pipe($.sourcemaps.write())
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }else if(scriptConfig.concat && !scriptConfig.uglify && !scriptConfig.sourceMap) {
        _file = gulp.src(scriptConfig.files)
          .pipe($.concat(_fileName))
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }else if(!scriptConfig.concat && scriptConfig.uglify && scriptConfig.sourceMap) {
        _file = gulp.src(scriptConfig.files)
          .pipe($.sourcemaps.init())
          .pipe($.uglify())
          .pipe($.sourcemaps.write())
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }else if(!scriptConfig.concat && scriptConfig.uglify && !scriptConfig.sourceMap) {
        _file = gulp.src(scriptConfig.files)
          .pipe($.uglify())
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }else {
        _file = gulp.src(scriptConfig.files)
          .pipe(gulp.dest(_folderDest))
          .pipe(browserSync.stream());
      }
      return _file;

    };

    function _scriptFiles(_scriptFileData, _destPath) {
      var _mergeStream = merge({
        end: false
      });

      _mergeStream.on('queueDrain', function() {
        _mergeStream.end();
        browserSync.reload();
      });

      for(var group in _scriptFileData) {
        var scriptConfig = _scriptFileData[group];
        _mergeStream.add(_scriptFile(scriptConfig, _destPath));
      }

      return _mergeStream;
    };

    return {
      develop: function(){
        del.sync([
          path.join(config.paths.temporary.scripts, '/**/*.*')
        ]);
        return _scriptFiles(config.main.scripts['develop'], config.paths.temporary.scripts);
      }
    };

  };
  
};
