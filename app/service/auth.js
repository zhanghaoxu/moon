'use strict';
// app/service/auth.js
const Service = require('egg').Service;
const crypto = require('crypto');
const SESSION_PREFIX = 'moon:session:';
class AuthService extends Service {


  async isRegister(account) {
    // check cache
    try {
      const cacheResult = await this.ctx.service.authRedis.getIsRegisterCache(account);
      if (cacheResult) {
        return cacheResult;
      }
    } catch (e) {
      console.log(e);
    }

    const accountItem = await this.ctx.service.accounts.findUserByOpenId(account);
    return accountItem;
  }

  async isLogin(session) {

    if (session && (await this.ctx.service.auth.getSession(session))) {
      return true;
    }
    return false;

  }

  getSessionHashKey(account) {
    const hash = crypto.createHash('sha1');
    hash.update(account);
    return hash.digest('hex');
  }

  async getSessionFromOpenid(account) {
    const sessionHashKey = this.ctx.service.auth.getSessionHashKey(account);
    return this.ctx.service.auth.getSession(sessionHashKey);
  }


  async createSession(accountItem, maxAge = 120 * 24 * 60 * 60) {
    const account = accountItem.account;
    const key = this.ctx.service.auth.getSessionHashKey(account);

    const oldSession = await this.ctx.service.auth.getSession(key);
    if (oldSession) {
      oldSession.maxAge = maxAge;
      return key;
    }
    try {
      await this.app.sessionStore.set(SESSION_PREFIX + key, {
        accountItem,
        account,
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
