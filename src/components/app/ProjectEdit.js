import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { dateToday } from './functions/kemplet-date';

import CalendarInput from './CalendarInput';

const ProjectEdit = inject('AppState')(
  observer(props => {
    const { removeProject, editProject } = props.AppState;
    const { project, id, toggle } = props;
    const dueDate = new Date(project.due);
    const [title, updateTitle] = useState(project.title);
    const [calendar, toggleCalendar] = useState(false);
    const [due, updateDue] = useState(
      project.due
        ? `${
            dueDate.getMonth() + 1
          }/${dueDate.getDate()}/${dueDate.getFullYear()}`
        : ''
    );
    const [time, updateTime] = useState(
      project.due
        ? `${dueDate.getHours()}:${('0' + dueDate.getMinutes()).slice(-2)}`
        : '23:59'
    );
    const today = dateToday(0);
    const tomorrow = dateToday(1);

    const handleSubmit = e => {
      e.preventDefault();

      const submitDue = new Date(due);
      submitDue.setHours(
        Number(time.substr(0, 2)),
        Number(time.substr(3, 5)),
        0
      );
      if (title && due === '') {
        editProject(id, title, '');
        toggle();
      } else if (title) {
        editProject(id, title, submitDue.getTime());
        toggle();
      }
    };

    const handleDueClick = (due, e) => {
      const dueOptions = document.querySelector('.dueOptions');
      dueOptions.querySelector('.active') &&
        dueOptions.querySelector('.active').classList.remove('active');
      if (e === 'cal') {
        due === today &&
          dueOptions.querySelector('.todayOption').classList.add('active');
        due === tomorrow &&
          dueOptions.querySelector('.tomorrowOption').classList.add('active');
      } else {
        e.target.classList.add('active');
      }
      updateDue(due);
      toggleCalendar(false);
    };

    return (
      <div>
        <form className="editContainer">
          <div className="inputMotion">
            <input
              type="text"
              name="title"
              autoComplete="off"
              value={title}
              onChange={e => updateTitle(e.target.value)}
              required
            />
            <span className="inputTitle">Title:</span>
          </div>
          <div className="dueDateAndTime">
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
              <span className="inputTitle">Due:</span>
            </div>
            {due !== '' && (
              <div className="inputMotion">
                <input
                  type="time"
                  name="time"
                  className="dateInput"
                  autoComplete="off"
                  defaultValue={time}
                  required
                  onChange={e => updateTime(e.target.value)}
                />
                <span className="inputTitle">At</span>
              </div>
            )}
          </div>
          <CalendarInput
            showing={calendar}
            handleDue={updateDue}
            toggle={toggleCalendar}
          />
          <div className="dueOptions buttonGroup">
            <input
              className="noneOption"
              type="button"
              value="none"
              onClick={e => handleDueClick('', e)}
            />
            <input
              className="todayOption"
              type="button"
              value="today"
              onClick={e => handleDueClick(today, e)}
            />
            <input
              className="tomorrowOption"
              type="button"
              value="tomorrow"
              onClick={e => handleDueClick(tomorrow, e)}
            />
          </div>
          <input
            className="addSubmit"
            type="submit"
            value="save"
            onClick={handleSubmit}
          />
          <input
            className="remove"
            type="button"
            value="close"
            onClick={props.toggle}
          />
          <input
            className="remove"
            type="button"
            value="delete project"
            onClick={() => removeProject(id)}
          />
        </form>
        <div className="modalBackground" onClick={toggle} />
      </div>
    );
  })
);

export default ProjectEdit;
