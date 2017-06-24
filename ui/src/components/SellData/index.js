import React, { Component } from 'react';
import { connect } from 'react-redux';
import SellDataForm from './components/SellDataForm';
import {Dialog, Button} from 'react-md';
import {openDialog, closeDialog} from './sellData.actions';
//import './SellData.css';

class SellData extends Component {

  render() {
    return (
      <div>
        <Button
          onClick={this.props.openDialog}
          floating
          secondary
          fixed
        >add
        </Button>
        <Dialog
          id="sellDataDialog"
          className="sellData-dialog"
          aria-describedby="sellData"
          visible={this.props.isOpen}
          onHide={this.props.closeDialog}
          fullPage
        >
         <SellDataForm handleSubmit={this.submit}/>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.sellData.isOpen,
  };
}

export default connect(mapStateToProps, { openDialog, closeDialog })(SellData);