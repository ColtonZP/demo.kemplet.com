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
    return (
      <div className="App">
        <Menu />
        <div className="content">
          <div className="tasks">
            <div className="taskContent">
              <div className="taskList">
                <Today />
                {TodoStore.sortedTasks.map(task => (
                  <div
                    key={task.id}
                    className="card boardBtn"
                    type="button"
                    onClick={() => {
                      TodoStore.changeOpenTask(task.id);
                    }}
                  >
                    <div>{task.title}</div>
                    {task.due !== '' && task.due < new Date().getTime() ? (
                      <span className="dueLate">Late</span>
                    ) : new Date(task.due).toDateString() ===
                      new Date().toDateString() ? (
                      <span className="dueToday">Today</span>
                    ) : (
                      task.due && (
                        <span>{`${new Date(task.due).getMonth()}/${new Date(
                          task.due
                        ).getDate()}`}</span>
                      )
                    )}
                  </div>
                ))}
                {/* {TodoStore.noDue.map(task => (
                  <div
                    key={task.id}
                    className="card boardBtn"
                    type="button"
                    onClick={() => {
                      TodoStore.changeOpenTask(task.id);
                    }}
                  >
                    <div>{task.title}</div>
                  </div>
                ))} */}
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
  TodoStore: PropTypes.object,
};

export default inject('TodoStore')(observer(App));
