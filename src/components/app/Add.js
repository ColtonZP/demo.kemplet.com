import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { dateToday } from './functions/kemplet-date';

import CalendarInput from './CalendarInput';

const Add = inject('AppState')(
  observer(props => {
    const { addProject, addSimpleTodo } = props.AppState;

    const [title, updateTitle] = useState('');
    const [due, updateDue] = useState('');
    const [time, updateTime] = useState('23:59');
    const [calendar, toggleCalendar] = useState(false);
    const [type] = useState('project');

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
      const newProject = { title, due: submitDue.getTime() };

      if (due === '') {
        newProject.due = '';
      }
      if (type === 'project') {
        if (title) {
          newProject.todoLists = [];
          addProject(newProject);
          props.toggle();
        }
      } else if (type === 'todoList') {
        newProject.todoList = [];
        addSimpleTodo(newProject);
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
      <div className="modal">
        <form className="addContainer">
          {/* <div className="buttonGroup">
            <input
              className="active"
              type="button"
              value="project"
              onClick={e => handleTypeChange(e, 'project')}
            />
            <input
              type="button"
              value="todo list"
              onClick={e => handleTypeChange(e, 'todoList')}
            />
          </div> */}
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
            handleDue={handleDueClick}
            toggle={toggleCalendar}
          />
          <div className="dueOptions buttonGroup">
            <input
              className="noneOption active"
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
            value="add"
            onClick={handleSubmit}
          />
          <input
            className="remove"
            type="button"
            value="close"
            onClick={props.toggle}
          />
        </form>
        <div className="modalBackground" onClick={props.toggle} />
      </div>
    );
  })
);

export default Add;
