import React from 'react';

import { ToolBar } from './components/toolbar/ToolBar';

// TodoState = { TodoManager };

function App() {
  return (
    <div className="app">
      <ToolBar />
      <div className="content">
        <div className="projects">
          <div className="project-list">
            {/* //! <Today /> */}
            <h1 className="project-title">Projects</h1>
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
