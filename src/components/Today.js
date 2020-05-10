import React from 'react';
import { inject, observer } from 'mobx-react';

const Today = inject('TodoStore')(
  observer(props => {
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const date = new Intl.DateTimeFormat('en-US', dateOptions).format(
      new Date()
    );

    const dueTasks = props.TodoStore.dueTasks;
    const lateTasks = props.TodoStore.lateTasks;

    return (
      <div className="today card">
        <h1>{`${date}`}</h1>
        {dueTasks.length >= 1 && (
          <div className="dueToday">
            <span className="dueTitle">Due today</span>
            <ul>
              {dueTasks.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        )}
        {lateTasks.length >= 1 && (
          <div className="dueLate">
            <span className="dueTitle">Late</span>
            <ul>
              {lateTasks.map(task => (
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
