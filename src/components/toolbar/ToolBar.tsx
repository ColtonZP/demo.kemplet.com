import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';

import { Add } from './Add';
// import Menu from './Menu';

export const ToolBar = () => {
  const [isMenu, changeMenu] = useState(false);
  const [isAdd, changeAdd] = useState(false);

  const toggleMenu = () => {
    changeMenu(!isMenu);
  };

  const toggleAdd = () => {
    changeAdd(!isAdd);
  };

  return (
    <div className="toolbar">
      {/* <DayNight /> */}
      <button className="add" onClick={() => toggleAdd()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {isAdd && <Add toggle={toggleAdd} />}
      <div className="user">
        <button className="bars" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {/* {isMenu && <Menu />} */}
    </div>
  );
};