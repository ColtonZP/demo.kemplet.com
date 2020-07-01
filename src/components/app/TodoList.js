import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import Todo from './Todo';
import ListOptions from './ListOptions';

const TodoList = inject('AppState')(
  observer(props => {
    const { list, projectId, listId } = props;
    const { addTodo, renameList, collapseList } = props.AppState;
    const [todo, changeTodo] = useState('');
    const [editing, toggleEditing] = useState(false);
    const [titleInput, updateTitleInput] = useState(list.title);
    const [todoLength] = useState(list.todos.length);
    const [completedLength] = useState(
      list.todos.filter(item => item.completed === true).length
    );
    const [options, toggleOptions] = useState(false);
    const todos = list.todos.slice().sort(compare);

    const handleNewList = e => {
      e.preventDefault();
      if (todo.length > 0) {
        addTodo(projectId, listId, todo);
        changeTodo('');
      }
    };

    const handleListEdit = e => {
      e.preventDefault();
      toggleEditing(false);
      renameList(projectId, listId, titleInput);
    };

    function compare(a, b) {
      if (a.completed < b.completed) {
        return -1;
      } else if (a.completed > b.completed) {
        return 1;
      } else return 0;
    }

    return (
      <div className="todoList">
        {editing ? (
          <form className="todoForm" onSubmit={handleListEdit}>
            <input
              type="text"
              className="editInput"
              value={titleInput}
              autoFocus
              onChange={e => updateTitleInput(e.target.value)}
              onBlur={() => toggleEditing(false)}
            />
          </form>
        ) : (
          <h2 onClick={() => toggleEditing(true)}>{list.title}</h2>
        )}
        {list.due && (
          <span className="listDue">
            {`${new Date(list.due).getMonth() + 1}/${new Date(
              list.due
            ).getDate()}`}
          </span>
        )}
        {list.description && <p>{list.description}</p>}

        <div className="progressDiv">
          <progress
            value={list.todos.filter(task => task.completed === true).length}
            max={list.todos.length}
          />
        </div>
        <div className="listOptions">
          {options && (
            <ListOptions
              list={list}
              listId={listId}
              projectId={projectId}
              toggleOptions={toggleOptions}
              currentDescription={list.description}
              completed={completedLength / todoLength}
            />
          )}
          <button
            className="options hidden"
            type="button"
            value="Show"
            onClick={() => toggleOptions(true)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
          <button
            className={
              list.collapsed ? 'collapseButton flipped' : 'collapseButton'
            }
            type="button"
            value="Show"
            onClick={() => collapseList(projectId, listId)}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <ul className={list.collapsed && 'collapsed'}>
          {todos.map(todo => (
            <Todo
              todo={todo}
              projectId={projectId}
              listId={listId}
              key={todo.title + Math.random()}
            />
          ))}
          <form onSubmit={handleNewList}>
            <input className="submitTodo" type="submit" value="+" />
            <input
              type="text"
              name="addTodo"
              className="addTodo"
              autoComplete="off"
              placeholder="Add todo"
              value={todo}
              onChange={e => changeTodo(e.target.value)}
            />
          </form>
        </ul>
      </div>
    );
  })
);

export default TodoList;
