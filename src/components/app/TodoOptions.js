import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import CalendarInput from './CalendarInput';

const TodoOptions = inject('AppState')(
  observer(props => {
    const { removeTodo, changeTodoDue } = props.AppState;
    const { todo, projectId, listId, toggleOptions } = props;
    const [calendar, toggleCalendar] = useState(false);

    function handleDue(date) {
      const submitDate = new Date(date);
      changeTodoDue(projectId, listId, todo.id, submitDate.getTime());
    }

    return (
      <div className="optionsMenu" onMouseLeave={() => toggleOptions(false)}>
        <button onClick={() => removeTodo(projectId, listId, todo.id)}>
          remove
        </button>
        <button onClick={() => console.log('move to')}>move to...</button>
        <button onClick={() => toggleCalendar(!calendar)}>due date</button>
        <CalendarInput
          showing={calendar}
          handleDue={handleDue}
          toggle={toggleCalendar}
        />
        {calendar && (
          <div className="dueOptions">
            <input
              className="active"
              type="button"
              value="none"
              onClick={() => {
                // updateDue('');
                toggleCalendar(false);
              }}
            />
            <input
              type="button"
              value="today"
              onClick={() => {
                // updateDue(today);
                toggleCalendar(false);
              }}
            />
            <input
              type="button"
              value="tomorrow"
              onClick={() => {
                // updateDue(tomorrow);
                toggleCalendar(false);
              }}
            />
          </div>
        )}
      </div>
    );
  })
);

export default TodoOptions;
