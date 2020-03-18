'use strict';
const Sequelize = require('sequelize');
const { BIGINT, DATE, STRING, TINYINT } = Sequelize;
module.exports = {
  name: 'todos',
  createSuccessCallback(queryInterface) {
    queryInterface.addIndex('todos', [ 'name' ], {
      name: 'name',
      using: 'BTREE',
      unique: true,
    });
    queryInterface.addIndex('todos', [ 'user_id' ], {
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
    comment: '用户待办事项表',
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
      type: BIGINT(11),
      defaultValue: null,
      field: 'user_id',
      comment: '用户编号',
    },
    name: {
      type: STRING(64),
      allowNull: false,
      field: 'name',
      comment: '待办事项名称',
    },
    state: {
      type: TINYINT(4),
      defaultValue: null,
      field: 'state',
      comment: '待办事项状态 0未完成 1已完成',
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
