import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Todo(props) {
  const { todo } = props;
  const [completed, updateCompleted] = useState(todo.completed);

  useEffect(() => {
    todo.completed = completed;
  });

  return (
    <li className="todoCheck">
      <input
        type="checkbox"
        readOnly
        checked={completed}
        onClick={() => updateCompleted(!completed)}
      />
      <label>{todo.todo}</label>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.object,
};

export default Todo;
