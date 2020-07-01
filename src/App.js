import React from 'react';
import { Provider } from 'mobx-react';

import AppIndex from './components/app/AppIndex';

import ApplicationState from './Stores';

function App() {
  return (
    <Provider AppState={ApplicationState}>
      <AppIndex />
    </Provider>
  );
}

export default App;
