import React, { Component } from "react";
import PropTypes from "prop-types";

import Todo from "./Todo";

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        title: "",
        completed: false,
      },
    };
  }

  updateInput = (e) => {
    this.setState({
      todo: { ...this.state.todo, title: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { todo } = this.state;
    const { task } = this.props;
    task.todoList.push(todo);
    this.setState({
      todo: { title: "", completed: false },
    });
  };

  render() {
    const { task } = this.props;
    const { todo } = this.state;
    return (
      <div className="TaskDetailContainer Card">
        <div className="TaskDetails">
          <h1>{task.title}</h1>
          <span style={{ display: "block" }}>{`due: ${task.due}`}</span>
          <span style={{ display: "block" }}>Todo:</span>
          <div>
            <ul>
              {task.todoList.map((todo) => (
                <Todo todo={todo} key={todo.title} />
              ))}
              <form>
                <input
                  type="text"
                  name="addTodo"
                  className="addTodo"
                  autoComplete="off"
                  placeholder="Add item"
                  value={todo.title}
                  onChange={this.updateInput}
                />
                <input type="submit" value="+" onClick={this.handleSubmit} />
              </form>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

TaskDetail.propTypes = {
  task: PropTypes.object,
};

export default TaskDetail;
