import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import TodoList from './TodoList';
import ProjectEdit from './ProjectEdit';
import Todo from './Todo';

const ProjectDetails = inject('AppState')(
  observer(props => {
    const [list, changeList] = useState('');
    const [editing, isEditing] = useState(false);
    const { openProjectId, addList, projects, todoLists } = props.AppState;

    let openProject;
    let projectTodoList = null;
    let todoList = null;

    projects.forEach(project => {
      if (project.id === openProjectId) {
        openProject = project;
        projectTodoList = openProject.todoLists;
      }
    });
    todoLists.forEach(project => {
      if (project.id === openProjectId) {
        openProject = project;
        todoList = openProject.todoList;
      }
    });
    const { id, title, due } = openProject;
    const dueDate = new Date(due);

    const handleSubmit = e => {
      e.preventDefault();
      if (list.length > 0) {
        addList(id, list);
        changeList('');
      }
    };

    function toggleEditing() {
      isEditing(!editing);
    }

    function formatTime(hour, minute) {
      return `${hour > 12 ? hour - 12 : hour}:${('0' + minute).slice(-2)} ${
        hour >= 12 ? 'pm' : 'am'
      }`;
    }

    return (
      <div className="taskDetailContainer">
        {editing && (
          <ProjectEdit project={openProject} id={id} toggle={toggleEditing} />
        )}
        <div className="taskDetails">
          <div className="projectInfo card">
            <div className="heading" onClick={toggleEditing}>
              <h1>{title}</h1>
              {due && (
                <span>
                  {`Due: ${
                    dueDate.getMonth() + 1
                  }/${dueDate.getDate()} at ${formatTime(
                    dueDate.getHours(),
                    dueDate.getMinutes()
                  )}`}
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="addListForm">
              <input
                type="text"
                className="listText"
                value={list}
                onChange={e => changeList(e.target.value)}
              />
              <input type="submit" value="add list" />
            </form>
          </div>

          <div className="todoLists">
            {projectTodoList &&
              projectTodoList.map(list => {
                return (
                  <TodoList
                    list={list}
                    key={list.id}
                    listId={list.id}
                    projectId={id}
                  />
                );
              })}
            {todoList && (
              <div className="card">
                <ul>
                  {todoList.map(todo => (
                    <Todo
                      todo={todo}
                      projectId={id}
                      key={todo.title + Math.random()}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })
);

export default ProjectDetails;
