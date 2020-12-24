import React, { useState } from 'react';

import plus from '../../images/plus.svg';
import menu from '../../images/menu.svg';
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
        <img src={plus} alt="" />
      </button>
      {isAdd && <Add toggleAdd={toggleAdd} />}
      <div className="user">
        <button className="bars" onClick={toggleMenu}>
          <img src={menu} alt="" />
        </button>
      </div>
      {/* {isMenu && <Menu />} */}
    </div>
  );
};
