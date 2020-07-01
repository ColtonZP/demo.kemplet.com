import React from 'react';
import { inject, observer } from 'mobx-react';

import './styles/index.scss';
import ToolBar from './ToolBar';
import Projects from './Projects';
import TaskDetail from './ProjectDetail';

const AppIndex = inject('AppState')(
  observer(props => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { openProjectId } = props.AppState;
    return (
      <div className="App">
        <ToolBar />
        <div className="content">
          <div className="tasks">
            <div className="taskContent">
              <div className="taskList">
                <h1>Projects</h1>
                <Projects />
              </div>
              {openProjectId && <TaskDetail />}
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default AppIndex;
