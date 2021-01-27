import React, { useState } from 'react';

import { useProjectsState, Project as ProjectType } from '../../State';

import { TaskList } from './tasks/TaskList';
// import ProjectEdit from './ProjectEdit';
// import Todo from './todos/Todo';

export const OpenProject = () => {
  const { projects, openProjectId } = useProjectsState(state => ({
    projects: state.projects,
    openProjectId: state.openProject,
  }));

  const [list, changeList] = useState('');
  const [editing, isEditing] = useState(false);

  let openProject: ProjectType = {
    title: '',
    due: 0,
    completed: false,
    id: '',
    taskLists: [],
  }; // ! figure out how to remove default values
  // let todoList = null;

  projects.forEach(project => {
    if (project.id === openProjectId) {
      openProject = project;
    }
  });

  // todoLists.forEach(project => {
  //   if (project.id === openProjectId) {
  //     openProject = project;
  //     todoList = openProject.todoList;
  //   }
  // });

  const { id, title, due } = openProject || {};
  const dueDate = new Date(due);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (list.length > 0) {
      // addList(id, list);
      changeList('');
    }
  };

  function toggleEditing() {
    isEditing(!editing);
  }

  function formatTime(hour: number, minute: number) {
    return `${hour > 12 ? hour - 12 : hour}:${('0' + minute).slice(-2)} ${
      hour >= 12 ? 'pm' : 'am'
    }`;
  }

  return (
    <>
      {openProjectId && (
        <div className="open-project">
          {/* ! {editing && (
        <ProjectEdit project={openProject} id={id} toggle={toggleEditing} />
      )} */}
          <div>
            <div className="project-info card">
              <div onClick={toggleEditing}>
                <h1>{title}</h1>
                {due !== 0 && (
                  <span>
                    {`Due: ${
                      dueDate.getMonth() + 1
                    }/${dueDate.getDate()} at ${formatTime(
                      dueDate.getHours(),
                      dueDate.getMinutes(),
                    )}`}
                  </span>
                )}
              </div>

              <form className="add-form" onSubmit={handleSubmit}>
                <input
                  className="title-input"
                  type="text"
                  value={list}
                  onChange={e => changeList(e.target.value)}
                />
                <input className="submit" type="submit" value="add list" />
              </form>
            </div>

            {openProject.taskLists.length > 0 &&
              openProject.taskLists.map((list: any) => {
                return (
                  <TaskList
                    key={list.id}
                    list={list}
                    listId={list.id}
                    projectId={id}
                  />
                );
              })}
            {/* {todoList && (
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
        )} */}
          </div>
        </div>
      )}
    </>
  );
};
