'use strict';
// app/service/accounts.js
const Service = require('egg').Service;
const { simpleflake } = require('simpleflakes');
class AccountsService extends Service {

  async create(account) {
    account = await this.app.model.Accounts.create(account);
    return account;
  }

  /**
   * @return {Object} accountModel
   * @param {String}} openid
   */

  async findAccountByOpenId(openid) {
    // check redis
    try {
      const cacheResult = await this.app.redis.get(`moon:account:isRegister:${openid}`);
      if (cacheResult) {
        return JSON.parse(cacheResult);
      }

    } catch (e) {
      // todo log error
    }

    try {
      const account = await this.findOne({
        wxOpenId: openid,
      });
      if (account) {
        this.app.redis.set(`moon:account:isRegister:${openid}`, JSON.stringify(account));
        return account;
      }

      return null;
    } catch (e) {
      // todo log error
      return null;
    }


  }

  async update(where, account) {
    account = await this.app.model.accounts.update(account, {
      where,
    });
    return account;
  }

  async findOne(account) {
    account = await this.app.model.accounts.findOne({
      where: account,
    });
    return account;
  }

  async findAll(account) {
    const accounts = await this.app.model.accounts.findAll({
      where: account,
    });
    return accounts;
  }

  async destroy(account) {
    const result = await this.app.model.accounts.destroy({
      where: account,
      force: false,
    });
    return result;
  }

  generateOrderIdForAccount() {
    const flakeBigInt = simpleflake();
    return flakeBigInt.toString();
  }

  async restore(account) {
    const result = await this.app.model.accounts.restore({
      where: account,
    });
    return result;
  }

}

module.exports = AccountsService;
