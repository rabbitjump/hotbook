;(function(global){

'use strict';
var requires = ['LocalStorageModule', 'jt.service.debug', 'jt.service.httpLog', 'jt.service.user', 'jt.directive.widget'];
var app = angular.module('jtApp', requires);

// 用户在controller中添加require
app.addRequires = function(arr){
  if(!angular.isArray(arr)){
    arr = [arr];
  }
  var requires = app.requires;
  angular.forEach(arr, function(item){
    if(!~requires.indexOf(item)){
      requires.push(item);
    }
  });
  return this;
};


app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  // localstorage的前缀
  localStorageServiceProvider.prefix = 'jt';
}]).config(['$httpProvider', function($httpProvider){
  // 对ajax的请求添加特定header
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  // 如果有配置app的前缀，对所有的http请求添加处理
  var prefix = CONFIG.appUrlPrefix;
  if(prefix){
    var fn = addUrlPrefix(prefix);
    $httpProvider.interceptors.push(fn);
  }

  // http log
  $httpProvider.interceptors.push('httpLog');
}]).config(['$provide', function($provide){
  var params = ['$log', '$injector', error];
  $provide.decorator('$exceptionHandler', params);
}]);


app.run(['$http', '$timeout', '$window', 'debug', run]);


/**
 * [addUrlPrefix 添加http请求前缀]
 * @param {[type]} prefix [description]
 */
function addUrlPrefix(prefix){
  return function(){
    return {
      request : function(config){
        config.url = prefix + config.url;
        return config;
      }
    };
  };
}

/**
 * [error 出错处理]
 * @param  {[type]} $log      [description]
 * @param  {[type]} $injector [description]
 * @return {[type]}           [description]
 */
function error($log, $injector){
  return function(exception, cause){
    if(CONFIG.env === 'development'){
      alert(exception.message);
      $log.error.apply($log, arguments);
    }else{
      var $http = $injector.get('$http');
      $http.post('/exception?httplog=false', {
        message : exception.message,
        stack : exception.stack,
        cause : cause
      });
    }
    
  };
}

/**
 * [run description]
 * @param  {[type]} $http    [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $window  [description]
 * @param  {[type]} debug    [description]
 * @return {[type]}          [description]
 */
function run($http, $timeout, $window, debug){
  TIMING.end('js');
  debug = debug('app.run');
  var statistics = function(){
    var result = angular.extend({
      timeline : TIMING.getLogs(),
      view : {
        width : $window.screen.width,
        height : $window.screen.height
      }
    }, $window.performance);
    $http.post('/statistics', result);
  };

  $window.onload = function(){
    statistics();
  };


  if(CONFIG.env !== 'development'){
    return;
  }
  var checkInterval = 10 * 1000;
  var checkWatchers = function(){
    var watchTotal = 0;
    var fn = function(element){
      if(element.data().hasOwnProperty('$scope')){
        var watchers = element.data().$scope.$$watchers;
        if(watchers){
          watchTotal += watchers.length;
        }
      }
      angular.forEach(element.children(), function(child){
        fn(angular.element(child));
      });
    };
    fn(angular.element(document.body));
    debug('watcher total:' + watchTotal);
    $timeout(function(){
      checkWatchers();
    }, checkInterval);
  };
  
  $timeout(function(){
    checkWatchers();
  }, checkWatchers);
}



app.controller('AppController', AppController);
function AppController($scope, $http, $compile, $element, user){
  var ctrl = this;


  ctrl.login = login;

  ctrl.logout = logout;

  ctrl.session = {};


  $scope.$on('user', function(e, type){
    getSession();
  });
  getSession();

  function login(){
    var obj = angular.element(angular.element('#loginDialog').html());
    var tmpScope = $scope.$new(true);
    angular.extend(tmpScope, {
      status : 'show',
      type : 'login',
      modal : true
    });

    $compile(obj)(tmpScope);
    $element.append(obj);
    tmpScope.submit = function(){
      submit(tmpScope);
    };
    angular.forEach(['account', 'password'], function(key){
      tmpScope.$watch(key, function(){
        tmpScope.error = '';
      });
    });
    
  }


  function logout(){
    user.logout();
  }

  function submit(tmpScope){
    if(!tmpScope.account || !tmpScope.password){
      tmpScope.error = '账号和密码均不能为空';
      return;
    }
    
    tmpScope.submiting = true;
    tmpScope.msg = '正在提交，请稍候...';
    var fn = user[tmpScope.type];
    if(fn){
      fn(tmpScope.account, tmpScope.password).success(function(){
        tmpScope.destroy();
      }).error(function(res){
        tmpScope.error = res.msg || res.error || '未知异常';
        tmpScope.submiting = false;
        tmpScope.msg = '';
      });
    }
  }

  // 获取用户信息
  function getSession(){
    ctrl.session.status = 'loading';
    user.session().then(function(res){
      angular.extend(ctrl.session, res);
      ctrl.session.status = 'success';
    }, function(err){
      ctrl.session.error = err;
      ctrl.session.status = 'fail';
    });
  }
}

AppController.$inject = ['$scope', '$http', '$compile', '$element', 'user'];

})(this);