'use strict';
var systemError = require('./system');
exports.get = getError;


/**
 * [getError 根据code返回error对象]
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
function getError(code, language){
  language = language || 'en';
  // 1 - 200 system error

  var data = systemError[code];
  var msg;
  if(!data){
    msg = 'the error code is undefined';
  }else{
    msg = data[language];
  }
  var err = new Error(msg);
  err.code = code;
  err.data = {
    code : code,
    msg : msg
  };
  return err;
  
}