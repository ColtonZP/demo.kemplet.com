import React, { Component } from "react";
import { quickId } from "quickids";
import { Provider } from "mobx-react";
import { dateToday } from "../functions/kemplet-date";

import TodoStore from "../stores/TodoStore";
import Menu from "./Menu";
import Today from "./Today";
import TaskDetail from "./TaskDetail";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          title: "Welcome",
          due: dateToday(0),
          id: "welcome",
          complete: false,
          todoLists: [
            {
              title: "Add a board",
              id: "welcome-List-1",
              completed: false,
              todos: [
                {
                  todo:
                    "to add a task board, click the add button at the top of the window.",
                  completed: false,
                },
              ],
            },
            {
              title: "Add a todo list",
              id: "welcome-List-2",
              completed: false,
              todos: [
                {
                  todo:
                    "add a list to the board by pressing the add button at the top of the board.",
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
      dueToday: [],
      openTask: {},
    };
  }

  changeTaskId = (id) => {
    this.setState({ viewTaskId: id });
  };

  addTask = (task) => {
    const { tasks } = this.state;
    task.id = quickId();
    this.setState({
      tasks: [...tasks, task],
      openTask: task,
    });
  };

  openTask = (task) => {
    this.setState({
      openTask: task,
    });
  };

  removeTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== id),
      openTask: {},
    });
  };

  componentDidMount() {
    this.state.tasks[0] && this.openTask(this.state.tasks[0]);
  }

  render() {
    const { tasks, openTask } = this.state;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      <Provider TodoStore={TodoStore}>
        <div className="App">
          <Menu addTask={this.addTask} />
          <div className="content">
            <div className="tasks">
              <div className="taskContent">
                <div className="taskList">
                  <Today tasks={tasks} />
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="card boardBtn"
                      type="button"
                      onClick={() => {
                        this.openTask(task);
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
                {openTask.title && (
                  <TaskDetail task={openTask} removeTask={this.removeTask} />
                )}
              </div>
            </div>
            {/* <Calendar /> */}
          </div>
        </div>
      </Provider>
    );
  }
}
