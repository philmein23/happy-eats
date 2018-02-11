import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Recipes from './Recipes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/about" component={About} />
              <Route
                render={() => <h1 className="text-center">404 Error</h1>}
              />
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
