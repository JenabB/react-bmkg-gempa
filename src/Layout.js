import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Cuaca from "./Cuaca.js";
import BMKG from "./BMKG.js";
import Gempadirasakan from "./Gempadirasakan";
import "./Layout.css";
import Contributor from "./Contributor.js";
import Abouts from "./Abouts.js";
import gempa from "./assets/images/BMKG-over5.png";
import cuaca from "./assets/images/BMKG-Cuaca.png";
import dirasakan from "./assets/images/BMKG-20.png";
import kontributor from "./assets/images/BMKG-About.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Layout() {
  return (
    <div className="app-container">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
      >
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

            <nav className="float">
              <ul>
                <li>
                  <Link to="/">
                    <img src={gempa} alt="gempa" width="40px" />
                    <p class="menu-title">Gempa</p>
                  </Link>
                </li>
                <li>
                  <Link to="/cuaca">
                    {" "}
                    <img src={cuaca} alt="gempa" width="40px" />
                    <p class="menu-title">Cuaca</p>
                  </Link>
                </li>
                <li>
                  <Link to="/dirasakan">
                    {" "}
                    <img src={dirasakan} alt="gempa" width="40px" />
                    <p class="menu-title">Dirasakan</p>
                  </Link>
                </li>
                <li>
                  <Link to="/kontributor">
                    {" "}
                    <img src={kontributor} alt="gempa" width="40px" />
                    <p class="menu-title">Kontributor</p>
                  </Link>
                </li>
                <li>
                  <Link to="/tentang">
                    {" "}
                    <img src={dirasakan} alt="gempa" width="40px" />
                    <p class="menu-title">Tentang</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Router>
      </Grid>
    </div>
  );
}
