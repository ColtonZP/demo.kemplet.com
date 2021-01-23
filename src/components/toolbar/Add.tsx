import React, { useState, useRef } from 'react';

import { useProjectsState } from '../../State';
import { useClickOutside } from '../../hooks/useClickOutside';
import { getDueDate } from '../../functions/kemplet-date';
import { CalendarInput } from '../CalendarInput';

type Props = {
  toggleAdd: () => void;
};

export const Add = ({ toggleAdd }: Props) => {
  const { createProject } = useProjectsState(state => ({
    createProject: state.createProject,
  }));

  const [title, updateTitle] = useState('');
  const [due, updateDue] = useState('');
  const [time, updateTime] = useState('23:59');
  const [calendar, toggleCalendar] = useState(false);
  const [type] = useState('project'); // add change type

  const addDiv = useRef<HTMLFormElement>(null!);
  const buttonGroup = useRef<HTMLDivElement>(null);

  const today = getDueDate(0);
  const tomorrow = getDueDate(1);

  useClickOutside(addDiv, () => {
    toggleAdd();
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
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
        createProject(title, due ? submitDue.getTime() : 0);
        toggleAdd();
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

  const handleDueClick = (
    due: string,
    e: React.MouseEvent<HTMLInputElement> | null,
    isCalendar: boolean,
  ) => {
    buttonGroup.current?.querySelector('.active')?.classList.remove('active');
    if (isCalendar) {
      due === today &&
        buttonGroup.current
          ?.querySelector('.todayOption')
          ?.classList.add('active');
      due === tomorrow &&
        buttonGroup.current
          ?.querySelector('.tomorrowOption')
          ?.classList.add('active');
    } else {
      (e?.target as HTMLInputElement).classList.add('active');
    }
    updateDue(due);
  };

  return (
    <form className="add-form card" ref={addDiv}>
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
            // readOnly
            onFocus={() => toggleCalendar(true)}
            onChange={() => ''}
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
      {calendar && (
        <CalendarInput
          handleDue={handleDueClick}
          toggleCalendar={toggleCalendar}
        />
      )}
      <div className="button-group" ref={buttonGroup}>
        <input
          className="noneOption active"
          type="button"
          value="none"
          onClick={e => handleDueClick('', e, false)}
        />
        <input
          className="todayOption"
          type="button"
          value="today"
          onClick={e => handleDueClick(today, e, false)}
        />
        <input
          className="tomorrowOption"
          type="button"
          value="tomorrow"
          onClick={e => handleDueClick(tomorrow, e, false)}
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
        onClick={toggleAdd}
      />
    </form>
  );
};
