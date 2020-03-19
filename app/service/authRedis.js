'use strict';
// app/service/auth.js
const Service = require('egg').Service;
const crypto = require('crypto');
const SESSION_KEY_PREFIX = 'moon:session:';
const IS_REGISTER_PREFIX = 'moon:user:isRegister:';
class AuthRedisService extends Service {

  async getIsRegisterCache(openid) {
    try {
      const cacheResult = await this.app.redis.get(IS_REGISTER_PREFIX + openid);
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
      const result = await this.app.redis.set(IS_REGISTER_PREFIX + openid, v);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getSessionCache(userId) {
    try {
      const cacheResult = await this.app.redis.get(SESSION_KEY_PREFIX + userId);
      if (cacheResult) {
        return JSON.parse(cacheResult);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async setSessionCache(userId, v) {
    try {
      const result = await this.app.redis.set(SESSION_KEY_PREFIX + userId, v);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}

module.exports = AuthRedisService;
