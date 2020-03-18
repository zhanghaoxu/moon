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
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572170966833_711';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: LOCAL_MYSQL_HOST,
    port: LOCAL_MYSQL_PORT,
    database: LOCAL_MYSQL_DATABASE,
  };
  config.mysql = {
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
  };
  config.redis = {
    client: {
      port: LOCAL_REDIS_PORT, // Redis port
      host: LOCAL_REDIS_HOST, // Redis host
      password: LOCAL_REDIS_PASSWORD,
      db: LOCAL_REDIS_DB,
    },
  };

  config.sessionRedis = {
    enable: true,
    package: 'egg-session-redis',
  };

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    appId: 'wxa951e094896c9b56',
    appSecret: '259c84973e2ce4d217790fa1ad0d48d7',
  };

  return {
    ...config,
    ...userConfig,
  };
};
