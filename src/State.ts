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
  // createTodo: (title: string, projectId: string, taskId: string) => void;
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
  todos: Todo[];
};

export type Project = {
  title: string;
  due: number;
  completed: boolean;
  id: string;
  taskLists: Task[];
};

export const useProjectsState = create<Store>((set, get) => ({
  projects: [],
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
}));
