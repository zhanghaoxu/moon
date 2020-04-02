'use strict';
// app/service/auth.js
const Service = require('egg').Service;
const SESSION_KEY_PREFIX = 'moon:account:isRegister:';

class AuthRedisService extends Service {

  async getIsRegisterCache(account) {
    try {
      const cacheResult = await this.app.redis.get(SESSION_KEY_PREFIX + account);
      if (cacheResult) {
        return JSON.parse(cacheResult);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async setIsRegisterCache(account, v) {

    try {
      const result = await this.app.redis.set(SESSION_KEY_PREFIX + account, v);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }


}

module.exports = AuthRedisService;
