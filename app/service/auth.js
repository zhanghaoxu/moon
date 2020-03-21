'use strict';
// app/service/auth.js
const Service = require('egg').Service;
const crypto = require('crypto');
const SESSION_PREFIX = 'moon:session:';
class AuthService extends Service {


  async isRegister(openid) {
    // check cache
    try {
      const cacheResult = await this.ctx.service.authRedis.getIsRegisterCache(openid);
      if (cacheResult) {
        return cacheResult;
      }
    } catch (e) {
      console.log(e);
    }

    const user = await this.ctx.service.users.findUserByOpenId(openid);
    return user;
  }

  async isLogin(session) {

    if (session && (await this.ctx.service.auth.getSession(session))) {
      return true;
    }
    return false;

  }

  getSessionHashKey(openid) {
    const hash = crypto.createHash('sha1');
    hash.update(openid);
    return hash.digest('hex');
  }

  async getSessionFromOpenid(openid) {
    const sessionHashKey = this.ctx.service.auth.getSessionHashKey(openid);
    return this.ctx.service.auth.getSession(sessionHashKey);
  }


  async createSession(user, maxAge = 120 * 24 * 60 * 60) {
    const openid = user.wxOpenId;
    const key = this.ctx.service.auth.getSessionHashKey(openid);

    const oldSession = await this.ctx.service.auth.getSession(key);
    if (oldSession) {
      oldSession.maxAge = maxAge;
      return key;
    }
    try {
      await this.app.sessionStore.set(SESSION_PREFIX + key, {
        user,
        openid,
      }, maxAge);

      return key;

    } catch (e) {
      return null;
    }
  }


  async getSession(sessionHashKey) {
    try {
      return await this.app.sessionStore.get(SESSION_PREFIX + sessionHashKey);
    } catch (e) {
      return null;
    }

  }

}

module.exports = AuthService;
