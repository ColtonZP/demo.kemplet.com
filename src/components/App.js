import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Today from './Today';
import TaskDetail from './TaskDetail';

class App extends Component {
  render() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { TodoStore } = this.props;
    const tasks = TodoStore.tasks;
    return (
      <div className="App">
        <Menu />
        <div className="content">
          <div className="tasks">
            <div className="taskContent">
              <div className="taskList">
                <Today />
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
  }
}

App.propTypes = {
  TodoStore: PropTypes.func,
};

export default inject('TodoStore')(observer(App));
