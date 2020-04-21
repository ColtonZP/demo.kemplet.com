import React from "react";

function Calendar() {
  const date = new Date(),
    month = date.getMonth(),
    year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  let days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days = [...days, i];
  }
  return (
    <div className="calendar">
      <div className="sheet" style={{ maxWidth: "auto" }}>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
        {days.map((day) => {
          if (day === 1) {
            return (
              <input
                type="button"
                value={day}
                style={{ gridColumnStart: firstDay }}
              />
            );
          }
          return <input type="button" value={day} key={day} />;
        })}
      </div>
    </div>
  );
}

export default Calendar;
