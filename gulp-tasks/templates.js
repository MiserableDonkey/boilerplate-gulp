module.exports = function(config, gulp, $, path, del, merge, decache, browserSync) {

  return function() {
    var _compileHandlebarsOptions = {
      batch: config.paths.develop.partials
    };

    function _dataFile(_pageConfig) {
      var _dataPath = path.join(__dirname, '..', config.paths.data, _pageConfig.data);
      var _dataFile;
      decache(_dataPath);
      _dataFile = require(_dataPath);
      _dataFile.pagedata = JSON.stringify(_dataFile) || {};
      return _dataFile;
    };

    function _pageFile(_pageConfig, _destPath) {
        var _templateFilePath = path.join(config.paths.develop.layouts, _pageConfig.layout);
        var _pageFilePath = path.join(_destPath, _pageConfig.dirname, '/');
        var _relativeRootPath = path.relative(_pageFilePath, _destPath + '/');
        if(_relativeRootPath == '' || !_relativeRootPath) {
          _relativeRootPath = '.';
        }
        return gulp.src(_templateFilePath)
          .pipe($.data(function(file) {
            return _dataFile(_pageConfig);
          }))
          .pipe($.compileHandlebars({}, _compileHandlebarsOptions))
          .on('error', _onError)
          .pipe($.rename(function(path) {
            path.dirname = _pageConfig.dirname;
            path.basename = _pageConfig.basename;
            path.extname = _pageConfig.extname;
            return path;
          }))
          .pipe(gulp.dest(_destPath));
    };

    function _pageFiles(_templateFileData, _destPath) {
      var _templateFiles = [];
      for(var group in _templateFileData.files) {
        var _pageConfig = _templateFileData.files[group];
        _templateFiles.push(_pageFile(_pageConfig, _destPath));
      }
      return _templateFiles;
    };

    function _javascriptTemplates(_destPath) {
      var partials = gulp.src(path.join(config.paths.develop.partials, '/**/*.hbs'))
        .pipe($.handlebars({
          handlebars: require('handlebars')
        }))
        .pipe($.wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
          imports: {
            processPartialName: function(filePath) {
              var processName = filePath.replace(path.join(__dirname, '..', config.paths.develop.partials), '').replace('.js', '')
              return JSON.stringify(processName);
            }
          }
        }));

      var templates = gulp.src(path.join(config.paths.develop.partials, '/**/*.hbs'))
        .pipe($.handlebars({
          handlebars: require('handlebars')
        }))
        .pipe($.wrap('Handlebars.template(<%= contents %>)'))
        .pipe($.declare({
          namespace: config.main.namespace + '.Templates',
          noRedeclare: true
        }));
      return merge(partials, templates)
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest(_destPath))
        .pipe(browserSync.stream());
    };

    function _onError(err) {
      console.log(err.message);
      this.emit('end');
    }

    return {
      develop: function() {
        del.sync([
          path.join(config.paths.temporary.root, '/**/*.html'),
          String('!' + config.paths.temporary.root)
        ]);

        if(config.main.pages.compileJSTemplates) _javascriptTemplates(config.paths.temporary.scripts);

        return _pageFiles(config.main.pages['develop'], config.paths.temporary.root);
      },
      distribute: function() {
        del.sync([
          path.join(config.paths.distribute.root, '/**/*.html'),
          String('!' + config.paths.distribute.root)
        ]);

        if(config.main.pages.compileJSTemplates) _javascriptTemplates(config.paths.distribute.scripts);

        return _pageFiles(config.main.pages['distribute'], config.paths.distribute.root);
      },
    };

  };

};
