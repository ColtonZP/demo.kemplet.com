import React from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Project = inject('AppState')(
  observer(props => {
    const { project } = props;
    const { changeOpenProject, removeProject } = props.AppState;

    return (
      <div className="boardBtn" type="button">
        <button
          className="card projectBtn"
          onClick={() => {
            changeOpenProject(project);
          }}
        >
          <span className="title">{project.title}</span>
          {project.due !== '' && project.due < new Date().getTime() ? (
            <span className="dueLate">Late</span>
          ) : new Date(project.due).toDateString() ===
            new Date().toDateString() ? (
            <span className="dueToday">Today</span>
          ) : (
            project.due && (
              <span>{`${new Date(project.due).getMonth() + 1}/${new Date(
                project.due
              ).getDate()}`}</span>
            )
          )}
        </button>
        <div className="optionsBtn">
          <button className="option" onClick={() => removeProject(project.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    );
  })
);

export default Project;
