import React, { Component } from "react";
import PropTypes from "prop-types";

class CalendarInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth(),
      today: new Date().getDate(),
      year: new Date().getFullYear(),
      actualMonth: new Date().getMonth(),
      actualYear: new Date().getFullYear(),
    };
  }

  updateMonth(direction) {
    if (direction === "ascend") {
      if (this.state.month === 11) {
        this.setState({
          month: 0,
          year: this.state.year + 1,
        });
      } else {
        this.setState({
          month: this.state.month + 1,
        });
      }
    }
    if (direction === "descend") {
      if (this.state.month === 0) {
        this.setState({
          month: 11,
          year: this.state.year - 1,
        });
      } else {
        this.setState({
          month: this.state.month - 1,
        });
      }
    }
  }

  render() {
    const { month, today, year, actualMonth, actualYear } = this.state;
    const { showing, handleDue, toggle } = this.props;
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
            onClick={() => this.updateMonth("descend")}
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
            onClick={() => this.updateMonth("ascend")}
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
  }
}

CalendarInput.propTypes = {
  showing: PropTypes.bool,
  handleDue: PropTypes.func,
  toggle: PropTypes.func,
};

export default CalendarInput;
