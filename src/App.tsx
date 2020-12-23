import React from 'react';

import { TodoManager } from './states/TodoState';

import { ToolBar } from './components/toolbar/ToolBar';

// TodoState = { TodoManager };

function App() {
  return (
    <div className="app">
      <ToolBar />
      <div className="content">
        <div className="projects">
          <div className="projectList">
            {/* //! <Today /> */}
            <h1 className="projectTitle">Projects</h1>
            {/* <Projects /> */}
          </div>
          {/* {openProjectId && <OpenProject />} */}
        </div>
        {/* <Calendar /> */}
      </div>
    </div>
  );
}

export default App;
