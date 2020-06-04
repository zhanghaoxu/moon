'use strict';
const tableName = 'group';
const { name, info, options, createSuccessCallback } = require(`../tables/${tableName}`);
module.exports = {
  up: (queryInterface, Sequelize) => {

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.createTable(
      name,
      info,
      options
    ).then(() => {
      createSuccessCallback(queryInterface);
    });

  },
  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.dropTable(tableName);

  },
};
