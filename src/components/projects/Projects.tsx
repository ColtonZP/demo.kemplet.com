import React from 'react';

import { useProjectsState } from '../../State';

export const Projects = () => {
  const { projects } = useProjectsState(state => ({
    projects: state.projects,
  }));

  const filteredProjects = projects.filter(project => project.due !== 0);
  const noDue = projects.filter(project => project.due === 0);

  return (
    <>
      <ul>
        {filteredProjects.map(project => (
          <li key={project.id}>
            <span className="title">{project.title}</span>
            <span className="due">{project.due}</span>
          </li>
        ))}
        {noDue.map(project => (
          <li key={project.id}>
            <span className="title">{project.title}</span>
            <span className="due">{project.due}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
