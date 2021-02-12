import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Cuaca from "./Cuaca.js";
import BMKG from "./BMKG.js";
import Gempadirasakan from "./Gempadirasakan";
import "./Layout.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Layout() {
  const classes = useStyles();

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

            <nav>
              <ul>
                <li>
                  <Link to="/">Gempa</Link>
                </li>
                <li>
                  <Link to="/cuaca">Cuaca</Link>
                </li>
                <li>
                  <Link to="/dirasakan">Dirasakan</Link>
                </li>
              </ul>
            </nav>
          </div>
        </Router>
      </Grid>
    </div>
  );
}
