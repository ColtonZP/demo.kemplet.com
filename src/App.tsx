import React from 'react';

import { TodoManager } from './lib/TodoState';
import { Todos } from './components/Todos';

function App() {
  return (
    <div className="App">
      <h1>Todos:</h1>
      <Todos TodoState={TodoManager} />
    </div>
  );
}

export default App;
