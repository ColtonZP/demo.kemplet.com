import React from 'react';
import {Link} from 'react-router-dom';


const MainLayout = props => 
  <div className="main-layout">
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/Download">Download</Link></li>
          <li><Link to="/app">App</Link></li>
        </ul>
      </nav>
      {props.children}
    </header>
  </div>

export default MainLayout