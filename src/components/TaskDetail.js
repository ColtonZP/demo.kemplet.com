import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import TodoList from "./TodoList";
// import Progress from "./Progress";
// import Options from "./Options";

const TaskDetail = inject("TodoStore")(
  observer((props) => {
    const task = props.TodoStore.openTask;
    const removeTask = () => props.TodoStore.removeTask(task.id);
    return (
      <div className="taskDetailContainer card">
        {/* <Progress list={task.todoLists} /> */}
        <div className="taskDetails">
          {/* <Options id={task.id} removeTask={removeTask} /> */}
          <h1>{task.title}</h1>
          <input
            type="button"
            value="remove"
            className="remove"
            onClick={removeTask}
          />
          <span>{`Due: ${task.due.slice(0, -5)}`}</span>
          <form>
            {/* onSubmit, add tasks */}
            <input type="text" className="listText" />
            <input type="submit" value="add list" />
          </form>
          <div className="todoLists">
            {task.todoLists.map((list) => (
              <TodoList list={list} key={list.id} />
            ))}
          </div>
        </div>
      </div>
    );
  })
);

TaskDetail.propTypes = {
  TodoStore: PropTypes.func,
};

export default TaskDetail;
