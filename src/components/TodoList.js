import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import Todo from './Todo';
import chev from '../images/chev.svg';

const TodoList = inject('TodoStore')(
  observer(props => {
    const [todo, changeTodo] = useState('');
    const [collapsed, toggleCollapse] = useState(false);
    const { TodoStore, list, taskId, listId } = props;

    const handleSubmit = e => {
      e.preventDefault();
      if (todo.length > 0) {
        TodoStore.addTodo(taskId, listId, todo);
        changeTodo('');
      }
    };

    return (
      <div className="todoList">
        <h2>{list.title}</h2>
        <button
          className={collapsed ? 'collapseButton flipped' : 'collapseButton'}
          type="button"
          value="Show"
          onClick={() => toggleCollapse(!collapsed)}
        >
          <img src={chev} alt="" />
        </button>
        <ul className={collapsed && 'collapsed'}>
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
            <input className="submitTodo" type="submit" value="+" />
          </form>
        </ul>
      </div>
    );
  })
);

export default TodoList;
