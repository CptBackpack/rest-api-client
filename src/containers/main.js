import React, {Component} from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Routes from '../Routes/Routes';
class Main extends Component {
  render() {
    return (
      <div>
        <input
          type="button"
          value="CHECK TOKEN"
          onClick={this.props.tokenCheck}></input>
        <Router>
          <Routes/> {/* <Route exact path="/" component= />
          <Route path="/admin" component= /> */}
          <Switch></Switch>
        </Router>
      </div>
    );
  }
}

export default Main;