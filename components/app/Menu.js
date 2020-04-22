import React, { useState } from "react";
import PropTypes from "prop-types";

// import DayNight from "./DayNight";
import add from "./add.svg";
import Add from "./Add";

function Menu(props) {
  const [displayAdd, toggleAdd] = useState(false);
  const { addTask } = props;

  const toggle = () => {
    toggleAdd(!displayAdd);
  };

  return (
    <div className="menu">
      {/* <DayNight /> */}
      <button className="addBtn" type="button" onClick={() => toggle()}>
        <img src={add} alt="add button" />
      </button>
      {displayAdd && <Add toggle={toggle} addTask={addTask} />}
    </div>
  );
}

Menu.propTypes = {
  addTask: PropTypes.func,
};

export default Menu;
