'use strict';
// app/service/auth.js
const Service = require('egg').Service;

const SESSION_KEY_PREFIX = 'moon:wechat:sessionKey:';
class AuthRedisService extends Service {

  async getSessionKeyCache(openid) {
    try {
      const cacheResult = await this.app.redis.get(SESSION_KEY_PREFIX + openid);
      if (cacheResult) {
        return cacheResult;
      }
      return null;

    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async setSessionKeyCache(openid, v) {
    try {
      const result = await this.app.redis.set(SESSION_KEY_PREFIX + openid, v);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }


}

module.exports = AuthRedisService;
