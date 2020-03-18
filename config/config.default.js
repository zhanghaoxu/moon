/* eslint valid-jsdoc: "off" */

'use strict';

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
    host: '207.246.127.110',
    port: '3306',
    user: 'user',
    password: 'xuxuxu123',
    database: 'moon',
  };

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  // add your user config here

  // myAppName: 'egg',

  // add your user config here
  const userConfig = {
    appId: 'wxa951e094896c9b56',
    appSecret: '259c84973e2ce4d217790fa1ad0d48d7',
  };


  return {
    ...config,
    ...userConfig,
  };
};
