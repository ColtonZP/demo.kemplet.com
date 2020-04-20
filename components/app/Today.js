import React from "react";

function Today() {
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Intl.DateTimeFormat("en-US", dateOptions).format(new Date());
  return (
    <div className="Today Card">
      <h1>{`${date}`}</h1>
      <span>Due today</span>
    </div>
  );
}

export default Today;
