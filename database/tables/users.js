'use strict';
const Sequelize = require('sequelize');
const { BIGINT, DATE, STRING, TINYINT } = Sequelize;
module.exports = {
  name: 'users',
  createSuccessCallback(queryInterface) {
    queryInterface.addIndex('users', [ 'wx_open_id' ], {
      name: 'idx_open_id',
      using: 'BTREE',
      unique: true,
    });
    queryInterface.addIndex('users', [ 'user_id' ], {
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
    comment: '用户表',
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
    nickName: {
      type: STRING(64),
      defaultValue: null,
      field: 'nick_name',
      comment: '用户昵称',
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
    country: {
      type: STRING(64),
      defaultValue: null,
      comment: '国家',
    },
    avatarUrl: {
      type: STRING(255),
      defaultValue: null,
      field: 'avatar_url',
      comment: '头像链接',
    },
    wxOpenId: {
      type: STRING(64),
      defaultValue: null,
      field: 'wx_open_id',
      comment: '用户微信openid',
    },
    moodDesc: {
      type: STRING(255),
      defaultValue: null,
      field: 'mood_desc',
      comment: '心情描述',
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
