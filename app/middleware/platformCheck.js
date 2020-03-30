'use strict';
/**
 * @param  {Object} options 选项 用于实例化传递参数
 * 平台参数校验中间件
 * 检查请求头里的'moon-platform'
 * miniprogram  app
 */


module.exports = options => {

  return async function platformCheck(ctx, next) {

    // if (!ctx.request.header[options.key]) ctx.request.header[options.key] = 'miniprogram';
    const platform = ctx.request.header[options.key];

    if (platform && options.platforms.indexOf(platform) === -1) {
      const { getErrorResponseInfo, PLATFORM_ERROR_CODE } = ctx.response.errorResponseInfo;
      ctx.body = getErrorResponseInfo(PLATFORM_ERROR_CODE);
      ctx.logger.error(`用户平台:${platform}   不在预期范围`);
      return;
    }

    await next();

  };
};
