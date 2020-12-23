import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

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
    <Modal>
      <AddContainer>
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
        <InputMotion>
          <input
            type="text"
            name="title"
            autoComplete="off"
            value={title}
            onChange={e => updateTitle(e.target.value)}
            required
          />
          <InputTitle>Title:</InputTitle>
        </InputMotion>
        <DueDateAndTime>
          <InputMotion>
            <DateInput
              type="text"
              name="due"
              autoComplete="off"
              value={due}
              required
              onFocus={() => toggleCalendar(true)}
            />
            <InputTitle>Due:</InputTitle>
          </InputMotion>
          {due !== '' && (
            <InputMotion>
              <DateInput
                type="time"
                name="time"
                autoComplete="off"
                defaultValue={time}
                required
                onChange={(e: any) => updateTime(e.target.value)}
              />
              <InputTitle>At</InputTitle>
            </InputMotion>
          )}
        </DueDateAndTime>
        {/* {calendar && (
          <CalendarInput
            showing={calendar}
            handleDue={handleDueClick}
            toggle={toggleCalendar}
          />
        )} */}
        <ButtonGroup highlight={highlight}>
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
        </ButtonGroup>
        <FormButton type="submit" value="add" onClick={handleSubmit} />
        <FormButton type="button" value="close" onClick={toggle} close />
      </AddContainer>
      <ModalBackground onClick={toggle} />
    </Modal>
  );
};

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
`;

// also for editContainer?
const AddContainer = styled.form`
  ${(props: { theme: { card: any } }) => props.theme.card}
  z-index: 3;
  width: 22.5rem;
  position: relative;
  margin: 2.5rem auto 0;
  padding: 2rem 1rem;
  text-align: center;
  & > span {
    font-size: 1em;
  }
  & > div {
  }
`;
const InputTitle = styled.span`
  position: absolute;
  font-size: 1.2em;
  color: var(--main-font-color);
  top: 0.4em;
  left: 0.4em;
  transition: all ease 0.08s;
  pointer-events: none;
`;

const InputMotion = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  &:nth-child(2) {
    margin-left: 1rem;
  }
  & input {
    font-size: 1.2em;
    font-weight: bold;
    border: none;
    outline: none;
    width: 100%;
    background: var(--button-group-color);
    border-radius: var(--rounded);
    padding: var(--secondary-margin);
    &:focus,
    &:valid {
      & + ${InputTitle} {
        top: -1.4em;
        font-size: 0.8em;
        color: var(--secondary-font-color);
      }
    }
  }
`;

const DueDateAndTime = styled.div`
  display: flex;
`;

const DateInput = styled.input`
  color: var(--main-font-color);
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  border-radius: var(--rounded);
  overflow: hidden;
  background: var(--button-group-color);
  margin-bottom: 1rem;
  & input {
    ${(props: { theme: { button: any } }) => props.theme.button}
    background: transparent;
    border-radius: var(--rounded);
    color: var(--main-font-color);
  }
  & input:nth-child(${(props: { highlight: any }) => props.highlight}) {
    background: var(--theme-color);
    color: white;
  }
`;

const FormButton = styled.input`
  ${(props: { theme: { button: any } }) => props.theme.button};
  ${(props: { close: any }) =>
    props.close &&
    `
     background: var(--secondary-theme-color); 
     margin-top: 1rem;`}
  font-size: 1em;
  width: 100%;
`;
