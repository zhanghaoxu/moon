'use strict';
const { name, info, options } = require('../../database/tables/users');
module.exports = app => {

  const users = app.model.define(name, info, options);

  return users;
};
