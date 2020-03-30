'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const authCheck = app.middleware.authCheck(app.config.authCheck);
  const platformCheck = app.middleware.platformCheck(app.config.platformCheck);

  const { router, controller } = app;

  router.post('/auth/isRegister', platformCheck, controller.auth.isRegister);

  router.post('/auth/register', platformCheck, controller.auth.register);

  router.post('/auth/isLogin', platformCheck, controller.auth.isLogin);

  router.post('/auth/login', platformCheck, controller.auth.login);

  router.post('/my/info', authCheck, controller.user.my);

  router.post('/todos/all', authCheck, controller.todos.findAll);
  router.post('/todos/finished', authCheck, controller.todos.findFinished);
  router.post('/todos/unFinished', authCheck, controller.todos.findUnFinished);
  router.post('/todos/add', authCheck, controller.todos.add);
};
