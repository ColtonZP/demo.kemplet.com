import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import checkmark from '../../../../../images/checkmark.svg';

export const Todo = ({ task }) => {
  const [editing, toggleEditing] = useState(false);
  // const [options, toggleOptions] = useState(false);
  const [todoInput, updateTodoInput] = useState(todo.title);

  const handleSubmit = e => {
    e.preventDefault();
    toggleEditing(false);
    renameTodo(projectId, listId, todo.id, todoInput);
  };

  return (
    <TodoCheck>
      <input
        type="checkbox"
        readOnly
        checked={todo.completed}
        onClick={() => completeTodo(projectId, listId, todo.id)}
      />
      {editing ? (
        <TodoForm onSubmit={handleSubmit} onBlur={() => toggleEditing(false)}>
          <EditInput
            type="text"
            value={todoInput}
            autoFocus
            onChange={e => updateTodoInput(e.target.value)}
            // onBlur={() => toggleEditing(false)}
          />
          {/* editing buttons */}
        </TodoForm>
      ) : (
        <label onClick={() => toggleEditing(true)}>{todo.title}</label>
      )}
      {todo.due && (
        <TodoDue>
          {`${new Date(todo.due).getMonth() + 1}/${new Date(
            todo.due,
          ).getDate()}`}
        </TodoDue>
      )}
      <TodoOptions>
        <button onClick={() => removeTodo(projectId, listId, todo.id)}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
      </TodoOptions>
    </TodoCheck>
  );
};

Todo.propTypes = {
  todo: PropTypes.object,
  projectId: PropTypes.string,
  listId: PropTypes.string,
  AppState: PropTypes.object,
};

export default inject('AppState')(observer(Todo));
