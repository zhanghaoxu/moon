/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// mysql setting
const LOCAL_MYSQL_HOST = '207.246.127.110';
const LOCAL_MYSQL_PORT = 3306;
const LOCAL_MYSQL_USER = 'user';
const LOCAL_MYSQL_PASSWORD = 'xuxuxu123';
const LOCAL_MYSQL_DATABASE = 'moon';
// redis setting
// host: '10.177.0.81', // Redis host
// password: 'ujbT3k3M4bW8LMTa',
const LOCAL_REDIS_PORT = 6379;
const LOCAL_REDIS_HOST = '207.246.127.110';
const LOCAL_REDIS_PASSWORD = 'xuxuxu123';
const LOCAL_REDIS_DB = 1;
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
    host: '127.0.0.1',
    port: 3306,
    database: 'moon-local',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
