import React, { useState, useEffect } from "react";

function Todo(props) {
  const [completed, updateCompleted] = useState(props.todo.completed);

  // const toggleChecked = () => {
  //   props.todo.completed = !props.todo.completed;
  // };

  useEffect(() => {
    props.todo.completed = completed;
  });

  return (
    <li className="todoCheck">
      <input
        type="checkbox"
        readOnly
        checked={completed}
        onClick={() => updateCompleted(!completed)}
      />
      <label>{props.todo.title}</label>
    </li>
  );
}

export default Todo;
