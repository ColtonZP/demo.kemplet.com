import React, { useState, useRef } from 'react';

import { useClickOutside } from '../hooks/useClickOutside';

// import arrow from '../../images/arrow.svg';

type Props = {
  handleDue: (
    due: string,
    e: React.MouseEvent<HTMLInputElement> | null,
    isCalendar: boolean,
  ) => {};
  toggle: (toggle: boolean) => void;
};

export const CalendarInput = ({ handleDue, toggle }: any) => {
  const date = new Date();

  const [month, updateMonth] = useState(date.getMonth());
  const [today] = useState(date.getDate());
  const [year, updateYear] = useState(date.getFullYear());

  const calendarInput = useRef<HTMLDivElement>(null!);

  const actualMonth = date.getMonth();
  const actualYear = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let days: number[] = [];

  useClickOutside(calendarInput, () => {
    toggle(false);
  });

  const handleUpdateMonth = (direction: string) => {
    if (direction === 'ascend') {
      if (month === 11) {
        updateMonth(0);
        updateYear(year + 1);
      } else {
        updateMonth(month + 1);
      }
    }
    if (direction === 'descend') {
      if (month === 0) {
        updateMonth(11);
        updateYear(year - 1);
      } else {
        updateMonth(month - 1);
      }
    }
  };

  for (let i = 1; i <= daysInMonth; i++) {
    days = [...days, i];
  }

  function calendarMap(day: number) {
    if (day < today && actualMonth === month && actualYear === year) {
      if (day === 1) {
        return (
          <span
            className="day"
            key={day}
            style={{ gridColumnStart: firstDay + 1 }}
          >
            {day}
          </span>
        );
      }
      return (
        <span className="day" key={day}>
          {day}
        </span>
      );
    }
    if (day === 1) {
      console.log(firstDay);
      return (
        <input
          type="button"
          className="day selectable"
          value={day}
          key={day}
          style={{ gridColumnStart: firstDay + 1 }}
          onClick={() => {
            handleDue([month + 1, day, year].join('/'), null, true);
            toggle();
          }}
        />
      );
    }
    return (
      <input
        type="button"
        className="day selectable"
        value={day}
        key={day}
        onClick={() => {
          handleDue([month + 1, day, year].join('/'), null, true);
          toggle();
        }}
      />
    );
  }

  // const onCurrentMonth =
  // actualMonth === month && actualYear === year && 'disabled';

  return (
    <div className="calendar-input" ref={calendarInput}>
      <div className="calendar-controls">
        <input
          className={`month-button ${actualMonth === month && `hidden`}`}
          type="button"
          onClick={() => actualMonth !== month && handleUpdateMonth('descend')}
        />

        <span>{`${months[month]}, ${year}`}</span>
        <input
          className="month-button"
          type="button"
          onClick={() => handleUpdateMonth('ascend')}
        />
      </div>

      <div className="sheet">
        <span className="day-of-the-week">Sun</span>
        <span className="day-of-the-week">Mon</span>
        <span className="day-of-the-week">Tue</span>
        <span className="day-of-the-week">Wed</span>
        <span className="day-of-the-week">Thu</span>
        <span className="day-of-the-week">Fri</span>
        <span className="day-of-the-week">Sat</span>
        {days.map(day => calendarMap(day))}
      </div>
    </div>
  );
};
