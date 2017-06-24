import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { closeDialog, sellData } from '../../sellData.actions';
import ReduxedTextField from '../../../ReduxedTextField/index';
import { Button } from 'react-md';
import '../../SellData.css';

class SellDataForm extends Component {

  submit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    this.props.sellData(values.seed, values.data);
  }

  render() {
    const {handleSubmit} = this.props;

    return (
          <form onSubmit={handleSubmit(this.submit)}>
            <div className="md-grid">
              <h2 className="md-cell md-cell--12-desktop md-cell--10-tablet md-cell--10-phone">Upload a Masked Authenticated Message</h2>
              <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
              <Field
                id="seed"
                name="seed"
                type="text"
                label="Enter Seed"
                className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone"
                component={ReduxedTextField} />
              <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
              <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
              <Field
                id="password"
                name="password"
                type="password"
                label="Enter Password"
                className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone"
                component={ReduxedTextField} />
              <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
              <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
              <div className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone md-text-right login-cell">
                <Button raised secondary label="Cancel" onClick={this.props.closeDialog} className="margins"/>
                <Button raised primary label="Submit" type="submit" className="margins"/>
              </div>
              <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
            </div>
          </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.sellData.isOpen,
  };
}

const connected = connect(mapStateToProps, { closeDialog, sellData })(SellDataForm);

const formedComponent = reduxForm({
  form: 'sellDataForm', // a unique identifier for this form
})(connected);

export default formedComponent;