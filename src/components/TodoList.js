import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import Todo from './Todo';

const TodoList = inject('TodoStore')(
  observer(props => {
    const [todo, changeTodo] = useState('');
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     todo: {
    //       todo: '',
    //       completed: false,
    //     },
    //   };
    // }

    // updateInput = e => {
    //   this.setState({
    //     todo: { ...this.state.todo, todo: e.target.value },
    //   });
    // };

    // handleSubmit = e => {
    //   e.preventDefault();
    //   const { todo } = this.state;
    //   const { list } = this.props;
    //   list.todos.push(todo);
    //   this.setState({
    //     todo: { todo: '', completed: false },
    //   });
    // };
    const { list } = props;
    // const { todo } = this.state;
    // const tasks = list.todos.length;
    // const completeTask = list.todos.filter(todo => todo.completed == true).length;

    const handleSubmit = e => {
      e.preventDefault();
      if (todo.length > 0) {
        props.addTodo(props.taskId, props.listId, todo);
        changeTodo('');
      }
    };

    // onClick={() => props.addTodo(props.taskId, props.listId, 'idk')}
    return (
      <div className="todoList">
        <h2>{list.title}</h2>
        <ul>
          {list.todos.map(todo => (
            <Todo todo={todo} key={todo.todo} />
          ))}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="addTodo"
              className="addTodo"
              autoComplete="off"
              placeholder="Add item"
              value={todo}
              onChange={e => changeTodo(e.target.value)}
            />
            <input
              className="submitTodo"
              type="submit"
              value="+"
              // onClick={this.handleSubmit}
            />
          </form>
        </ul>
      </div>
    );
  })
);

export default TodoList;
