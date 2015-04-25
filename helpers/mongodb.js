'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var requireTree = require('require-tree');
var client = null;
var debug = require('./debug');

exports.init = init;
exports.initModels = initModels;
exports.model = model;

/**
 * [init 初始化mongodb server]
 * @param  {[type]} uri     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function init(uri, options){
  options = options || {};
  var defaults = {
    db : {
      native_parser : true
    },
    server : {
      poolSize : 5
    }
  };
  options = _.extend(options, defaults);
  client = mongoose.createConnection(uri, options);
  client.on('connected', function(){
    console.info(uri + ' connected');
  });
  client.on('disconnected', function(){
    console.info(uri + ' disconnected');
  });
  client.on('error', function(err){
    console.error(err);
  });
}


/**
 * [initModels 初始化models]
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
function initModels(modelPath){
  if(!client){
    throw new Error('the db is not init!');
  }
  var models = requireTree(modelPath);
  _.forEach(models, function(model, name){
    name = name.charAt(0).toUpperCase() + name.substring(1);
    if(model.name){
      name = model.name;
    }
    let schema = new Schema(model.schema, model.options);
    if(model.indexes){
      _.forEach(model.indexes, function(indexOptions){
        schema.index(indexOptions);
      });
    }
    client.model(name, schema);
  });
}

/**
 * [model 返回mongoose model]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function model(name){
  if(!client){
    throw new Error('the db is not init!');
  }
  return client.model(name);
}