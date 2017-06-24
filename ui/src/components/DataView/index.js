import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dialog} from 'react-md';
import {closeDataViewDialog} from './dataView.actions';

class DataView extends Component {
  render() {
    return (
      <div>
        <Dialog
          id="viewDataDialog"
          visible={this.props.isOpen}
          title="Data View"
          onHide={this.props.closeDataViewDialog}
          modal
          actions={[{
            onClick: this.props.closeDataViewDialog,
            primary: true,
            label: 'Close',
          }]}
        >
          <p>Here is where you would view the data you already own...</p>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.dataView.isOpen,
  };
}

export default connect(mapStateToProps, { closeDataViewDialog })(DataView);