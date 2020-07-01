import React from 'react';
import { inject, observer } from 'mobx-react';

import Project from './Project';

const Projects = inject('AppState')(
  observer(props => {
    const { projects, loading } = props.AppState;

    const filteredProjects = projects.filter(project => project.due !== '');
    const noDue = projects.filter(project => project.due === '');

    return loading ? (
      <div id="loadingContainer">
        <div className="loading boardBtn"></div>
        <div className="loading boardBtn"></div>
        <div className="loading boardBtn"></div>
      </div>
    ) : (
      <div>
        {filteredProjects.map(project => (
          <Project project={project} key={project.id} />
        ))}
        {noDue.map(project => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    );
  })
);

export default Projects;
