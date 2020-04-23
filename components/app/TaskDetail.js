import React, { Component } from "react";
import PropTypes from "prop-types";

import TodoList from "./TodoList";

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  updateInput = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let adding = {
      title: this.state.title,
      todos: [],
    };
    this.props.task.todoLists.push(adding);
    this.setState({
      title: "",
    });
  };

  render() {
    const { task } = this.props;
    return (
      <div className="taskDetailContainer card">
        <div className="taskDetails">
          <h1>{task.title}</h1>
          <span>{`Due: ${task.due.slice(0, -5)}`}</span>
          <div className="todoLists">
            {task.todoLists.map((list) => (
              <TodoList list={list} key={list.title} />
            ))}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.title}
            onChange={this.updateInput}
          />
          <input type="submit" value="add list" />
        </form>
      </div>
    );
  }
}

TaskDetail.propTypes = {
  task: PropTypes.object,
};

export default TaskDetail;
