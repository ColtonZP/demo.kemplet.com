import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const Todo = inject('AppState')(
  observer(props => {
    const { completeTodo, renameTodo, removeTodo } = props.AppState;
    const { todo, projectId, listId } = props;
    const [editing, toggleEditing] = useState(false);
    const [todoInput, updateTodoInput] = useState(todo.title);

    const handleSubmit = e => {
      e.preventDefault();
      toggleEditing(false);
      renameTodo(projectId, listId, todo.id, todoInput);
    };

    return (
      <li className="todoCheck">
        <input
          type="checkbox"
          readOnly
          checked={todo.completed}
          onClick={() => completeTodo(projectId, listId, todo.id)}
        />
        {editing ? (
          <form
            className="todoForm"
            onSubmit={handleSubmit}
            onBlur={() => toggleEditing(false)}
          >
            <input
              type="text"
              className="editInput"
              value={todoInput}
              autoFocus
              onChange={e => updateTodoInput(e.target.value)}
            />
          </form>
        ) : (
          <label onClick={() => toggleEditing(true)}>{todo.title}</label>
        )}
        {todo.due && (
          <span className="todoDue">
            {`${new Date(todo.due).getMonth() + 1}/${new Date(
              todo.due
            ).getDate()}`}
          </span>
        )}
        <div className="todoOptions hidden">
          <button onClick={() => removeTodo(projectId, listId, todo.id)}>
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        </div>
      </li>
    );
  })
);

export default Todo;
