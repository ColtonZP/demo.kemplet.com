import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Add from './Add';

const ToolBar = inject('AppState')(
  observer(props => {
    const [displayAdd, toggleAdd] = useState(false);

    const toggle = () => {
      toggleAdd(!displayAdd);
    };

    return (
      <div className="toolbar">
        <button className="addBtn" onClick={() => toggle()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {displayAdd && <Add toggle={toggle} />}
      </div>
    );
  })
);

export default ToolBar;
