import React, { Component } from 'react';

import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        todo: '',
        completed: false,
      },
    };
  }

  updateInput = e => {
    this.setState({
      todo: { ...this.state.todo, todo: e.target.value },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { todo } = this.state;
    const { list } = this.props;
    list.todos.push(todo);
    this.setState({
      todo: { todo: '', completed: false },
    });
  };

  render() {
    const { list } = this.props;
    const { todo } = this.state;
    // const tasks = list.todos.length;
    // const completeTask = list.todos.filter(todo => todo.completed == true).length;
    return (
      <div className="todoList">
        <h2>{list.title}</h2>
        <ul>
          {list.todos.map(todo => (
            <Todo todo={todo} key={todo.todo} />
          ))}
          <form>
            <input
              type="text"
              name="addTodo"
              className="addTodo"
              autoComplete="off"
              placeholder="Add item"
              value={todo.todo}
              onChange={this.updateInput}
            />
            <input
              className="submitTodo"
              type="submit"
              value="+"
              onClick={this.handleSubmit}
            />
          </form>
        </ul>
      </div>
    );
  }
}

export default TodoList;
