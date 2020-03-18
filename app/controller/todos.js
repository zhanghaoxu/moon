'use strict';

const Controller = require('egg').Controller;
class TodosController extends Controller {
  async findAll() {
    const { ctx } = this;

    const userId = ctx.sessionValue.user.userId;
    const todosAll = await ctx.service.todos.findAll(userId);

    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: todosAll,
    };
  }

  async findUnFinished() {
    const { ctx } = this;
    const userId = ctx.sessionValue.user.userId;
    const todos = await ctx.service.todos.findUserTodosUnfinished(userId);
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: todos,
    };
  }

  async findFinished() {
    const { ctx } = this;
    const userId = ctx.sessionValue.user.userId;
    const todos = await ctx.service.todos.findUserTodosFinished(userId);
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: todos,
    };
  }

  async finishTodo() {
    const { ctx } = this;
    const userId = ctx.sessionValue.user.userId;
    const todoId = ctx.request.body.todoId;

    if (!todoId) {
      const { getErrorResponseInfo, PARAM_INVALID_FAIL_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(PARAM_INVALID_FAIL_CODE);
      return;
    }

    const todos = await ctx.service.todos.finishTodo({
      id: todoId,
      userId,
    });

    if (todos) {
      ctx.body = {
        code: 200,
        msg: '待办事项状态已更新',
        data: todos,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: '待办事项状态更新失败',
        data: null,
      };
    }

  }

  async add() {
    const { ctx } = this;
    const { name } = this.ctx.request.body;
    if (typeof name !== 'string' || name === '') {
      const { getErrorResponseInfo, PARAM_INVALID_FAIL_CODE } = this.ctx.response.errorResponseInfo;
      this.ctx.body = getErrorResponseInfo(PARAM_INVALID_FAIL_CODE);
      return;
    }
    const userId = ctx.sessionValue.user.userId;
    const result = await ctx.service.todos.create({ name, userId });

    ctx.body = {
      code: 200,
      msg: '添加成功',
      data: result,
    };

  }
}
module.exports = TodosController;
