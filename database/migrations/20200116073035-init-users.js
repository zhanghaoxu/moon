'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { BIGINT, DATE, STRING, TINYINT } = Sequelize;
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.createTable('users', {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: STRING(32),
        defaultValue: null,
        comment: '用户编号',
      },
      language: {
        type: STRING(32),
        defaultValue: null,
        comment: '语言',
      },
      gender: {
        type: TINYINT(1),
        defaultValue: 1,
        comment: '性别',
      },
      city: {
        type: STRING(64),
        defaultValue: null,
        comment: '城市',
      },
      province: {
        type: STRING(64),
        defaultValue: null,
        comment: '省份',
      },
      avatar_url: {
        type: STRING(255),
        defaultValue: null,
        comment: '头像链接',
      },
      wx_union_id: {
        type: STRING(64),
        defaultValue: null,
        comment: '用户微信unionid',
      },
      mood_desc: {
        type: STRING(255),
        defaultValue: null,
        comment: '心情描述',
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
      comment: '用户表',
    }).then(() => {
      queryInterface.addIndex('users', [ 'wx_union_id' ], {
        name: 'idx_union_id',
        using: 'BTREE',
        unique: true,
      });
      queryInterface.addIndex('users', [ 'user_id' ], {
        name: 'idx_user_id',
        using: 'BTREE',
        unique: true,
      });
    });

  },

  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.dropTable('users');

  },
};
