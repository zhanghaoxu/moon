'use strict';
const getSha1HashString = require('../utils/util').getSha1HashString;
const Controller = require('egg').Controller;
class AuthController extends Controller {


  async isRegister() {
    const platform = this.ctx.header[this.app.config.platformCheck.key];
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
    const wxInfo = await this.ctx.service.wechat.getUnionidAndUpdateSessionKey(code);
    if (!wxInfo) {
      const { getErrorResponseInfo, WX_REQUEST_FAIL_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(WX_REQUEST_FAIL_CODE);
      return;
    }
    // 使用unionid作为账号注册
    const account = wxInfo.unionid;
    const userId = await this.ctx.service.auth.isRegister(account);

    let session = null;

    if (userId) {
      // 更新用户的session maxAge
      // 生成session

      session = await this.ctx.service.auth.createSession({
        account,
        userId,
      });

    }

    this.ctx.body = {
      code: 200,
      data: {
        isRegister: userId ? 1 : 0,
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
    const { unionid, openid, session_key } = await this.ctx.service.wechat.getUnionidAndUpdateSessionKey(code);
    // 已注册
    const account = unionid;
    let userId = await this.ctx.service.auth.isRegister(account);

    if (userId) {
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
      return;
    }

    // 通过雪花算法 为用户生成唯一userId 方便以后进行数据库扩展
    userId = this.ctx.service.users.generateOrderIdForUser();

    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      const _account = {
        userId,
        account,
      };
      await this.ctx.service.accounts.create(Object.assign({}, _account, {

        registrationChannel: 'miniprogram',

      }));
      const user = await this.ctx.service.users.create(Object.assign({}, userInfo, { userId }));


      await conn.commit(); // 提交事务
      // 生成session
      const key = await this.ctx.service.auth.createSession(_account);
      // 更新注册缓存 （不关心结果）
      this.ctx.service.authRedis.setIsRegisterCache(account, userId);

      this.ctx.body = {
        code: 200,
        msg: '注册成功',
        data: {
          user,
          session: key,
        },
      };
    } catch (err) {
      // error, rollback
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
    // don't commit or rollback by yourself
    // 插入用户表


  }

  async registerFromApp() {
    const { nickName, email, password, repassword } = this.ctx.request.body;
    console.log(this.ctx.request.body);
    // todo params validate

    // check email register or not
    const accountHasRegistered = await this.ctx.service.auth.isRegister(email);

    if (accountHasRegistered) {
      this.ctx.body = {
        code: -1,
        msg: '用户已注册',
        data: null,
      };
      return;
    }

    // 通过雪花算法 为用户生成唯一userId 方便以后进行数据库扩展
    const userId = this.ctx.service.users.generateOrderIdForUser();
    const conn = await this.app.mysql.beginTransaction(); // 初始化事务
    const account = email;

    try {
      const _account = {
        userId,
        account,
      };
      await this.ctx.service.accounts.create(Object.assign({}, _account, {
        password: getSha1HashString(password),
        registrationChannel: 'app',
      }));
      await this.ctx.service.users.create(Object.assign({}, { nickName, userId }));


      await conn.commit(); // 提交事务

      // 更新注册缓存 （不关心结果）
      this.ctx.service.authRedis.setIsRegisterCache(account, userId);

      this.ctx.body = {
        code: 200,
        msg: '注册成功',
        data: 1,
      };
      return;
    } catch (err) {
      console.log('catch error:', err);
      // error, rollback
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }

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
