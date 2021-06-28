import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Gempa from './pages/Gempa';
import Cuaca from './pages/Cuaca.js';
import Gempadirasakan from './pages/Gempadirasakan';
import './Layout.css';
import Abouts from './pages/Abouts.js';

import gempa from './assets/images/BMKG-over5.png';
import cuaca from './assets/images/BMKG-Cuaca.png';
import dirasakan from './assets/images/BMKG-20.png';

import info from './assets/images/info.png';

export default function Layout() {
  return (
    <div className="app-container">
      <Router>
        <div>
          <Switch>
            <Route path="/tentang" component={Abouts} />
            <Route path="/dirasakan" component={Gempadirasakan} />
            <Route path="/Cuaca" component={Cuaca} />
            <Route path="/" component={Gempa} />
          </Switch>

          <div className="bottom-navigation">
            <div>
              <Link to="/">
                <img src={gempa} alt="gempa" width="30px" />
                <p class="menu-title">Gempa</p>
              </Link>
            </div>
            <div>
              <Link to="/cuaca">
                <img src={cuaca} alt="cuaca" width="30px" />
                <p class="menu-title">Cuaca</p>
              </Link>
            </div>
            <div>
              <Link to="/dirasakan">
                <img src={dirasakan} alt="dirasakan" width="30px" />
                <p class="menu-title">Dirasakan</p>
              </Link>
            </div>
            <div>
              <Link to="/tentang">
                <img src={info} alt="tentang" width="30px" />
                <p class="menu-title">Tentang</p>
              </Link>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
