import React from 'react';
import { inject, observer } from 'mobx-react';

const Today = inject('AppState')(
  observer(props => {
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const { projects } = props.AppState;

    const dueLate = projects.filter(project => {
      return (
        project.due !== '' &&
        new Date(project.due).toDateString() > new Date().toDateString() &&
        !project.completed
      );
    });

    const dueToday = projects.filter(project => {
      return (
        project.due !== '' &&
        new Date(project.due).toDateString() === new Date().toDateString() &&
        !project.completed
      );
    });

    const date = new Intl.DateTimeFormat('en-US', dateOptions).format(
      new Date()
    );
    return (
      <div className="today card">
        <h1>{`${date}`}</h1>
        {dueLate.length >= 1 && (
          <div className="dueLate">
            <span className="dueTitle">Late</span>
            <ul>
              {dueLate.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        )}
        {dueToday.length >= 1 && (
          <div className="dueToday">
            <span className="dueTitle">Due today</span>
            <ul>
              {dueToday.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  })
);

export default Today;
