/* eslint valid-jsdoc: "off" */

'use strict';
const devServerMysqlConfig = require('../database/config.json')['dev-server'];
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

// redis setting
// host: '10.177.0.81', // Redis host
// password: 'ujbT3k3M4bW8LMTa',
const DEV_REDIS_PORT = '6379';
const DEV_REDIS_HOST = '207.246.127.110';
const DEV_REDIS_PASSWORD = '';
const DEV_REDIS_DB = 1;

module.exports = {
  sequelize: devServerMysqlConfig,

  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: devServerMysqlConfig.host,
      // 端口号
      port: devServerMysqlConfig.port,
      // 用户名
      user: devServerMysqlConfig.username,
      // 密码
      password: devServerMysqlConfig.password,
      // 数据库名
      database: devServerMysqlConfig.database,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
  redis: {
    client: {
      port: DEV_REDIS_PORT, // Redis port
      host: DEV_REDIS_HOST, // Redis host
      password: DEV_REDIS_PASSWORD,
      db: DEV_REDIS_DB,
    },
  },


  security: {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  },

  // add your user config here

  // myAppName: 'egg',
  appId: 'wxa951e094896c9b56',
  appSecret: '259c84973e2ce4d217790fa1ad0d48d7',


};
