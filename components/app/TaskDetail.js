import React, { Component } from "react";
import PropTypes from "prop-types";

import TodoList from "./TodoList";

function TaskDetail({ task }) {
  return (
    <div className="taskDetailContainer card">
      <div className="taskDetails">
        <h1>{task.title}</h1>
        <span style={{ display: "block" }}>{`Due: ${task.due}`}</span>
        {task.todoLists.map((list) => (
          <TodoList list={list} key={list.title} />
        ))}
      </div>
    </div>
  );
}

TaskDetail.propTypes = {
  task: PropTypes.object,
};

export default TaskDetail;
