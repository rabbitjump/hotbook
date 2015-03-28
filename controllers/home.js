'use strict';
module.exports = function *(){
  this.state.viewData = {
    items : [
      {
        title : 'xxxx',
        novelList : [
          {
            name : 'xxxx',
            author : 'xxx',
            desc : 'xxx'
          }
        ]
      },
      {
        title : 'vvvvv'
      }
    ],
    globals : {
      test : 1
    }
  };
};