import create from 'zustand';

type Store = {
  Projects: Project[];
  createProject: (title: string, due: number) => void;
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
  Projects: [],
  createProject: (title, due) =>
    set(state => ({
      Projects: [
        ...state.Projects,
        {
          title,
          due,
          completed: false,
          id: '1',
          tasks: [],
        },
      ],
    })),
}));
