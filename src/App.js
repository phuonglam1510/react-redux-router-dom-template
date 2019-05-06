import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import "react-placeholder/lib/reactPlaceholder.css";
import 'react-day-picker/lib/style.css';
import NotFound from './pages/NotFound';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path="/app" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
