import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';

export const routes = (
  <Switch>
    <Route exact path="/">
      <Redirect to="/home"/>
    </Route>
    <Route exact path="/home" component={Home}/>
  </Switch>
);
