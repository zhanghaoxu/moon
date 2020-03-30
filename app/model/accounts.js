'use strict';
const { name, info, options } = require('../../database/tables/accounts');
module.exports = app => {

  const accounts = app.model.define(name, info, options);

  return accounts;
};
