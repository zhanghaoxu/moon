'use strict';
// app/service/todos.js
const Service = require('egg').Service;
class TodosService extends Service {

  async create(todo) {
    let result = null;
    const userId = todo.userId;
    try {
      todo.state = 0;
      todo = await this.app.model.Todos.create(todo);

      if (todo) {
        result = todo;
        // 更新缓存
        const cacheResult = await this.app.redis.get(`moon:user:todos:${userId}`);
        if (cacheResult) {
          const cacheArray = JSON.parse(cacheResult);
          cacheArray.unshift(todo);
          this.app.redis.set(`moon:user:todos:${userId}`, JSON.stringify(cacheArray));
        } else {
          this.app.redis.set(`moon:user:todos:${userId}`, JSON.stringify([ todo ]));
        }

      }
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  /**
   * @return {Object} todoModel
   * @param {String}} userid
   */

  async findAll(userId) {
    // check redis
    try {
      const cacheResult = await this.app.redis.get(`moon:user:todos:${userId}`);
      if (cacheResult) {
        return JSON.parse(cacheResult);
      }

    } catch (e) {
      // todo log error
    }

    try {
      const todos = await this.app.model.Todos.findAll({
        where: { userId },
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });

      if (todos) {
        this.app.redis.set(`moon:user:todos:${userId}`, JSON.stringify(todos));
        return todos;
      }

      return [];
    } catch (e) {
      // todo log error
      console.log(e);
      return [];
    }


  }

  async findWithState(userId, state) {
    const todosAll = await this.findAll(userId);
    return todosAll.filter(v => {
      return v.state === state;
    });
  }

  async findUserTodosUnfinished(userId) {
    const todos = await this.findWithState(userId, 0);
    return todos;
  }

  async findUserTodosFinished(userId) {
    const todos = await this.findWithState(userId, 1);
    return todos;
  }

  async finishTodo(todo) {
    const result = await this.app.model.Users.update({ state: 1 }, {
      where: todo,
    });
    return result;
  }


  async destroy(todoId) {
    const result = await this.app.model.Todos.destroy({
      where: {
        id: todoId,
      },
      force: false,
    });
    return result;
  }

  async restore(user) {
    const result = await this.app.model.Users.restore({
      where: user,
    });
    return result;
  }

}

module.exports = TodosService;
