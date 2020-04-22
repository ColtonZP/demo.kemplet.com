import React, { Component } from "react";
import { quickId } from "quickids";

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
          due: "4/21/2020",
          id: "welcome",
          todoLists: [
            {
              title: "Add a board",
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
            <Today />
            <div className="taskContent">
              <div className="taskList">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    className="card"
                    type="button"
                    onClick={() => {
                      this.openTask(task);
                    }}
                  >
                    {task.title}
                    <span>
                      {new Date(task.due).toDateString() ==
                        today.toDateString() && " due today"}
                    </span>
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
