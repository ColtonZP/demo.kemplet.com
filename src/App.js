import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppIndex from './components/app/AppIndex';
import Home from './components/web/WebIndex';

import ApplicationState from './Stores';

function App() {
  return (
    <Provider AppState={ApplicationState}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/demo" component={AppIndex} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
