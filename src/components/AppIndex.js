import React, { Component } from "react";
import { quickId } from "quickids";

import { dateToday } from "../../functions/kemplet-date";

import Menu from "./Menu";
import Today from "./Today";
import TaskDetail from "./TaskDetail";
import Calendar from "./Calendar";

export default class AppIndex extends Component {
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
                    "add a list to the board by pressing the add button at the bottom of the board.",
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

  componentDidMount() {
    this.openTask(this.state.tasks[0]);
  }

  render() {
    const { tasks, openTask } = this.state;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      <div className="App">
        <Menu addTask={this.addTask} />
        <div className="content">
          <div className="tasks">
            <div className="taskContent">
              <div className="taskList">
                <Today tasks={tasks} />
                {tasks.map((task) => (
                  <button
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
                  </button>
                ))}
              </div>
              {openTask.title && <TaskDetail task={openTask} />}
            </div>
          </div>
          {/* <Calendar /> */}
        </div>
      </div>
    );
  }
}
