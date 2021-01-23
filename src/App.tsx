import React from 'react';

import { ToolBar } from './components/toolbar/ToolBar';
import { Projects } from './components/projects/Projects';
// TodoState = { TodoManager };

function App() {
  return (
    <div className="app">
      <ToolBar />
      <div className="content">
        <div className="projects-panel">
          <div className="left-panel">
            {/* //! <Today /> */}
            <Projects />
            {/* {openProjectId && <OpenProject />} */}
          </div>
        </div>
        {/* <Calendar /> */}
      </div>
    </div>
  );
}

export default App;
