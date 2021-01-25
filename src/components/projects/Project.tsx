import React from 'react';

import { useProjectsState, Project as ProjectType } from '../../State';
import trash from '../../images/trash.svg';

export const Project = ({ project }: { project: ProjectType }) => {
  const { updateOpenProject } = useProjectsState(state => ({
    updateOpenProject: state.updateOpenProject,
  }));

  return (
    <div className="project">
      <button
        className="projectButton card"
        onClick={() => {
          updateOpenProject(project.id);
        }}
      >
        {/* <progress value={progress.completed} max={progress.total} /> */}
        <span className="title">{project.title}</span>
        {project.due !== 0 && project.due < new Date().getTime() ? (
          <span className="badge late">Late</span>
        ) : new Date(project.due).toDateString() ===
          new Date().toDateString() ? (
          <span className="badge today">Today</span>
        ) : (
          project.due !== 0 && (
            <span className="badge">
              {`${new Date(project.due).getMonth() + 1}/${new Date(
                project.due,
              ).getDate()}`}
            </span>
          )
        )}
      </button>
      {/* <button className="options" onClick={() => removeProject(project.id)}>
        <img src={trash} alt="trash" />
      </button> */}
    </div>
  );
};
