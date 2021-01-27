import React from 'react';

import { ToolBar } from './components/toolbar/ToolBar';
import { Projects } from './components/projects/Projects';
import { OpenProject } from './components/projects/OpenProject';
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
          </div>
          <OpenProject />
        </div>
        {/* <Calendar /> */}
      </div>
    </div>
  );
}

export default App;
