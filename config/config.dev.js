/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// mysql setting
const DEV_MYSQL_HOST = '207.246.127.110';
const DEV_MYSQL_PORT = '3306';
const DEV_MYSQL_USER = 'user';
const DEV_MYSQL_PASSWORD = 'xuxuxu123';
const DEV_MYSQL_DATABASE = 'moon';
// redis setting
// host: '10.177.0.81', // Redis host
// password: 'ujbT3k3M4bW8LMTa',
const DEV_REDIS_PORT = '6379';
const DEV_REDIS_HOST = '207.246.127.110';
const DEV_REDIS_PASSWORD = 'xuxuxu123';
const DEV_REDIS_DB = 1;
module.exports = {
  sequelize: {
    dialect: 'mysql',
    host: DEV_MYSQL_HOST,
    port: DEV_MYSQL_PORT,
    username: DEV_MYSQL_USER,
    password: DEV_MYSQL_PASSWORD,
    database: DEV_MYSQL_DATABASE,
  },

  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: DEV_MYSQL_HOST,
      // 端口号
      port: DEV_MYSQL_PORT,
      // 用户名
      user: DEV_MYSQL_USER,
      // 密码
      password: DEV_MYSQL_PASSWORD,
      // 数据库名
      database: DEV_MYSQL_DATABASE,
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
