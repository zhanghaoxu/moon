'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {


  async isRegister() {
    const platform = this.ctx.header[this.app.config.platformCheck.key];
    console.log('platform:', platform);
    switch (platform) {
      case 'app':
        await this.isAppRegister();
        break;
      default:
        await this.isMiniprogramRegister();
    }

  }

  async isMiniprogramRegister() {
    const { code } = this.ctx.request.body;
    const wxInfo = await this.ctx.service.wechat.getOpenIdAndUpdateSessionKey(code);
    if (!wxInfo) {
      const { getErrorResponseInfo, WX_REQUEST_FAIL_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(WX_REQUEST_FAIL_CODE);
      return;
    }
    const { openid } = wxInfo;

    const user = await this.ctx.service.auth.isRegister(openid);

    const isRegister = !!user;
    let session = null;

    if (isRegister) {
      // 更新用户的session maxAge
      // 生成session

      session = await this.ctx.service.auth.createSession(user);
      // 更新注册缓存 （不关心结果）
      this.ctx.service.authRedis.setIsRegisterCache(openid, JSON.stringify(user));
    }

    this.ctx.body = {
      code: 200,
      data: {
        isRegister,
        session,
      },
      msg: '获取注册状态成功',
    };
  }

  async isAppRegister() {

  }

  async isLogin() {
    const sessionHashKey = this.ctx.request.header[this.app.config.authCheck.key];

    const isLogin = await this.ctx.service.miniprogramAuth.isLogin(sessionHashKey);

    this.ctx.body = {
      code: 200,
      msg: '获取登陆状态成功',
      data: { isLogin },
    };
  }


  async login() {
    const platform = this.ctx.request.header[this.app.config.platformCheck.key];

    switch (platform) {
      case 'app':
        await this.loginApp();
        break;
      default:
        await this.loginMiniProgram();

    }
  }

  async loginApp() {

  }

  async loginMiniProgram() {
    const { code } = this.ctx.request.body;
    const { openid } = await this.ctx.service.wechat.getOpenIdAndUpdateSessionKey(code);
    const user = await this.ctx.service.users.findUserByOpenId(openid);
    if (!user) {
      const { getErrorResponseInfo, USER_NOT_REGISTER_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(USER_NOT_REGISTER_CODE);
      return;
    }
    const session = await this.ctx.service.miniprogramAuth.createSession(user);
    if (!session) {
      const { getErrorResponseInfo, CREATE_USER_SESSION_FAIL_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(CREATE_USER_SESSION_FAIL_CODE);
      return;
    }
    this.ctx.body = {
      code: 200,
      msg: '登陆成功',
      data: {
        session,
        user,
      },
    };
  }

  async registerFromMiniProgram() {
    const { userInfo, code, encryptedData, iv, rawData, signature } = this.ctx.request.body;
    // code 换取openid session_key
    const { openid, session_key } = await this.ctx.service.wechat.getOpenIdAndUpdateSessionKey(code);
    // 已注册
    const _user = await this.ctx.service.users.findUserByOpenId(openid);

    if (_user) {
      this.ctx.body = {
        code: -1,
        msg: '用户已注册',
        data: null,
      };
      return;
    }
    // 签名验证
    if (this.ctx.service.wechat.checkUserInfoSignature(rawData, signature, session_key)) {
      this.ctx.body = {
        code: -5,
        data: null,
        msg: '用户信息签名错误',
      };
    }

    // 通过雪花算法 为用户生成唯一userId 方便以后进行数据库扩展
    userInfo.userId = this.ctx.service.users.generateOrderIdForUser();
    // 插入用户表
    const user = await this.ctx.service.users.create(Object.assign({}, userInfo, {
      wxOpenId: openid,
    }));
    // 生成session
    const key = await this.ctx.service.miniprogramAuth.createSession(user);
    // 更新注册缓存 （不关心结果）
    this.ctx.service.authRedis.setIsRegisterCache(openid, user);
    this.ctx.body = {
      code: 200,
      msg: '注册成功',
      data: {
        user,
        session: key,
      },
    };

  }

  async registerFromApp() {

  }

  async register() {

    const platform = this.ctx.request.header[this.app.config.platformCheck.key];

    switch (platform) {
      case 'app':
        await this.registerFromApp();
        break;
      default:
        await this.registerFromMiniProgram();

    }

  }
}
module.exports = AuthController;
