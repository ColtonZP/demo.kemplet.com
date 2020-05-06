import React, { Component } from 'react';
import { quickId } from 'quickids';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Today from './Today';
import TaskDetail from './TaskDetail';

const App = inject('TodoStore')(
  observer(props => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { TodoStore } = props;
    const tasks = TodoStore.tasks;
    // TodoStore.changeOpenTask("welcome");
    return (
      <div className="App">
        <Menu />
        <div className="content">
          <div className="tasks">
            <div className="taskContent">
              <div className="taskList">
                <Today />
                {/* {TodoStore.tasks.map((todo) => (
                  <div className="card">{todo}</div>
                ))} */}
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="card boardBtn"
                    type="button"
                    onClick={() => {
                      TodoStore.changeOpenTask(task.id);
                    }}
                  >
                    <div>{task.title}</div>
                    {new Date(task.due).toDateString() ===
                    today.toDateString() ? (
                      <span className="dueToday">today</span>
                    ) : (
                      <span>{task.due.slice(0, -5)}</span>
                    )}
                  </div>
                ))}
              </div>
              {TodoStore.openTask.id && <TaskDetail />}
            </div>
          </div>
          {/* <Calendar /> */}
        </div>
      </div>
    );
  })
);

App.propTypes = {
  TodoStore: PropTypes.func,
};

export default App;
