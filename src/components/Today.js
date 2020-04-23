import React from "react";

function Today({ tasks }) {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Intl.DateTimeFormat("en-US", dateOptions).format(new Date());

  function isDue(obj) {
    return new Date(obj.due).toDateString() === new Date().toDateString();
  }

  const dueToday = tasks.filter(isDue);

  return (
    <div className="today card">
      <h1>{`${date}`}</h1>
      {dueToday.length >= 1 && (
        <div className="dueToday">
          <span className="dueTitle">Due today</span>
          <ul>
            {dueToday.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Today;
