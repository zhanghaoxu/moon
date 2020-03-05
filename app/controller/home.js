'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;

    const user = await ctx.service.users.create({
      wxOpenId: 2,
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eobia9YZZcoJQCdY32kKquQFVPM6U5ibJDjzQ0IaE0jnaC6Iosian3TvsIYAiaRQRl0Lz3l3c3fbY5fbA/132',
      city: 'Weifang',
      country: 'China',
      gender: 1,
      language: 'zh_CN',
      nickName: '皓旭',
      province: 'Shandong',
    });

    ctx.body = JSON.stringify({
      code: '200',
      data: {
        user,
        appId: app.config.appId,
      },
      msg: 'success',
    });


  }
}

module.exports = HomeController;
