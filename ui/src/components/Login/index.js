import React, { Component } from 'react';
import {Button} from 'react-md';

class Login extends Component {
  render() {
    return (
      <div className="md-grid">
        <Card className="md-cell md-cell-offset--6 md-cell--6">
        <TextField
          id="enterSeed"
          label="Seed"
          placeholder="Enter your Seed"
          leftIcon={<FontIcon>fingerprint</FontIcon>}
          size={10}
          className="md-cell md-cell--bottom"
        />
        </Card>
      </div>
    );
  }
}

export default Login;