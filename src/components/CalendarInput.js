import React, { useState } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

const CalendarInput = inject("TodoStore")(
  observer((props) => {
    const date = new Date();

    const [month, updateMonth] = useState(date.getMonth());
    const [today] = useState(date.getDate());
    const [year, updateYear] = useState(date.getFullYear());
    const actualMonth = date.getMonth();
    const actualYear = date.getFullYear();

    const handleUpdateMonth = (direction) => {
      if (direction === "ascend") {
        if (month === 11) {
          updateMonth(0);
          updateYear(year + 1);
        } else {
          updateMonth(month + 1);
        }
      }
      if (direction === "descend") {
        if (month === 0) {
          updateMonth(11);
          updateYear(year - 1);
        } else {
          updateMonth(month - 1);
        }
      }
    };
    const { showing, handleDue, toggle } = props;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days = [...days, i];
    }

    function calendarMap(day) {
      if (day < today && actualMonth === month && actualYear === year) {
        if (day === 1) {
          return (
            <span key={day} style={{ gridColumnStart: firstDay }}>
              {day}
            </span>
          );
        }
        return <span key={day}>{day}</span>;
      }
      if (day === 1) {
        return (
          <input
            type="button"
            value={day}
            key={day}
            style={{ gridColumnStart: firstDay }}
            onClick={() => {
              handleDue([month + 1, day, year].join("/"));
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
            handleDue([month + 1, day, year].join("/"));
            toggle();
          }}
        />
      );
    }

    const onCurrentMonth =
      actualMonth === month && actualYear === year && "disabled";

    return (
      <div
        className="calendarInput"
        style={{ maxHeight: showing ? "20em" : 0 }}
      >
        <div className="calendarControls">
          <input
            type="button"
            value="<"
            className={onCurrentMonth}
            onClick={() => handleUpdateMonth("descend")}
          />
          <span
            className="month"
            style={{
              gridColumnEnd: "span 5",
              textAlign: "center",
            }}
          >{`${months[month]}, ${year}`}</span>
          <input
            type="button"
            value=">"
            onClick={() => handleUpdateMonth("ascend")}
          />
        </div>

        <div className="sheet">
          <span className="day">Mon</span>
          <span className="day">Tue</span>
          <span className="day">Wed</span>
          <span className="day">Thu</span>
          <span className="day">Fri</span>
          <span className="day">Sat</span>
          <span className="day">Sun</span>
          {days.map((day) => calendarMap(day))}
        </div>
      </div>
    );
  })
);

CalendarInput.propTypes = {
  showing: PropTypes.bool,
  handleDue: PropTypes.func,
  toggle: PropTypes.func,
};

export default CalendarInput;
