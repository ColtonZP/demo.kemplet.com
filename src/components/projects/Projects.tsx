import React from 'react';

import { useProjectsState } from '../../State';
import { Project } from './Project';

export const Projects = () => {
  const { projects } = useProjectsState(state => ({
    projects: state.projects,
  }));

  const filteredProjects = projects.filter(project => project.due !== 0);
  const noDue = projects.filter(project => project.due === 0);

  return (
    <>
      {filteredProjects.map(project => (
        <Project project={project} key={project.id} />
      ))}

      {noDue.map(project => (
        <Project project={project} key={project.id} />
      ))}
    </>
  );
};
