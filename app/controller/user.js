'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async my() {
    const { ctx } = this;
    const sessionValue = ctx.sessionValue;

    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: sessionValue.user,
    };
  }
}
module.exports = UserController;
