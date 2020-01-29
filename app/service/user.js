'use strict';
// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {

  async create(user) {
    user = await this.app.mysql.insert('users', user);
    return user;
  }

}

module.exports = UserService;
