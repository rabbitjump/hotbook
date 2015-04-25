'use strict';
var requireTree = require('require-tree');
var controllers = requireTree('./controllers');
var router = require('./helpers/router');
var config = require('./config');
var _ = require('lodash');
var addImporter = getImporterMiddleware();

var redisOptions = getRedisOptions();
var session = require('./middlewares/session')(redisOptions);
var nocache = require('./middlewares/query-checker')('cache=false')

var routeInfos = [
  {
    route : '/',
    template : 'home',
    middleware : [addImporter],
    handler : controllers.home
  },
  {
    method : 'post',
    route : '/httplog',
    handler : controllers['http-log']
  },
  {
    method : 'post',
    route : '/statistics',
    handler : controllers.statistics
  },
  {
    method : 'all',
    middleware : [nocache, session],
    route : '/user',
    handler : controllers.user
  }
];


module.exports = router.getRouteHandlers(routeInfos);


/**
 * [getImporterMiddleware 获取file importer的middleware]
 * @return {[type]} [description]
 */
function getImporterMiddleware(){
  var importer = require('./middlewares/importer');
  var staticVerion = null;
  var staticMerge = null;
  var importerOptions = {
    prefix : config.staticUrlPrefix,
    versionMode : 1,
    srcPath : 'src'
  };
  try{
    staticVerion = require('./crc32');
    staticMerge = require('./merge');
  }catch(err){
    console.error(err);
  }
  if(config.env !== 'development'){
    importerOptions.version = staticVerion;
    importerOptions.merge = staticMerge;
  }
  return importer(importerOptions);
}


/**
 * [getRedisOptions 返回redis的配置]
 * @return {[type]} [description]
 */
function getRedisOptions(){
  var options = _.extend({}, config.servers.redis, config.redisOptions);
  if(process.env.REDIS_PWD){
    options.pass = process.env.REDIS_PWD;
  }
  options.cookie = {
    maxage : null
  };
  return options;
}