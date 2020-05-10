import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import TodoList from './TodoList';
// import Progress from "./Progress";
// import Options from "./Options";

const TaskDetail = inject('TodoStore')(
  observer(props => {
    const [list, changeList] = useState('');
    const { TodoStore } = props;
    const task = TodoStore.openTask;
    const removeTask = () => TodoStore.removeTask(task.id);

    const handleSubmit = e => {
      e.preventDefault();
      if (list.length > 0) {
        TodoStore.addList(task.id, list);
        changeList('');
      }
    };

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="listText"
              value={list}
              onChange={e => changeList(e.target.value)}
            />
            <input type="submit" value="add list" />
          </form>
          <div className="todoLists">
            {task.todoLists.map(list => (
              <TodoList
                list={list}
                key={list.id}
                listId={list.id}
                taskId={task.id}
              />
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