/* eslint valid-jsdoc: "off" */

'use strict';
// mysql setting
const LOCAL_MYSQL_HOST = '127.0.0.1';
const LOCAL_MYSQL_PORT = 3306;
const LOCAL_MYSQL_USER = 'root';
const LOCAL_MYSQL_PASSWORD = 'Xuxuxu321';
const LOCAL_MYSQL_DATABASE = 'moon';
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

  sequelize: {
    dialect: 'mysql',
    host: LOCAL_MYSQL_HOST,
    port: LOCAL_MYSQL_PORT,
    database: LOCAL_MYSQL_DATABASE,
    // 用户名
    username: LOCAL_MYSQL_USER,
    // 密码
    password: LOCAL_MYSQL_PASSWORD,
  },
  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: LOCAL_MYSQL_HOST,
      // 端口号
      port: LOCAL_MYSQL_PORT,
      // 用户名
      user: LOCAL_MYSQL_USER,
      // 密码
      password: LOCAL_MYSQL_PASSWORD,
      // 数据库名
      database: LOCAL_MYSQL_DATABASE,
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
