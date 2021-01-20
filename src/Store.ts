import create from 'zustand';

type Store = {
  Projects: Project[];
};

export type Task = {
  title: string;
  completed: boolean;
  id: string;
};

export type Project = {
  title: string;
  due: Date;
  completed: boolean;
  id: string;
  tasks: Task[];
};

export const useStore = create<Store>(set => ({
  Projects: [],
}));
