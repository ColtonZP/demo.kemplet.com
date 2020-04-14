import React, { Component } from "react";
import PropTypes from "prop-types";
import { quickId } from "quickids";

import Menu from "./Menu";
import Today from "./Today";
import TaskDetail from "./TaskDetail";
import Calendar from "./Calendar";

import options from "../options.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      dueToday: [],
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
    });
  };

  render() {
    const { tasks } = this.state;
    const { viewTaskId } = this.state;

    function getTask() {
      if (tasks.length >= 1) {
        return <TaskDetail task={tasks[0]} />;
      }
      return null;
    }

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
                    key={task}
                    className="Card"
                    type="button"
                    onClick={() => {
                      this.changeTaskId(task.id);
                    }}
                  >
                    {task.title}
                    <button className="Options" type="button">
                      <img src={options} alt="options button" />
                    </button>
                  </button>
                ))}
              </div>
              {getTask()}
            </div>
          </div>
          <Calendar />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.arrayOf.isRequired,
};

export default App;
