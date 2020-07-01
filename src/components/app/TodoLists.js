import React from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

// import Project from './Project';

const TodoLists = inject('AppState')(
  observer(props => {
    const { todoLists, changeOpenProject } = props.AppState;

    const filteredTodoLists = todoLists.filter(todoList => todoList.due !== '');
    const noDue = todoLists.filter(todoList => todoList.due === '');

    console.log(todoLists);

    return (
      <div>
        {filteredTodoLists.map(project => (
          <div key={project.id} className="boardBtn" type="button">
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
            <button
              className="optionsBtn"
              onClick={() => console.log('options')}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
        ))}
        {noDue.map(project => (
          <div key={project.id} className="boardBtn" type="button">
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
            <button
              className="optionsBtn"
              onClick={() => console.log('options')}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
        ))}
      </div>
    );
  })
);

export default TodoLists;
