'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {


  async isRegister() {
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
      console.log(session);
      // 更新注册缓存 （不关心结果）
      this.app.redis.set(`moon:user:isRegister:${openid}`, JSON.stringify(user));
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

  async isLogin() {
    const { session } = this.ctx.request.body;
    const isLogin = await this.ctx.service.auth.isLogin(session);
    this.ctx.body = {
      code: 200,
      msg: '获取登陆状态成功',
      data: { isLogin },
    };
  }

  async login() {
    const { code } = this.ctx.request.body;
    const { openid } = await this.ctx.service.wechat.getOpenIdAndUpdateSessionKey(code);
    const user = await this.ctx.service.users.findUserByOpenId(openid);
    if (!user) {
      const { getErrorResponseInfo, USER_NOT_REGISTER_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(USER_NOT_REGISTER_CODE);
      return;
    }
    const session = await this.ctx.service.auth.createSession(user);
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

  async register() {

    const { userInfo, code, encryptedData, iv, rawData, signature } = this.ctx.request.body;
    // code 换取openid session_key
    const { openid, session_key } = await this.ctx.service.wechat.getOpenIdAndUpdateSessionKey(code);
    // 已注册
    const _user = await this.ctx.service.users.findUserByOpenId(openid);
    console.log('111', _user);
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
    // 插入用户表
    const user = await this.ctx.service.users.create(Object.assign({}, userInfo, {
      wxOpenId: openid,
    }));
    // 生成session
    const key = await this.ctx.service.auth.createSession(user);
    // 更新注册缓存 （不关心结果）
    this.app.redis.set(`moon:user:isRegister:${openid}`, user);
    this.ctx.body = {
      code: 200,
      msg: '注册成功',
      data: {
        user,
        session: key,
      },
    };

  }
}
module.exports = AuthController;
