import React, { useState } from 'react';
import { Todo as TodoType } from '../../../State';

type Props = {
  todo: TodoType;
  projectId: string;
  listId: string;
};

export const Todo = ({ todo, projectId, listId }: Props) => {
  const [editing, toggleEditing] = useState(false);
  // const [options, toggleOptions] = useState(false);
  const [todoInput, updateTodoInput] = useState(todo.title);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    toggleEditing(false);
    // renameTodo(projectId, listId, todo.id, todoInput);
  };

  return (
    <li className="todo">
      <input
        type="checkbox"
        readOnly
        checked={todo.completed}
        // onClick={() => completeTodo(projectId, listId, todo.id)}
      />
      {editing ? (
        <form
          className="todo-form"
          onSubmit={handleSubmit}
          onBlur={() => toggleEditing(false)}
        >
          <input
            className="edit-input"
            type="text"
            value={todoInput}
            autoFocus
            onChange={e => updateTodoInput(e.target.value)}
            // onBlur={() => toggleEditing(false)}
          />
          {/* editing buttons */}
        </form>
      ) : (
        <label onClick={() => toggleEditing(true)}>{todo.title}</label>
      )}
      {todo.due && (
        <span className="todo-due">
          {`${new Date(todo.due).getMonth() + 1}/${new Date(
            todo.due,
          ).getDate()}`}
        </span>
      )}
      <div className="todo-options">
        {/* <button onClick={() => removeTodo(projectId, listId, todo.id)}>
          {/* <FontAwesomeIcon icon={faMinusCircle} />}
        </button> */}
      </div>
    </li>
  );
};
