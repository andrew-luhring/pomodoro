/*jshint expr: true, undef: true */
(function(){
  'use strict';


  var tests = []
    , regex = /(tests\/)(_.*\.js)/
    , recursive = /(tests\/)(.*\/)(_.*\.js)/
    , not = /(.[_])*((^(?:(?!ignore).)*)(js))/;

  for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (regex.test(file)  || recursive.test(file) && not.test(file) ) {
//    console.log('\n******************************' + 'testing: ' + file + '\n******************************' );
        tests.push (file);
      }
    }
  }

  var ASSETS_DIR = '../public/'
    , JS_DIR  = ASSETS_DIR +'js/'
    , com= JS_DIR + 'common'
    , init= JS_DIR+ 'init';

  require.config({
    baseUrl: '/base/public/'
    , paths : {
//    Initialization
//    -----------------------
      init : init
      ,  'apps_init' : 'js/init/apps_init'
      ,  'apps_bootstrap' : 'js/init/apps_bootstrap'
//    Common
//    -----------------------
      ,  com : com

//    Frameworks
//    -----------------------
      ,  'angular': 'lib/angular/angular'
      ,  'angular.animate' : 'lib/angular-animate/angular-animate'
      ,  'jquery': 'lib/jquery/jquery.js'
      ,  'lodash': 'lib/lodash/dist/lodash.compat'
      ,  'mocks': 'lib/angular-mocks/angular-mocks'
      ,  'ui_router': 'lib/angular-ui-router/release/angular-ui-router'
      ,  'Q': 'lib/q/q'
    }
, shim: {
  'angular': { exports : 'angular' }
  ,   'angular.animate' : {deps: ['angular']}
  ,   'jqueryMigrate' : {deps: ['jquery']}
  ,   'ui_router' : ['angular']
  ,   'mocks': { deps: ['angular'], 'exports': 'angular.mock' }
    }

    , priority: 'angular'
    , deps: tests.reverse()
    , callback: window.__karma__.start
  });


})();