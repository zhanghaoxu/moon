'use strict';
const { name, info, options } = require('../../database/tables/todos');
module.exports = app => {

  const todos = app.model.define(name, info, options);

  return todos;
};
