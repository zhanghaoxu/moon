/* eslint valid-jsdoc: "off" */

'use strict';
// mysql setting
const localMysqlConfig = require('../database/config.json').local;
// redis setting
// host: '10.177.0.81', // Redis host
// password: 'ujbT3k3M4bW8LMTa',
const LOCAL_REDIS_PORT = 6379;
const LOCAL_REDIS_HOST = '127.0.0.1';
const LOCAL_REDIS_PASSWORD = '';
const LOCAL_REDIS_DB = 1;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = {

  sequelize: localMysqlConfig,
  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: localMysqlConfig.host,
      // 端口号
      port: localMysqlConfig.port,
      // 用户名
      user: localMysqlConfig.username,
      // 密码
      password: localMysqlConfig.password,
      // 数据库名
      database: localMysqlConfig.database,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
  redis: {
    client: {
      port: LOCAL_REDIS_PORT, // Redis port
      host: LOCAL_REDIS_HOST, // Redis host
      password: LOCAL_REDIS_PASSWORD,
      db: LOCAL_REDIS_DB,
    },
  },


};
