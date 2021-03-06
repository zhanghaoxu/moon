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

  // add your user config here

  // myAppName: 'egg',

  // add your user config here
  const userConfig = {
    platformCheck: {
      key: 'moon-platform',
      platforms: [ 'miniprogram', 'app' ],
    },
    authCheck: {
      key: 'moon-session',
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
