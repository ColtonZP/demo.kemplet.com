import create from 'zustand';
import { quickId } from './functions/quickId';

type Store = {
  projects: Project[];
  openProject: undefined | string;
  createProject: (title: string, due: number) => void;
  updateOpenProject: (id: string) => void;
  removeProject: (id: string) => void;
  createTaskList: (title: string, projectId: string) => void;
  removeTaskList: (taskId: string, projectId: string) => void;
  createTodo: (title: string, projectId: string, taskId: string) => void;
};

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  due: string;
};

export type Task = {
  title: string;
  id: string;
  due: string;
  completed: boolean;
  description?: string;
  collapsed?: boolean;
  todos: Todo[];
};

export type Project = {
  title: string;
  due: number;
  completed: boolean;
  id: string;
  taskLists: Task[];
};

const defaultProjects: Project = {
  title: 'Welcome',
  due: new Date(new Date().setHours(23, 59, 0)).getTime(),
  id: 'welcome',
  completed: false,
  taskLists: [
    {
      title: 'Add a project',
      id: 'welcome-list-1',
      completed: false,
      due: '0',
      todos: [
        {
          title:
            'to add a project, click the add button at the top of the window.',
          completed: false,
          id: '1',
          due: '0',
        },
        {
          title: 'you can add a list to the project by using the input above.',
          completed: false,
          id: '2',
          due: '0',
        },
        {
          title: 'mark something complete',
          completed: true,
          id: '3',
          due: '0',
        },
      ],
    },
    {
      title: 'Sign up',
      id: 'welcome-list-2',
      completed: false,
      due: '0',
      todos: [
        {
          title: 'sign up to get more features!',
          completed: false,
          id: '3',
          due: '0',
        },
      ],
    },
  ],
};

export const useProjectsState = create<Store>((set, get) => ({
  projects: [defaultProjects],
  openProject: undefined,

  createProject: (title, due) =>
    set(state => ({
      projects: [
        ...state.projects,
        {
          title,
          due,
          completed: false,
          id: quickId(),
          taskLists: [],
        },
      ],
    })),

  updateOpenProject: id =>
    set(() => ({
      openProject: id,
    })),

  removeProject: id =>
    set(state => ({
      projects: state.projects.filter(project => project.id !== id),
    })),

  createTaskList: (title, projectId) => {
    const { projects } = get();
    const newProjects = projects;

    newProjects.find(
      project =>
        project.id === projectId &&
        project.taskLists.push({
          title,
          id: quickId(),
          due: '0',
          completed: false,
          collapsed: false,
          todos: [],
        }),
    );

    set(() => ({
      projects: newProjects,
    }));
  },

  removeTaskList: (listId, projectId) => {
    const { projects } = get();
    const newProjects = projects;

    newProjects.find(
      project =>
        project.id === projectId &&
        project.taskLists.filter(task => task.id !== listId),
    );

    set(() => ({
      projects: newProjects,
    }));
  },

  createTodo: (title, projectId, listId) => {
    const { projects } = get();
    const newProjects = projects;

    newProjects.find(
      project =>
        project.id === projectId &&
        project.taskLists.find(
          task =>
            task.id === listId &&
            task.todos.push({
              id: quickId(),
              title,
              completed: false,
              due: '0',
            }),
        ),
    );

    set(() => ({
      projects: newProjects,
    }));
  },
}));
