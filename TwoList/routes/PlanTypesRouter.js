/*Created By Zhang Xingping 20170329*/
/*
* 按需路由配置
* */

module.exports =  {
  //路径定义
  path: '/plantypes',
  name:' 计划种类 ',
  //获取模块回调
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      //获取模块
      let Module = require('../pages/PlanTypes/index');
      //路由回调进入手动执行方法
      //Module.HomeOnEnter();
      //注入页面组件
      cb(null, Module.default)
    })
  },

  childRoutes:[
    
  ]
}