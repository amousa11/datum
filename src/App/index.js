import React, { Component } from 'react';
import {routes as scenes} from '../routes';
import {Toolbar, Button} from 'react-md';
import './App.css';

class App extends Component {
  render() {
    const nav = <Button key="nav" icon>menu</Button>;
    const actions = [
      <Button key="search" icon>account_circle</Button>,
    ];
    return (
      <div className="App">
        <main id="outer-container">
          <Toolbar
            colored
            title="Datum Marketplace"
            className="md-paper md-paper--2"
            nav={nav}
            actions={actions}
          />
          {scenes}
        </main>
      </div>
    );
  }
}

export default App;