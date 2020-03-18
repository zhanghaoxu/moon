'use strict';
module.exports = options => {
  return async function authCheck(ctx, next) {
    // 后续中间件执行完成后将响应体转换成 gzip

    const sessionHashKey = ctx.request.header['moon-session'];

    const sessionValue = sessionHashKey && await ctx.service.auth.getSession(sessionHashKey);
    if (!sessionValue) {
      ctx.body = {
        code: -2,
        msg: '用户未登录',
        data: null,
      };
      ctx.logger.error(new Error('用户未登录'));
      return;
    }
    ctx.sessionValue = sessionValue;
    await next();

  };
};
