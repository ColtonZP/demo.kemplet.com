import React, { Component } from 'react';

import Todo from './Todo';

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    }
  }

  updateInput = (e) => {
    this.setState({
      todo: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { todo } = this.state;
    const { addTodo, task } = this.props;
    const id = task.id;
    addTodo(todo);
  }

  render() {
    const { task } = this.props;
    const {todo} = this.state;
    return (
      <div className="TaskDetailContainer Card">
        <div className="TaskDetails">
          <h1>{task.title}</h1>
          <span>Todos</span>
          <span>
            id:
            {task.id}
          </span>
          <div>
            <ul>
              {/* {task.todos.map((todo) => (
                <Todo item={todo} />
              ))} */}
              <form>
                <input
                  type="text"
                  name="addTodo"
                  className="addTodo"
                  autoComplete="off"
                  placeholder="Add item"
                  value={todo}
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

export default TaskDetail;
