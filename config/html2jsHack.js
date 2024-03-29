"use strict";
var util = require('util');


var TEMPLATE = 'angular.module(\'%s\', []).run(function($templateCache) {\n' +
  '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
  '});\n';

var REQUIRE_MODULE_TPL = 'require([\'angular\'], function(angular) {' +
  TEMPLATE +
  '});\n';

var SINGLE_MODULE_TPL = '(function(module) {\n' +
  'try {\n' +
  '  module = angular.module(\'%s\');\n' +
  '} catch (e) {\n' +
  '  module = angular.module(\'%s\', []);\n' +
  '}\n' +
  'module.run(function($templateCache) {\n' +
  '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
  '});\n' +
  '})();\n';

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

var createHtml2JsPreprocessor = function(logger, basePath, config) {
  config = typeof config === 'object' ? config : {};

  var log = logger.create('preprocessor.html2js');
  var moduleName = config.moduleName;
  var enableRequireJs = config.enableRequireJs;
  var stripPrefix = new RegExp('^' + (config.stripPrefix || ''));
  var prependPrefix = config.prependPrefix || '';
  var cacheIdFromPath = config && config.cacheIdFromPath || function(filepath) {
    return prependPrefix + filepath.replace(stripPrefix, '');
  };

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);
    var htmlPath = cacheIdFromPath(file.originalPath.replace(basePath + '/', ''));

    file.path = file.path + '.js';

    if (enableRequireJs) {
      done(util.format(REQUIRE_MODULE_TPL, htmlPath, htmlPath, escapeContent(content)));
    } else{
      if(moduleName) {
        done(util.format(SINGLE_MODULE_TPL, moduleName, moduleName, htmlPath, escapeContent(content)));
      } else {
        done(util.format(TEMPLATE, htmlPath, htmlPath, escapeContent(content)));
      }
    }
  };
};

createHtml2JsPreprocessor.$inject = ['logger', 'config.basePath', 'config.ngHtml2JsPreprocessor'];

module.exports = createHtml2JsPreprocessor;


















