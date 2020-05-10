import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import DayNight from "./DayNight";
import Add from './Add';

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
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {displayAdd && <Add toggle={toggle} addTask={addTask} />}
    </div>
  );
}

Menu.propTypes = {
  addTask: PropTypes.func,
};

export default Menu;
