import React from 'react';

import { useProjectsState, Project } from '../State';

export const Projects = () => {
  const { Projects } = useProjectsState(state => ({
    Projects: state.Projects,
  }));

  return (
    <>
      <ul>
        {Projects.map((Project: Project) => (
          <li key={Project.id}>
            <span className="title">{Project.title}</span>
            <span className="due">{Project.due}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
