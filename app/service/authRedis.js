'use strict';
// app/service/auth.js
const Service = require('egg').Service;
const SESSION_KEY_PREFIX = 'moon:wechat:session:';

class AuthRedisService extends Service {

  async getIsRegisterCache(openid) {
    try {
      const cacheResult = await this.app.redis.get(SESSION_KEY_PREFIX + openid);
      if (cacheResult) {
        return JSON.parse(cacheResult);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async setIsRegisterCache(openid, v) {

    try {
      console.log(111);
      const result = await this.app.redis.set(SESSION_KEY_PREFIX + openid, v);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }


}

module.exports = AuthRedisService;
