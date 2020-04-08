'use strict';
// app/service/accounts.js
const Service = require('egg').Service;
const { simpleflake } = require('simpleflakes');
class AccountsService extends Service {

  async create(account) {
    account = await this.app.model.Accounts.create(account);
    return account;
  }

  async checkPassword(password) {
    return 1;
  }

  /**
   * @return {Object} accountModel
   * @param {String}} unionid
   */

  async findRegistrationInfoByAccount(account) {
    // check redis
    try {
      const cacheResult = await this.ctx.service.authRedis.getIsRegisterCache(account);

      if (cacheResult) {
        return cacheResult;
      }

    } catch (e) {
      // todo log error
      console.log(e);
    }

    try {
      const userId = await this.getUserIdByAccount({
        account,
      });
      if (userId) {
        console.log('userId:', userId);
        // 更新注册缓存 （不关心结果）
        this.ctx.service.authRedis.setIsRegisterCache(account, userId);
        return userId;
      }

      this.ctx.service.authRedis.setIsRegisterCache(account, 0);

      return 0;


    } catch (e) {
      console.log(e);
      // todo log error
      return 0;
    }


  }

  async update(where, account) {
    account = await this.app.model.accounts.update(account, {
      where,
    });
    return account;
  }

  async getUserIdByAccount(account) {
    const accountInfo = await this.app.model.Accounts.findOne({
      attributes: [ 'userId' ],
      where: account,
    });
    if (accountInfo) {
      return accountInfo.userId;
    }
    return 0;
  }

  async findOne(account) {
    const accountItem = await this.app.model.accounts.findOne({
      where: account,
    });
    return accountItem;
  }

  async hasOne(account) {
    const result = await this.app.model.accounts.findOne({
      where: account,
    });
    return result;
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


  async restore(account) {
    const result = await this.app.model.accounts.restore({
      where: account,
    });
    return result;
  }

  generateOrderIdForAccount() {
    const flakeBigInt = simpleflake();
    return flakeBigInt.toString();
  }

}

module.exports = AccountsService;
