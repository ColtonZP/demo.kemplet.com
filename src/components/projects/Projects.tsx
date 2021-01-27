import React from 'react';

import { useProjectsState } from '../../State';
import { Project } from './Project';
import plus from '../../images/plus.svg';

export const Projects = () => {
  const { projects } = useProjectsState(state => ({
    projects: state.projects,
  }));

  const filteredProjects = projects.filter(project => project.due !== 0);
  const noDue = projects.filter(project => project.due === 0);

  return (
    <div className="projects">
      <h1 className="project-title">Projects</h1>

      {projects.length < 1 && (
        <div className="no-projects">
          <span>
            Add your first project by clicking the <img src={plus} alt="" /> at
            the top of the screen
          </span>
        </div>
      )}

      {filteredProjects.map(project => (
        <Project project={project} key={project.id} />
      ))}

      {noDue.map(project => (
        <Project project={project} key={project.id} />
      ))}
    </div>
  );
};
