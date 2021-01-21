import React from 'react';

import { useProjectsState } from '../../State';

export const Projects = () => {
  const { Projects } = useProjectsState(state => ({
    Projects: state.projects,
  }));

  const filteredProjects = Projects.filter(project => project.due !== 0);
  const noDue = Projects.filter(project => project.due === 0);

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
