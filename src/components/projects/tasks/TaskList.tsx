import React, { useState, useEffect } from 'react';
import { Task, Todo } from '../../../State';

// import Todo from './Todo';
// import ListOptions from './ListOptions';

type Props = {
  list: Task;
  projectId: string;
  listId: string;
};

export const TaskList = ({ list, projectId, listId }: Props) => {
  const [todo, changeTodo] = useState('');
  const [editing, toggleEditing] = useState(false);
  const [titleInput, updateTitleInput] = useState(list.title);
  const [todoLength, changeTodoLength] = useState(list.todos.length);
  const [completedLength, changeCompletedLength] = useState(
    list.todos.filter((item: any) => item.completed === true).length,
  );
  // const [collapsed, toggleCollapse] = useState(
  //   completedLength / todoLength === 1
  // );
  const [options, toggleOptions] = useState(false);
  const todos = list.todos.slice().sort(compare);

  // if (completedLength / todoLength === 1) {
  //   collapseList(projectId, listId);
  // }

  useEffect(() => {
    changeTodoLength(list.todos.length);
    changeCompletedLength(
      list.todos.filter(item => item.completed === true).length,
    );
    // if (completedLength / todoLength === 1) {
    //   collapseList(projectId, listId);
    // }
  }, [list.todos]);

  const handleNewList = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo.length > 0) {
      // addTodo(projectId, listId, todo);
      changeTodo('');
    }
  };

  const handleListEdit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    toggleEditing(false);
    // renameList(projectId, listId, titleInput);
  };

  function compare(a: Todo, b: Todo) {
    if (a.completed < b.completed) {
      return -1;
    } else if (a.completed > b.completed) {
      return 1;
    } else return 0;
  }

  return (
    <div className="task-container card">
      {editing ? (
        <form className="task-form" onSubmit={handleListEdit}>
          <input
            className="task-input"
            type="text"
            value={titleInput}
            autoFocus
            onChange={e => updateTitleInput(e.target.value)}
            onBlur={() => toggleEditing(false)}
          />
        </form>
      ) : (
        <h2 onClick={() => toggleEditing(true)}>{list.title}</h2>
      )}
      {list.due !== '0' && (
        <span className="list-due">
          {`${new Date(list.due).getMonth() + 1}/${new Date(
            list.due,
          ).getDate()}`}
        </span>
      )}

      <div className="progress-container">
        <progress value={completedLength} max={todoLength} />
      </div>

      <div className="list-options-container">
        {/* {options && (
          <ListOptions
            list={list}
            listId={listId}
            projectId={projectId}
            toggleOptions={toggleOptions}
            currentDescription={list.description}
            completed={completedLength / todoLength}
          />
        )} */}
        <button
          className="options-button"
          value="Show"
          onClick={() => toggleOptions(true)}
        >
          {/* <FontAwesomeIcon icon={faEllipsisH} /> */}
          ...
        </button>
        <button
          className="collapse-button"
          value="Show"
          // onClick={() => collapseList(projectId, listId)}
        >
          {/* <FontAwesomeIcon icon={faCaretDown} /> */}v
        </button>
      </div>
      {/* {list.description && <p>{list.description}</p>} */}
      <ul className="list">
        {/* {todos.map(todo => (
          <Todo
            todo={todo}
            projectId={projectId}
            listId={listId}
            key={todo.title + Math.random()}
          />
        ))} */}
        <form className="new-todo" onSubmit={handleNewList}>
          <input className="submit-todo" type="submit" value="+" />
          <input
            className="add-todo"
            type="text"
            name="addTodo"
            autoComplete="off"
            placeholder="Add todo"
            value={todo}
            onChange={e => changeTodo(e.target.value)}
          />
        </form>
      </ul>
    </div>
  );
};
