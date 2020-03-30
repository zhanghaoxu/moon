'use strict';
/**
 * @param  {Object} options 选项 用于实例化传递参数
 * 用户登录校验中间件
 * 通过检查用户请求头信息中的 'moon-session' 键
 * 是否在session中有对应的值
 * 判断用户是否登录
 * 未登录用户进行拦截 返回-2错误码
 */
module.exports = options => {
  return async function authCheck(ctx, next) {

    const sessionHashKey = ctx.request.header[options.key];

    const sessionValue = sessionHashKey && await ctx.service.auth.getSession(sessionHashKey);

    if (!sessionValue) {
      const { getErrorResponseInfo, USER_NOT_LOGIN_CODE } = ctx.response.errorResponseInfo;
      ctx.body = getErrorResponseInfo(USER_NOT_LOGIN_CODE);
      ctx.logger.error('用户登录校验失败，用户未登录');
      return;
    }

    ctx.sessionValue = sessionValue;
    await next();

  };
};
