import create from 'zustand';
import { quickId } from './functions/quickId';

type Store = {
  projects: Project[];
  openProject: undefined | string;
  createProject: (title: string, due: number) => void;
  updateOpenProject: (id: string) => void;
};

export type Task = {
  title: string;
  completed: boolean;
  id: string;
};

export type Project = {
  title: string;
  due: number;
  completed: boolean;
  id: string;
  tasks: Task[];
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
          tasks: [],
        },
      ],
    })),

  updateOpenProject: id =>
    set(state => ({
      openProject: id,
    })),
}));
