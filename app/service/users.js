'use strict';
// app/service/users.js
const Service = require('egg').Service;
const { simpleflake } = require('simpleflakes');
class UsersService extends Service {

  async create(user) {
    user = await this.app.model.Users.create(user);
    return user;
  }

  /**
   * @return {Object} userModel
   * @param {String}} openid
   */

  async findUserByOpenId(openid) {
    // check redis
    try {
      const cacheResult = await this.app.redis.get(`moon:user:isRegister:${openid}`);
      if (cacheResult) {
        return JSON.parse(cacheResult);
      }

    } catch (e) {
      // todo log error
    }

    try {
      const user = await this.findOne({
        wxOpenId: openid,
      });
      console.log('user:', user);
      if (user) {
        this.app.redis.set(`moon:user:isRegister:${openid}`, JSON.stringify(user));
        return user;
      }

      return null;
    } catch (e) {
      // todo log error
      return null;
    }


  }

  async update(where, user) {
    user = await this.app.model.Users.update(user, {
      where,
    });
    return user;
  }

  async findUserByUserId(userId) {
    try {
      return await this.findOne({ userId });
    } catch (e) {
      return null;
    }

  }

  async findOne(user) {
    user = await this.app.model.Users.findOne({
      where: user,
    });
    return user;
  }

  async findAll(user) {
    const users = await this.app.model.Users.findAll({
      where: user,
    });
    return users;
  }

  async destroy(user) {
    const result = await this.app.model.Users.destroy({
      where: user,
      force: false,
    });
    return result;
  }

  generateOrderIdForUser() {
    const flakeBigInt = simpleflake();
    return flakeBigInt.toString();
  }

  async restore(user) {
    const result = await this.app.model.Users.restore({
      where: user,
    });
    return result;
  }

}

module.exports = UsersService;
