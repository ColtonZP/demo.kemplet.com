import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Index from './pages/Index';
import About from './pages/About'
import App from './pages/App';
import NoMatch from './pages/NoMatch';

Meteor.startup(() => {
  render(
    <Router>
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/about" component={About} />
        <Route exact path="/app" component={App} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>,
    document.getElementById('render-target')
  );
});
