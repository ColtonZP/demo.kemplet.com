import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { dateToday } from '../functions/kemplet-date';

import CalendarInput from './CalendarInput';

const Add = inject('TodoStore')(
  observer(props => {
    const [title, updateTitle] = useState('');
    const [due, updateDue] = useState('');
    const [calendar, toggleCalendar] = useState(false);
    const { TodoStore, toggle } = props;
    const today = dateToday(0);
    const tomorrow = dateToday(1);

    const handleSubmit = e => {
      e.preventDefault();
      if (title) {
        TodoStore.addTask({
          title: title,
          todoLists: [],
          due: due,
        });
      }
      toggle();
    };

    return (
      <div className="modal">
        <form className="addContainer">
          <div className="inputMotion">
            <input
              type="text"
              name="title"
              autoComplete="off"
              value={title}
              onChange={e => updateTitle(e.target.value)}
              required
            />
            <span>Title:</span>
          </div>

          <div className="inputMotion">
            <input
              type="text"
              name="due"
              className="dateInput"
              autoComplete="off"
              value={due}
              required
              onFocus={() => toggleCalendar(true)}
            />
            <span>Due:</span>
          </div>
          <CalendarInput
            showing={calendar}
            handleDue={updateDue}
            toggle={toggleCalendar}
          />
          <div className="dueOptions">
            <input
              className="active"
              type="button"
              value="none"
              onClick={() => {
                updateDue('');
                toggleCalendar(false);
              }}
            />
            <input
              type="button"
              value="today"
              onClick={() => {
                updateDue(today);
                toggleCalendar(false);
              }}
            />
            <input
              type="button"
              value="tomorrow"
              onClick={() => {
                updateDue(tomorrow);
                toggleCalendar(false);
              }}
            />
          </div>
          <input
            className="addSubmit"
            type="submit"
            value="add"
            onClick={handleSubmit}
          />
        </form>
        <div className="modalBackground" onClick={toggle} />
      </div>
    );
  })
);

Add.propTypes = {
  addTask: PropTypes.func,
  toggle: PropTypes.func,
};

export default inject('TodoStore')(observer(Add));
