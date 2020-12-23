import React, { useState } from 'react';
import styled from 'styled-components';

import { dateToday } from '../../functions/kemplet-date';
// import CalendarInput from '../CalendarInput';

export const Add = ({ toggle }: any) => {
  // const { addProject, addSimpleTodo } = AppState;

  const [title, updateTitle] = useState('');
  const [due, updateDue] = useState('');
  const [highlight, updateHighlight] = useState(1);
  const [time, updateTime] = useState('23:59');
  const [calendar, toggleCalendar] = useState(false);
  const [type] = useState('project'); // add change type

  const today = dateToday(0);
  const tomorrow = dateToday(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const submitDue = new Date(due);
    submitDue.setHours(Number(time.substr(0, 2)), Number(time.substr(3, 5)), 0);
    const newProject = {
      title,
      due: submitDue.getTime(),
      todoLists: [],
    };

    if (due === '') {
      newProject.due = 0;
    }
    if (type === 'project') {
      if (title) {
        newProject.todoLists = [];
        // addProject(newProject);
        toggle();
      }
    } else if (type === 'todoList') {
      newProject.todoLists = [];
      // addSimpleTodo(newProject);
    }
  };

  // const handleTypeChange = (e, type) => {
  //   e.target.parentNode.querySelector('.active').classList.remove('active');
  //   e.target.className = 'active';
  //   changeType(type);
  // };

  const handleDueClick = (due: any, e: any, highlightClick: any) => {
    if (e === 'cal') {
      due === today && updateHighlight(2);
      due === tomorrow && updateHighlight(3);
      due > tomorrow && updateHighlight(0);
    } else {
      updateHighlight(highlightClick);
    }
    updateDue(due);
    toggleCalendar(false);
  };

  return (
    <form className="add-form card">
      {/* <div className="buttonGroup"> // ! Button group for basic todos
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
      <div className="input-motion">
        <input
          type="text"
          name="title"
          autoComplete="off"
          value={title}
          onChange={e => updateTitle(e.target.value)}
          required
        />
        <span className="input-title">Title:</span>
      </div>
      <div className="date-and-time">
        <div className="input-motion">
          <input
            className="date-input"
            type="text"
            name="due"
            autoComplete="off"
            value={due}
            required
            onFocus={() => toggleCalendar(true)}
          />
          <span className="input-title">Due:</span>
        </div>

        {due !== '' && (
          <div className="input-motion">
            <input
              className="date-input"
              type="time"
              name="time"
              autoComplete="off"
              defaultValue={time}
              required
              onChange={(e: any) => updateTime(e.target.value)}
            />
            <span className="input-title">At</span>
          </div>
        )}
      </div>
      {/* {calendar && (
          <CalendarInput
            showing={calendar}
            handleDue={handleDueClick}
            toggle={toggleCalendar}
          />
        )} */}
      <div className="button-group">
        <input
          className="noneOption active"
          type="button"
          value="none"
          onClick={e => handleDueClick('', e, 1)}
        />
        <input
          className="todayOption"
          type="button"
          value="today"
          onClick={e => handleDueClick(today, e, 2)}
        />
        <input
          className="tomorrowOption"
          type="button"
          value="tomorrow"
          onClick={e => handleDueClick(tomorrow, e, 3)}
        />
      </div>
      <input
        className="form-button"
        type="submit"
        value="add"
        onClick={handleSubmit}
      />
      <input
        className="form-button close-button"
        type="button"
        value="cancel"
        onClick={toggle}
      />
    </form>
  );
};
