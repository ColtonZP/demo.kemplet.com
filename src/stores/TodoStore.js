import { observable, action, computed, decorate } from 'mobx';
import { quickId } from 'quickids';
import { dateToday } from '../functions/kemplet-date';

class TodoStore {
  tasks = [
    {
      title: 'Welcome',
      due: dateToday(0),
      id: 'welcome',
      complete: false,
      todoLists: [
        {
          title: 'Add a board',
          id: 'welcome-list-1',
          completed: false,
          todos: [
            {
              todo:
                'to add a task board, click the add button at the top of the window.',
              completed: false,
            },
          ],
        },
        {
          title: 'Add a todo list',
          id: 'welcome-list-2',
          completed: false,
          todos: [
            {
              todo:
                'add a list to the board by pressing the add button at the top of the board.',
              completed: false,
            },
          ],
        },
      ],
    },
  ];

  openTask = observable({});

  addTask = task => {
    task.id = quickId();
    this.tasks = [...this.tasks, task];
    this.changeOpenTask(task.id);
  };

  removeTask = id => {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.openTask = {};
  };

  addList = (taskId, list) => {
    this.tasks.forEach(task => {
      task.id === taskId &&
        task.todoLists.push({
          title: list,
          id: quickId(),
          completed: false,
          todos: [],
        });
    });
  };

  addTodo = (taskId, listId, todo) => {
    this.tasks.forEach(task => {
      task.id === taskId &&
        task.todoLists.forEach(list => {
          list.id === listId &&
            list.todos.push({ todo: todo, completed: false });
        });
    });
  };

  changeOpenTask = id => {
    this.openTask = this.tasks.find(task => {
      return task.id === id;
    });
  };

  get dueTasks() {
    const dueToday = this.tasks.filter(task => {
      return task.due === dateToday(0);
    });
    return dueToday;
  }

  get lateTasks() {
    const late = this.tasks.filter(task => {
      return new Date(task.due).toDateString() < new Date().toDateString();
    });
    return late;
  }
}

decorate(TodoStore, {
  tasks: observable,
  openTask: observable,
  addTask: action,
  removeTask: action,
  addList: action,
  addTodo: action,
  changeOpenTask: action,
  dueTasks: computed,
  lateTasks: computed,
});

const store = new TodoStore();
export default store;
