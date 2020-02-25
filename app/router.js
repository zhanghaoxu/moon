'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const authCheck = app.middleware.authCheck();
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/', controller.home.index);
  router.post('/auth/isRegister', controller.auth.isRegister);

  router.post('/auth/register', controller.auth.register);

  router.post('/auth/isLogin', controller.auth.isLogin);

  router.post('/auth/login', controller.auth.login);

  router.post('/my/info', authCheck, controller.user.my);
};
