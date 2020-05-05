import { observable, action, computed, decorate } from "mobx";
import { quickId } from "quickids";
import { dateToday } from "../functions/kemplet-date";

class TodoStore {
  tasks = [
    {
      title: "Welcome MobX",
      due: dateToday(0),
      id: "welcome",
      complete: false,
      todoLists: [
        {
          title: "Add a board",
          id: "welcome-list-1",
          completed: false,
          todos: [
            {
              todo:
                "to add a task board, click the add button at the top of the window.",
              completed: false,
            },
          ],
        },
        {
          title: "Add a todo list",
          id: "welcome-list-2",
          completed: false,
          todos: [
            {
              todo:
                "add a list to the board by pressing the add button at the top of the board.",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      title: "Welcome MobX 2",
      due: dateToday(0),
      id: "welcome2",
      complete: false,
      todoLists: [
        {
          title: "Add a board",
          id: "welcome-list-1",
          completed: false,
          todos: [],
        },
        {
          title: "Add a todo list",
          id: "welcome-list-2",
          completed: false,
          todos: [
            {
              todo:
                "add a list to the board by pressing the add button at the top of the board.",
              completed: false,
            },
          ],
        },
      ],
    },
  ];

  openTask = observable({});

  addTask = (task) => {
    const newTask = {
      title: task,
      id: quickId,
      completed: false,
    };
    this.tasks = [...this.tasks, task];
    this.changeOpenTask(newTask.id);
  };

  removeTask = (id) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.openTask = {};
  };

  changeOpenTask = (id) => {
    this.openTask = this.tasks.find((task) => {
      return task.id === id;
    });
  };

  get dueTasks() {
    const dueToday = this.tasks.filter((task) => {
      return task.due === dateToday(0);
    });
    return dueToday;
  }
}

decorate(TodoStore, {
  tasks: observable,
  openTask: observable,
  addTask: action,
  removeTask: action,
  changeOpenTask: action,
  dueTasks: computed,
});

const store = new TodoStore();
export default store;
