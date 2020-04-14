import React, { useState } from 'react';

import DayNight from './DayNight';
import add from '../add.svg';
import Add from './Add';

function Menu(props) {
  const [displayAdd, toggleAdd] = useState(false);

  const toggle = () => {
    toggleAdd(!displayAdd);
  };

  return (
    <div className="Menu">
      <DayNight />
      <button className="add" type="button" onClick={() => toggle()}>
        <img src={add} alt="add button" />
      </button>
      {displayAdd && <Add toggle={toggle} addTask={props.addTask} />}
    </div>
  );
}

export default Menu;
