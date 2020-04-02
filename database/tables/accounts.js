'use strict';
const Sequelize = require('sequelize');
const { BIGINT, DATE, STRING, TINYINT } = Sequelize;
module.exports = {
  name: 'accounts',
  createSuccessCallback(queryInterface) {
    queryInterface.addIndex('accounts', [ 'account' ], {
      name: 'account',
      using: 'BTREE',
      unique: true,
    });
    queryInterface.addIndex('accounts', [ 'user_id' ], {
      name: 'user_id',
      using: 'BTREE',
      unique: false,
    });
  },
  options: {
    // don't forget to enable timestamps!
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    comment: '账号表',
    // 支持软删除
    paranoid: true,
  },
  info: {
    id: {
      type: BIGINT(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: STRING(32),
      allowNull: false,
      field: 'user_id',
      comment: '用户编号',
    },
    account: {
      type: STRING(64),
      allowNull: false,
      field: 'account',
      comment: '第三方账号',
    },
    registrationChannel: {
      type: STRING(32),
      defaultValue: 'miniprogram',
      field: 'registration_channel',
      comment: '注册渠道',
    },
    state: {
      type: TINYINT(4),
      defaultValue: 1,
      comment: '账号状态 0删除 1正常 2冻结',
    },
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DATE,
      field: 'deleted_at',
    },
  },
};
