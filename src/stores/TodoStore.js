import { observable, action, computed, decorate } from "mobx";

class TodoStore {
  tasks = [];

  addTask(task) {
    this.tasks = [...this.tasks, task];
  }

  get dueTasks() {
    return this.tasks.length;
  }
}

decorate(TodoStore, {
  tasks: observable,
  addTask: action,
  dueTasks: computed,
});

const store = new TodoStore();
export default store;
