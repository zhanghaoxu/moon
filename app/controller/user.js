'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async my() {
    const { ctx } = this;
    const sessionValue = ctx.sessionValue;
    const user = await this.ctx.service.users.findUserByUserId(sessionValue.userId);

    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: user,
    };
  }
}
module.exports = UserController;
