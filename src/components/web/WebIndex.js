import React from 'react';
import { Link } from 'react-router-dom';

import './styles/index.scss';
import screenshot from '../../images/app.png';
import checkmark from '../../images/checkmark.svg';

const WebIndex = () => {
  return (
    <div className="home">
      <main>
        <div className="info">
          <div className="title">
            <h1>Kemplet</h1>
            <p>Get your todos Kemplet</p>
          </div>
          <div className="links">
            <Link className="link" to="/demo">
              DEMO
            </Link>
            <a className="app" href="kemplet.com">
              OPEN APP
            </a>
          </div>
          <ul>
            <li>
              <img src={checkmark} alt="" /> Simplistic
            </li>
            <li>
              <img src={checkmark} alt="" /> Fast
            </li>
            <li>
              <img src={checkmark} alt="" /> Organized
            </li>
          </ul>
        </div>
        <img src={screenshot} alt="screen shot" />
      </main>
      <footer></footer>
    </div>
  );
};

export default WebIndex;
