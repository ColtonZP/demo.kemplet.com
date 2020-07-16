import { observable, action, decorate } from 'mobx';
import { quickId } from 'quickids';

class ApplicationState {
  projects = [
    {
      title: 'Welcome',
      due: new Date(new Date().setHours(23, 59, 0)).getTime(),
      id: 'welcome',
      todoLists: [
        {
          title: 'Add a project',
          id: 'welcome-list-1',
          completed: false,
          todos: [
            {
              title:
                'to add a project, click the add button at the top of the window.',
              completed: false,
              id: 1,
            },
            {
              title:
                'you can add a list to the project by using the input above.',
              completed: false,
              id: 2,
            },
          ],
        },
        {
          title: 'Sign up',
          id: 'welcome-list-2',
          completed: false,
          todos: [
            {
              title: 'sign up to get more features!',
              completed: false,
              id: 3,
            },
          ],
        },
      ],
    },
  ];

  todoLists = [];
  openProject = null;
  openProjectId = null;
  user = null;
  menu = false;

  changeOpenProject = project => {
    this.openProject = project;
    this.openProjectId = project.id;
  };

  addProject = project => {
    project.id = quickId();
    this.projects = [...this.projects, project];
    this.changeOpenProject(project);
  };

  editProject = (projectId, title, due) => {
    this.projects.forEach(task => {
      if (task.id === projectId) {
        task.title = title;
        task.due = due;
      }
    });
  };

  addList = (projectId, list) => {
    this.projects.forEach(task => {
      task.id === projectId &&
        task.todoLists.push({
          title: list,
          id: quickId(),
          completed: false,
          todos: [],
          collapsed: false,
        });
    });
  };

  collapseList = (projectId, listId) => {
    this.projects.forEach(task => {
      task.id === projectId &&
        task.todoLists.forEach(list => {
          if (list.id === listId) {
            list.collapsed = !list.collapsed;
          }
        });
    });
  };

  addListDescription = (projectId, listId, description) => {
    this.projects.forEach(task => {
      task.id === projectId &&
        task.todoLists.forEach(list => {
          if (list.id === listId) {
            list.description = description;
          }
        });
    });
  };

  removeList = (projectId, listId) => {
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists = list.todoLists.filter(list => list.id !== listId);
  };

  renameList = (projectId, listId, title) => {
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists.forEach(list => {
      if (list.id === listId) {
        list.title = title;
      }
    });
  };

  combineList = (projectId, listIdOne, listIdTwo) => {
    const list = this.projects.find(project => project.id === projectId);
    const listOne = list.todoLists.find(list => list.id === listIdOne);
    const listTwo = list.todoLists.find(list => list.id === listIdTwo);
    const combineItems = listOne.todos.concat(listTwo.todos);
    list.todoLists.forEach(list => {
      if (list.id === listIdOne) {
        list.todos = combineItems;
      }
    });
    const todoList = list.todoLists.filter(list => list.id !== listIdTwo);
    list.todoLists = todoList;
  };

  changeListDue = (projectId, listId, date) => {
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists.forEach(list => {
      if (list.id === listId) {
        list.due = date;
      }
    });
  };

  addTodo = (projectId, listId, todo) => {
    const id = quickId();
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists.find(
      list =>
        list.id === listId &&
        list.todos.push({ title: todo, completed: false, id: id })
    );
  };

  removeTodo = (projectId, listId, todoId) => {
    const list = this.projects.find(project => project.id === projectId);
    const todoList = list.todoLists.find(list => list.id === listId);
    const todos = todoList.todos.filter(todo => todo.id !== todoId);
    list.todoLists.forEach(list => {
      if (list.id === listId) {
        list.todos = todos;
      }
    });
  };

  renameTodo = (projectId, listId, todoId, title) => {
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists.forEach(list => {
      list.id === listId &&
        list.todos.forEach(todo => {
          if (todo.id === todoId) {
            todo.title = title;
          }
        });
    });
  };

  completeAllTodos = (projectId, listId, value) => {
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists.forEach(list => {
      list.id === listId &&
        list.todos.forEach(todo => {
          todo.completed = value;
        });
    });
  };

  completeTodo = (projectId, listId, todoId) => {
    const list = this.projects.find(project => project.id === projectId);
    list.todoLists.forEach(list => {
      list.id === listId &&
        list.todos.forEach(todo => {
          if (todo.id === todoId) {
            todo.completed = !todo.completed;
          }
        });
    });
  };

  removeProject = id => {
    if (id === this.openProjectId) {
      this.openProjectId = null;
    }
    const list = this.projects.filter(project => project.id !== id);
    this.projects = list;
  };
}

decorate(ApplicationState, {
  user: observable,
  getInfo: action,

  projects: observable,
  openProject: observable,
  openProjectId: observable,
  changeOpenProject: action,
  addProject: action,
  removeProject: action,

  addSimpleTodo: action,
  todoLists: observable,

  menu: observable,
  toggleMenu: action,

  addList: action,
  removeList: action,
  renameList: action,
  combineList: action,
  addListDescription: action,
  collapseList: action,

  addTodo: action,
  removeTodo: action,
  changeTodoDue: action,
  renameTodo: action,
  completeTodo: action,
  completeAllTodos: action,
});

export default new ApplicationState();
