import create from 'zustand';

type Store = {
  Projects: Project[];
  createProject: (title: string, due?: string) => void;
};

export type Task = {
  title: string;
  completed: boolean;
  id: string;
};

export type Project = {
  title: string;
  due: string;
  completed: boolean;
  id: string;
  tasks: Task[];
};

export const useStore = create<Store>(set => ({
  Projects: [],
  createProject: (title, due) =>
    set(state => ({
      Projects: [
        ...state.Projects,
        {
          title,
          due: due || '0',
          completed: false,
          id: '1',
          tasks: [],
        },
      ],
    })),
}));
