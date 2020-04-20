import React, { Component } from "react";
import { quickId } from "quickids";

import Menu from "./Menu";
import Today from "./Today";
import TaskDetail from "./TaskDetail";
// import Calendar from "./Calendar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          title: "Welcome!",
          due: "01/01/2021",
          id: "welcome",
          todoList: [
            {
              title:
                "to add a task board, click the add button at the top of the window",
              completed: false,
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

    return (
      <div className="App">
        <Menu addTask={this.addTask} />
        <div className="Content">
          <div className="Tasks">
            <Today />
            <div className="TaskContent">
              <div className="TaskList">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    className="Card"
                    type="button"
                    onClick={() => {
                      this.openTask(task);
                    }}
                  >
                    {task.title}
                  </button>
                ))}
              </div>
              {openTask.title && <TaskDetail task={openTask} />}
            </div>
          </div>
          {/* <Calendar /> 👀 */}
        </div>
      </div>
    );
  }
}

export default App;
