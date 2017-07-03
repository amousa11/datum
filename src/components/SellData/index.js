import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dialog, Button} from 'react-md';
import {openDialog, closeDialog} from './sellData.actions';

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
          visible={this.props.isOpen}
          title="Sell Data"
          onHide={this.props.closeDialog}
          modal
          actions={[{
            onClick: this.props.closeDialog,
            primary: true,
            label: 'Cancel',
          }, {
            onClick: this.props.closeDialog,
            primary: true,
            label: 'Sell Data',
          }]}
        >
          <p>Hello this is a dialog. Here is where the form to accept all necessary inputs for selling data would go.</p>
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