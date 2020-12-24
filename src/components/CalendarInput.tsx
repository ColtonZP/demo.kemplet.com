import React, { useState } from 'react';

// import arrow from '../../images/arrow.svg';

type Props = {
  handleDue: (
    due: string,
    e: React.MouseEvent<HTMLInputElement> | null,
    isCalendar: boolean,
  ) => {};
  toggle: () => void;
};

export const CalendarInput = ({ handleDue, toggle }: any) => {
  const date = new Date();
  const [month, updateMonth] = useState(date.getMonth());
  const [today] = useState(date.getDate());
  const [year, updateYear] = useState(date.getFullYear());
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
          <span key={day} style={{ gridColumnStart: firstDay + 1 }}>
            {day}
          </span>
        );
      }
      return <span key={day}>{day}</span>;
    }
    if (day === 1) {
      console.log(firstDay);
      return (
        <input
          type="button"
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
    <div className="calendar-input">
      <div className="calendar-controls">
        {actualMonth !== month && (
          <input
            className="month-button"
            type="button"
            onClick={() => handleUpdateMonth('descend')}
          />
        )}
        <span>{`${months[month]}, ${year}`}</span>
        <input
          className="month-button"
          type="button"
          onClick={() => handleUpdateMonth('ascend')}
        />
      </div>

      <div className="sheet">
        <span className="day">Sun</span>
        <span className="day">Mon</span>
        <span className="day">Tue</span>
        <span className="day">Wed</span>
        <span className="day">Thu</span>
        <span className="day">Fri</span>
        <span className="day">Sat</span>
        {days.map(day => calendarMap(day))}
      </div>
    </div>
  );
};
