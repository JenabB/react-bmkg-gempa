import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Cuaca from "./components/Cuaca.js";
import BMKG from "./components/BMKG.js";
import Gempadirasakan from "./components/Gempadirasakan";
import "./Layout.css";
import Contributor from "./components/Contributor.js";
import Abouts from "./components/Abouts.js";
import gempa from "./assets/images/BMKG-over5.png";
import cuaca from "./assets/images/BMKG-Cuaca.png";
import dirasakan from "./assets/images/BMKG-20.png";
import kontributor from "./assets/images/BMKG-About.png";
import info from "./assets/images/info.png";
export default function Layout() {
  return (
    <div className="app-container">
      <Router>
        <div>
          <Switch>
            <Route path="/tentang">
              <Abouts />
            </Route>
            <Route path="/kontributor">
              <Contributor />
            </Route>
            <Route path="/dirasakan">
              <Gempadirasakan />
            </Route>
            <Route path="/Cuaca">
              <Cuaca />
            </Route>
            <Route path="/">
              <BMKG />
            </Route>
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
                <img src={cuaca} alt="gempa" width="30px" />
                <p class="menu-title">Cuaca</p>
              </Link>
            </div>
            <div>
              <Link to="/dirasakan">
                <img src={dirasakan} alt="gempa" width="30px" />
                <p class="menu-title">Dirasakan</p>
              </Link>
            </div>
            <div>
              <Link to="/kontributor">
                <img src={kontributor} alt="gempa" width="30px" />
                <p class="menu-title">Kontributor</p>
              </Link>
            </div>
            <div>
              <Link to="/tentang">
                <img src={info} alt="gempa" width="30px" />
                <p class="menu-title">Tentang</p>
              </Link>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
