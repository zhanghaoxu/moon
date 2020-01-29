'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // get

    ctx.body = JSON.stringify({
      code: '200',
      msg: 'success',
    });


  }
}

module.exports = HomeController;
