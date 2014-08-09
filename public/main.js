(function(){
  'use strict';

  var ASSETS_DIR = '../public/'
    , JS_DIR  = ASSETS_DIR +'js/'
    , com= JS_DIR + 'common'
    , init= JS_DIR+ 'init';

requirejs.config({
      paths : {
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
,     shim: {
        'angular': { exports : 'angular' }
    ,   'angular.animate' : {deps: ['angular']}
    ,   'jqueryMigrate' : {deps: ['jquery']}
    ,   'ui_router' : ['angular']
    ,   'mocks': { deps: ['angular'], 'exports': 'angular.mock' }
}
});

  requirejs([
      'angular'
    , 'jquery'
    , 'init/apps_bootstrap' ], function(angular, jquery, apps_bootstrap) {
      }
  );
// create a new object that inherits from an old one.
if (typeof Object.create !== 'function'){
  Object.create = function(o){
    function F(){}
    F.prototype = o;
    return new F();
  };
}
})();