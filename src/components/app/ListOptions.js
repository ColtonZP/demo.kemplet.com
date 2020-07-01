import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import CalendarInput from './CalendarInput';

const ListOptions = inject('AppState')(
  observer(props => {
    const {
      listId,
      toggleOptions,
      projectId,
      completed,
      currentDescription,
    } = props;
    const {
      openProject,
      removeList,
      combineList,
      completeAllTodos,
      changeListDue,
      addListDescription,
    } = props.AppState;
    const [showingList, toggleList] = useState(false);
    const [description, updateDescription] = useState(currentDescription);
    const [editingDescription, toggleEditingDesc] = useState(false);
    const [calendar, toggleCalendar] = useState(false);

    function handleDue(date) {
      const submitDate = new Date(date);
      changeListDue(projectId, listId, submitDate.getTime());
    }

    const handleSubmit = e => {
      e.preventDefault();
      addListDescription(projectId, listId, description);
      toggleEditingDesc(!editingDescription);
    };

    return (
      <div className="optionsMenu" onMouseLeave={() => toggleOptions(false)}>
        <button onClick={() => toggleEditingDesc(!editingDescription)}>
          description
        </button>
        <button onClick={() => toggleCalendar(!calendar)}>due date</button>
        {editingDescription && (
          <form onSubmit={handleSubmit}>
            <textarea
              value={description}
              onChange={e => updateDescription(e.target.value)}
            />
            <input type="submit" value="add" />
          </form>
        )}
        <CalendarInput
          showing={calendar}
          handleDue={handleDue}
          toggle={toggleCalendar}
        />
        {completed === 1 ? (
          <button onClick={() => completeAllTodos(projectId, listId, false)}>
            mark all incomplete
          </button>
        ) : (
          <button onClick={() => completeAllTodos(projectId, listId, true)}>
            mark all complete
          </button>
        )}
        <button onClick={() => removeList(projectId, listId)}>remove</button>
        {openProject.todoLists.length > 1 && (
          <button onClick={() => toggleList(true)}>combine list...</button>
        )}
        {showingList && (
          <div className="projectList">
            {openProject.todoLists.map(
              list =>
                list.id !== listId && (
                  <button
                    onClick={() => combineList(projectId, list.id, listId)}
                  >
                    {list.title}
                  </button>
                )
            )}
          </div>
        )}
      </div>
    );
  })
);

export default ListOptions;
