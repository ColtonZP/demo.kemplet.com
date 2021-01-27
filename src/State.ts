import create from 'zustand';
import { quickId } from './functions/quickId';

type Store = {
  projects: Project[];
  openProject: undefined | string;
  createProject: (title: string, due: number) => void;
  updateOpenProject: (id: string) => void;
  removeProject: (id: string) => void;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  due: string;
};

type Task = {
  id: string;
  due: string;
  completed: boolean;
  todos: Todo[];
};

export type Project = {
  title: string;
  due: number;
  completed: boolean;
  id: string;
  taskLists: Task[];
};

export const useProjectsState = create<Store>(set => ({
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
    set(state => ({
      openProject: id,
    })),

  removeProject: id =>
    set(state => ({
      projects: state.projects.filter(project => project.id !== id),
    })),
}));
