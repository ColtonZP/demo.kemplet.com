import React from 'react';

function Todo(props) {
  const toggleChecked = () => {
    props.item.completed = !props.item.completed;
  };

  return (
    <li>
      <input
        type="checkbox"
        className="todoCheck"
        readOnly
        checked={props.item.completed}
        onClick={toggleChecked}
      />
      {props.item.name}
    </li>
  );
}

export default Todo;
