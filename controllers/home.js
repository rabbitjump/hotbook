'use strict';
var debug = require('../helpers/debug');
module.exports = function *(){
  this.state.viewData = {
    bannerList : [
      'http://img1.chuangshi.qq.com/upload/cmsv2/1429584234.jpg',
      'http://img1.chuangshi.qq.com/upload/cmsv2/1428546560.jpg',
      'http://img1.chuangshi.qq.com/upload/cmsv2/1428572550.jpg'
    ],
    categoryList : ['灵异', '都市', '玄幻', '免费'],
    recommandBooks : [
      {
        name : '最强兵王',
        author : '丛林狼',
        type : '战争幻想',
        desc : '最强兵王，虎视群雄，为国而战，为民出鞘，只有站死，绝不跪生。',
        cover : 'http://chuangshi.qq.com/Public/mainsite/Uploads/2014-01-04/52c821c4b479f.jpg'
      },
      {
        name : '冰山女神爱上我',
        author : '沐棠纯',
        type : '都市生活',
        desc : '陈扬从战场受伤归来，只想低调的过过正常的生活。奈何，生活不易，被未婚校花老婆甩了，遭到未来丈母娘的白眼。谁曾想运气更坏，麻烦不断，艳遇不断，各路美女纷纷来袭。给匪妞当当保镖，陪老师聊聊天，偶尔还要被警花倒追，日子不再平静……',
        cover : 'http://img1.chuangshi.qq.com/upload/cover/20141119/cb_546c1982df718.jpg'
      },
      {
        name : '天苍黄',
        author : '有时糊涂',
        type : '东方玄幻',
        desc : '天地不仁以万物为刍狗！圣人不仁以百姓为刍狗！死里逃生，脱胎换骨。仇人，藏于九地之下！江湖，朝堂，何处寻觅？江湖隐士，遁世仙门，门阀世家，纷纷粉墨登场，数千年前的隐秘被揭开。天道何在！爱恨情仇，如何选择？',
        cover : 'http://img1.chuangshi.qq.com/upload/cover/20150125/cb_54c3c80b9af38.jpg'
      }

    ]
  };
};