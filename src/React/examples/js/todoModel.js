var app = app || {};
(function () {
  var Utils = app.Utils;
  app.TodoModel = function (key) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChange = [];
  };
  app.TodoModel.prototype.subscribe = function (onChange) {
    this.onChange.push(onChange);
  };
  app.TodoModel.prototype.inform = function () {
    Utils.store(this.key, this.todos);
    this.onChange.forEach(function (cb) {
      cb();
    });
  };
  app.TodoModel.prototype.addTodo = function (title) {
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      complete: false,
    });
    this.inform();
  };
  app.TodoModel.prototype.toggleAll = function (checked) {
    this.todos = this.todos.map(function (todo) {
      return Utils.extend({}, todo, {
        complete: checked,
      });
    });
    this.inform();
  };
  app.TodoModel.prototype.toggle = function (todoToToggle) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToToggle
        ? todo
        : Utils.extend({}, todo, {
            complete: !todo.completed,
          });
    });
    this.inform();
  };
  app.TodoModel.prototype.destroy = function (todo) {
    this.todos = this.todos.filter(function (candidate) {
      return candidate !== todo;
    });
    this.inform();
  };
  app.TodoModel.prototype.save = function (todoToSave, text) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToSave
        ? todo
        : Utils.extend({}, todo, { title: text });
    });

    this.inform();
  };
  app.TodoModel.prototype.clearCompleted = function () {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });
    this.inform();
  };
})();
