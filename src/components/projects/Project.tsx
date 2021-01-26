import React from 'react';

import { useProjectsState, Project as ProjectType } from '../../State';
import trash from '../../images/trash.svg';

export const Project = ({ project }: { project: ProjectType }) => {
  const { updateOpenProject, removeProject } = useProjectsState(state => ({
    updateOpenProject: state.updateOpenProject,
    removeProject: state.removeProject,
  }));

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

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
        ) : new Date(project.due).toDateString() === today.toDateString() ? (
          <span className="badge green">Today</span>
        ) : new Date(project.due).toDateString() === tomorrow.toDateString() ? (
          <span className="badge green">Tomorrow</span>
        ) : (
          project.due !== 0 && (
            <span className="badge green">
              {`${new Date(project.due).getMonth() + 1}/${new Date(
                project.due,
              ).getDate()}`}
            </span>
          )
        )}
      </button>
      <button
        className="options card"
        onClick={() => removeProject(project.id)}
      >
        <img src={trash} alt="trash" />
      </button>
    </div>
  );
};
